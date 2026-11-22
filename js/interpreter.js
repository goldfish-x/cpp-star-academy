/* ============================================================
 * C++ 教学子集解释器（纯 JS，离线运行）
 * 支持: cout/cin/endl/getline, int/double/bool/char/string,
 * 数组, vector, if/else, for(含范围for), while, do-while,
 * break/continue, 函数/递归/引用参数, struct/class/构造/方法,
 * 常用内置函数。中文友好报错，带行号与死循环保护。
 * ============================================================ */
(function (global) {
  'use strict';

  function CppError(msg, line) {
    this.message = msg;
    this.line = line || 0;
  }
  CppError.prototype = Object.create(Error.prototype);

  /* ---------------- 词法分析 ---------------- */
  var TWO_OPS = ['<<', '>>', '<=', '>=', '==', '!=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '->', '::'];

  function tokenize(src) {
    var toks = [], i = 0, line = 1, n = src.length;
    while (i < n) {
      var c = src[i];
      if (c === '\n') { line++; i++; continue; }
      if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
      if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') {
        i += 2;
        while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') line++; i++; }
        if (i >= n) throw new CppError('注释没有结束，缺少 */', line);
        i += 2; continue;
      }
      if (c === '#') { while (i < n && src[i] !== '\n') i++; continue; }
      if (src.slice(i, i + 5) === 'using' && /[\s]/.test(src[i + 5] || '')) {
        var m = /^using\s+namespace\s+[A-Za-z_]\w*\s*;/.exec(src.slice(i));
        if (m) { i += m[0].length; continue; }
      }
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
        var j = i, isFloat = false;
        while (j < n && /[0-9]/.test(src[j])) j++;
        if (src[j] === '.') { isFloat = true; j++; while (j < n && /[0-9]/.test(src[j])) j++; }
        if (src[j] === 'e' || src[j] === 'E') {
          var k = j + 1;
          if (src[k] === '+' || src[k] === '-') k++;
          if (/[0-9]/.test(src[k] || '')) { isFloat = true; j = k; while (j < n && /[0-9]/.test(src[j])) j++; }
        }
        while (j < n && /[fFlLuU]/.test(src[j])) { if (src[j] === 'f' || src[j] === 'F') isFloat = true; j++; }
        toks.push({ k: 'num', v: parseFloat(src.slice(i, j)), float: isFloat, line: line });
        i = j; continue;
      }
      if (c === '"') {
        var s = '', j2 = i + 1;
        while (j2 < n && src[j2] !== '"') {
          if (src[j2] === '\n') throw new CppError('字符串没有结束，缺少右引号 "', line);
          if (src[j2] === '\\') {
            var e = src[j2 + 1];
            if (e === 'n') s += '\n'; else if (e === 't') s += '\t';
            else if (e === '\\') s += '\\'; else if (e === '"') s += '"';
            else if (e === "'") s += "'"; else if (e === '0') s += '\0';
            else s += e;
            j2 += 2;
          } else { s += src[j2]; j2++; }
        }
        if (j2 >= n) throw new CppError('字符串没有结束，缺少右引号 "', line);
        toks.push({ k: 'str', v: s, line: line });
        i = j2 + 1; continue;
      }
      if (c === "'") {
        var ch, j3 = i + 1;
        if (src[j3] === '\\') {
          var e2 = src[j3 + 1];
          if (e2 === 'n') ch = '\n'; else if (e2 === 't') ch = '\t';
          else if (e2 === '0') ch = '\0'; else if (e2 === '\\') ch = '\\';
          else if (e2 === "'") ch = "'"; else ch = e2;
          j3 += 2;
        } else { ch = src[j3]; j3++; }
        if (src[j3] !== "'") throw new CppError('字符写法不对，应该用单引号包住一个字符，如 \'A\'', line);
        toks.push({ k: 'char', v: ch, line: line });
        i = j3 + 1; continue;
      }
      if (/[A-Za-z_]/.test(c)) {
        var j4 = i;
        while (j4 < n && /[A-Za-z0-9_]/.test(src[j4])) j4++;
        toks.push({ k: 'id', v: src.slice(i, j4), line: line });
        i = j4; continue;
      }
      var two = src.slice(i, i + 2);
      if (TWO_OPS.indexOf(two) >= 0) { toks.push({ k: 'op', v: two, line: line }); i += 2; continue; }
      if ('+-*/%=<>!(){}[];,.:&|?^~'.indexOf(c) >= 0) { toks.push({ k: 'op', v: c, line: line }); i++; continue; }
      throw new CppError('看不懂的符号 "' + c + '"', line);
    }
    toks.push({ k: 'eof', v: '', line: line });
    return toks;
  }

  /* ---------------- 语法分析 ---------------- */
  var BASIC_TYPES = ['int', 'double', 'float', 'bool', 'char', 'string', 'void', 'auto', 'long', 'short', 'unsigned', 'signed', 'const'];

  function Parser(toks) {
    this.t = toks; this.p = 0;
    this.types = {};
    var self = this;
    BASIC_TYPES.forEach(function (t) { self.types[t] = true; });
    this.types['vector'] = true;
    // 预扫描顶层 struct/class 名字，便于函数体内识别类型
    var depth = 0;
    for (var i = 0; i < toks.length - 1; i++) {
      var tk = toks[i];
      if (tk.k === 'op' && tk.v === '{') depth++;
      else if (tk.k === 'op' && tk.v === '}') depth--;
      else if (depth === 0 && tk.k === 'id' && (tk.v === 'struct' || tk.v === 'class') && toks[i + 1].k === 'id') {
        this.types[toks[i + 1].v] = true;
      }
    }
  }
  Parser.prototype.peek = function (d) { return this.t[Math.min(this.p + (d || 0), this.t.length - 1)]; };
  Parser.prototype.next = function () { return this.t[this.p++]; };
  Parser.prototype.is = function (v, d) { var tk = this.peek(d); return (tk.k === 'op' || tk.k === 'id') && tk.v === v; };
  Parser.prototype.expect = function (v, what) {
    if (!this.is(v)) {
      var tk = this.peek();
      var got = tk.k === 'eof' ? '程序结尾' : '"' + tk.v + '"';
      throw new CppError('这里应该有 ' + (what || '"' + v + '"') + '，却遇到了 ' + got, tk.line);
    }
    return this.next();
  };
  Parser.prototype.isTypeStart = function (d) {
    var tk = this.peek(d);
    return tk.k === 'id' && !!this.types[tk.v] && tk.v !== 'void' ? true : (tk.k === 'id' && tk.v === 'void');
  };
  Parser.prototype.parseType = function () {
    while (this.is('const') || this.is('unsigned') || this.is('signed') || this.is('long') || this.is('short')) this.next();
    var tk = this.next();
    if (tk.k !== 'id' || !this.types[tk.v]) throw new CppError('"' + tk.v + '" 不是可用的类型（int、double、char、string、bool、vector 或已定义的类）', tk.line);
    if (tk.v === 'vector') {
      this.expect('<');
      var elem = this.parseType();
      this.expect('>');
      return { name: 'vector', elem: elem.name };
    }
    var name = tk.v;
    if (name === 'float') name = 'double';
    if (name === 'long' || name === 'short') name = 'int';
    return { name: name, line: tk.line };
  };

  Parser.prototype.parseProgram = function () {
    var items = [];
    while (!this.is('') && this.peek().k !== 'eof') {
      if (this.is('struct') || this.is('class')) { items.push(this.parseClass()); continue; }
      var type = this.parseType();
      if (this.is('*')) { this.next(); type = { name: 'ptr', elem: type.name, line: type.line }; }
      var nameTk = this.next();
      if (nameTk.k !== 'id') throw new CppError('类型后面应该跟一个名字', nameTk.line);
      if (this.is('(')) {
        var params = this.parseParams();
        var body = this.parseBlock();
        items.push({ k: 'func', name: nameTk.v, ret: type, params: params, body: body, line: nameTk.line });
      } else {
        var decls = this.parseDeclarators(type, nameTk);
        this.expect(';');
        items.push({ k: 'decl', type: type, decls: decls, line: nameTk.line });
      }
    }
    return items;
  };

  Parser.prototype.parseParams = function () {
    this.expect('(');
    var params = [];
    if (!this.is(')')) {
      for (;;) {
        var type = this.parseType();
        if (this.is('*')) { this.next(); type = { name: 'ptr', elem: type.name, line: type.line }; }
        var ref = false, arr = false;
        if (this.is('&')) { this.next(); ref = true; }
        var nameTk = this.next();
        if (nameTk.k !== 'id') throw new CppError('参数需要一个名字', nameTk.line);
        if (this.is('[')) { this.next(); this.expect(']'); arr = true; }
        params.push({ type: type, name: nameTk.v, ref: ref, arr: arr });
        if (this.is(',')) { this.next(); continue; }
        break;
      }
    }
    this.expect(')');
    return params;
  };

  Parser.prototype.parseClass = function () {
    var kind = this.next().v;
    var nameTk = this.next();
    if (nameTk.k !== 'id') throw new CppError('struct/class 后面需要一个名字', nameTk.line);
    var name = nameTk.v;
    this.types[name] = true;
    this.expect('{');
    var cls = { k: 'class', name: name, kind: kind, fields: [], methods: [], ctors: [], line: nameTk.line };
    var access = kind === 'struct' ? 'public' : 'private';
    while (!this.is('}')) {
      if ((this.is('public') || this.is('private') || this.is('protected')) && this.is(':', 1)) {
        access = this.next().v === 'private' ? 'private' : 'public';
        this.next(); continue;
      }
      if (this.is(name) && this.is('(', 1)) {
        this.next();
        var cp = this.parseParams();
        var cb = this.parseBlock();
        cls.ctors.push({ params: cp, body: cb, access: access, line: nameTk.line });
        continue;
      }
      var type = this.parseType();
      if (this.is('*')) { this.next(); type = { name: 'ptr', elem: type.name, line: type.line }; }
      var mname = this.next();
      if (mname.k !== 'id') throw new CppError('成员需要一个名字', mname.line);
      if (this.is('(')) {
        var mp = this.parseParams();
        var mb = this.parseBlock();
        cls.methods.push({ name: mname.v, ret: type, params: mp, body: mb, access: access, line: mname.line });
      } else {
        cls.fields.push({ name: mname.v, type: type, access: access });
        while (this.is(',')) {
          this.next();
          var extra = this.next();
          cls.fields.push({ name: extra.v, type: type, access: access });
        }
        this.expect(';');
      }
    }
    this.expect('}');
    if (this.is(';')) this.next();
    return cls;
  };

  Parser.prototype.parseDeclarators = function (type, firstTk) {
    var decls = [];
    var nameTk = firstTk;
    for (;;) {
      var d = { name: nameTk.v, arr: null, arr2: null, init: null, ctorArgs: null, ref: false };
      if (this.is('[')) {
        this.next();
        if (!this.is(']')) d.arr = this.parseExpr(); else d.arr = 'auto';
        this.expect(']');
        if (this.is('[')) {
          this.next();
          if (!this.is(']')) d.arr2 = this.parseExpr(); else d.arr2 = 'auto';
          this.expect(']');
        }
      }
      if (this.is('=')) {
        this.next();
        if (this.is('{')) d.init = this.parseInitList(); else d.init = this.parseAssign();
      } else if (this.is('(')) {
        d.ctorArgs = this.parseArgs();
      }
      decls.push(d);
      if (this.is(',')) {
        this.next();
        if (this.is('&')) { this.next(); }
        nameTk = this.next();
        if (nameTk.k !== 'id') throw new CppError('逗号后面应该还有变量名', nameTk.line);
        continue;
      }
      break;
    }
    return decls;
  };

  Parser.prototype.parseInitList = function () {
    var line = this.expect('{').line;
    var items = [];
    if (!this.is('}')) {
      for (;;) {
        if (this.is('{')) items.push(this.parseInitList()); else items.push(this.parseAssign());
        if (this.is(',')) { this.next(); if (this.is('}')) break; continue; }
        break;
      }
    }
    this.expect('}');
    return { k: 'list', items: items, line: line };
  };

  Parser.prototype.parseArgs = function () {
    this.expect('(');
    var args = [];
    if (!this.is(')')) {
      for (;;) {
        args.push(this.parseAssign());
        if (this.is(',')) { this.next(); continue; }
        break;
      }
    }
    this.expect(')');
    return args;
  };

  Parser.prototype.parseBlock = function () {
    var line = this.expect('{').line;
    var stmts = [];
    while (!this.is('}')) {
      if (this.peek().k === 'eof') throw new CppError('大括号没有配对，缺少 }', line);
      stmts.push(this.parseStmt());
    }
    this.expect('}');
    return { k: 'block', stmts: stmts, line: line };
  };

  Parser.prototype.tryRangeFor = function () {
    var save = this.p;
    try {
      var type = this.parseType();
      var ref = false;
      if (this.is('&')) { this.next(); ref = true; }
      var nameTk = this.next();
      if (nameTk.k !== 'id' || !this.is(':')) { this.p = save; return null; }
      this.next();
      var coll = this.parseExpr();
      this.expect(')');
      var body = this.parseStmt();
      return { k: 'rfor', type: type, ref: ref, name: nameTk.v, coll: coll, body: body, line: nameTk.line };
    } catch (e) {
      this.p = save;
      return null;
    }
  };

  Parser.prototype.parseStmt = function () {
    var tk = this.peek();
    if (this.is('{')) return this.parseBlock();
    if (this.is(';')) { this.next(); return { k: 'empty', line: tk.line }; }
    if (this.is('if')) {
      this.next(); this.expect('(');
      var cond = this.parseExpr(); this.expect(')');
      var then = this.parseStmt();
      var els = null;
      if (this.is('else')) { this.next(); els = this.parseStmt(); }
      return { k: 'if', cond: cond, then: then, els: els, line: tk.line };
    }
    if (this.is('for')) {
      this.next(); this.expect('(');
      var rf = this.tryRangeFor();
      if (rf) return rf;
      var init = null;
      if (!this.is(';')) {
        if (this.isTypeStart()) {
          var t = this.parseType();
          if (this.is('*')) { this.next(); t = { name: 'ptr', elem: t.name, line: t.line }; }
          var isRef = false; if (this.is('&')) { this.next(); isRef = true; }
          var nt = this.next();
          var ds = this.parseDeclarators(t, nt);
          if (isRef && ds.length) ds[0].ref = true;
          init = { k: 'decl', type: t, decls: ds, line: nt.line };
        } else init = { k: 'exprstmt', expr: this.parseExpr(), line: tk.line };
      }
      this.expect(';');
      var cond2 = this.is(';') ? null : this.parseExpr();
      this.expect(';');
      var step = this.is(')') ? null : this.parseExpr();
      this.expect(')');
      var body2 = this.parseStmt();
      return { k: 'for', init: init, cond: cond2, step: step, body: body2, line: tk.line };
    }
    if (this.is('while')) {
      this.next(); this.expect('(');
      var c3 = this.parseExpr(); this.expect(')');
      var b3 = this.parseStmt();
      return { k: 'while', cond: c3, body: b3, line: tk.line };
    }
    if (this.is('do')) {
      this.next();
      var b4 = this.parseStmt();
      this.expect('while'); this.expect('(');
      var c4 = this.parseExpr(); this.expect(')'); this.expect(';');
      return { k: 'do', body: b4, cond: c4, line: tk.line };
    }
    if (this.is('return')) {
      this.next();
      var val = this.is(';') ? null : this.parseExpr();
      this.expect(';');
      return { k: 'return', val: val, line: tk.line };
    }
    if (this.is('break')) { this.next(); this.expect(';'); return { k: 'break', line: tk.line }; }
    if (this.is('continue')) { this.next(); this.expect(';'); return { k: 'continue', line: tk.line }; }
    if (this.isTypeStart()) {
      var type2 = this.parseType();
      if (this.is('*')) { this.next(); type2 = { name: 'ptr', elem: type2.name, line: type2.line }; }
      var ref2 = false;
      if (this.is('&')) { this.next(); ref2 = true; }
      var nameTk2 = this.next();
      if (nameTk2.k !== 'id') throw new CppError('类型后面应该跟变量名', nameTk2.line);
      var decls2 = this.parseDeclarators(type2, nameTk2);
      if (ref2) decls2[0].ref = true;
      this.expect(';');
      return { k: 'decl', type: type2, decls: decls2, line: nameTk2.line };
    }
    var expr = this.parseExpr();
    this.expect(';', '分号 ;（每条语句结束都要写分号哦）');
    return { k: 'exprstmt', expr: expr, line: tk.line };
  };

  /* 表达式：优先级从低到高 */
  Parser.prototype.parseExpr = function () { return this.parseAssign(); };
  Parser.prototype.parseAssign = function () {
    var left = this.parseTernary();
    var tk = this.peek();
    if (tk.k === 'op' && ['=', '+=', '-=', '*=', '/=', '%='].indexOf(tk.v) >= 0) {
      this.next();
      var right = this.parseAssign();
      return { k: 'assign', op: tk.v, target: left, val: right, line: tk.line };
    }
    return left;
  };
  Parser.prototype.parseTernary = function () {
    var c = this.parseBinary(0);
    if (this.is('?')) {
      var line = this.next().line;
      var a = this.parseAssign();
      this.expect(':');
      var b = this.parseAssign();
      return { k: 'ternary', cond: c, a: a, b: b, line: line };
    }
    return c;
  };
  var LEVELS = [['||'], ['&&'], ['|'], ['^'], ['&'], ['==', '!='], ['<', '>', '<=', '>='], ['<<', '>>'], ['+', '-'], ['*', '/', '%']];
  Parser.prototype.parseBinary = function (lv) {
    if (lv >= LEVELS.length) return this.parseUnary();
    var left = this.parseBinary(lv + 1);
    for (;;) {
      var tk = this.peek();
      if (tk.k === 'op' && LEVELS[lv].indexOf(tk.v) >= 0) {
        this.next();
        var right = this.parseBinary(lv + 1);
        left = { k: 'binary', op: tk.v, a: left, b: right, line: tk.line };
      } else break;
    }
    return left;
  };
  Parser.prototype.parseUnary = function () {
    var tk = this.peek();
    if (tk.k === 'op' && ['!', '-', '+', '++', '--', '*', '&'].indexOf(tk.v) >= 0) {
      this.next();
      var operand = this.parseUnary();
      if (tk.v === '*') return { k: 'deref', a: operand, line: tk.line };
      if (tk.v === '&') return { k: 'addr', a: operand, line: tk.line };
      return { k: 'unary', op: tk.v, a: operand, prefix: true, line: tk.line };
    }
    return this.parsePostfix();
  };
  Parser.prototype.parsePostfix = function () {
    var e = this.parsePrimary();
    for (;;) {
      if (this.is('(')) {
        var args = this.parseArgs();
        e = { k: 'call', callee: e, args: args, line: e.line };
      } else if (this.is('[')) {
        var line = this.next().line;
        var idx = this.parseExpr();
        this.expect(']');
        e = { k: 'index', obj: e, idx: idx, line: line };
      } else if (this.is('.') || this.is('->')) {
        var op = this.next();
        var m = this.next();
        if (m.k !== 'id') throw new CppError('点号后面应该是成员名字', m.line);
        e = { k: 'member', obj: e, name: m.v, line: op.line };
      } else if (this.is('++') || this.is('--')) {
        var op2 = this.next();
        e = { k: 'unary', op: op2.v, a: e, prefix: false, line: op2.line };
      } else break;
    }
    return e;
  };
  Parser.prototype.parsePrimary = function () {
    var tk = this.next();
    if (tk.k === 'num') return { k: 'lit', t: tk.float ? 'double' : 'int', v: tk.v, line: tk.line };
    if (tk.k === 'str') return { k: 'lit', t: 'string', v: tk.v, line: tk.line };
    if (tk.k === 'char') return { k: 'lit', t: 'char', v: tk.v, line: tk.line };
    if (tk.k === 'id') {
      if (tk.v === 'true') return { k: 'lit', t: 'bool', v: true, line: tk.line };
      if (tk.v === 'false') return { k: 'lit', t: 'bool', v: false, line: tk.line };
      if (tk.v === 'nullptr') return { k: 'lit', t: 'nullptr', v: 0, line: tk.line };
      return { k: 'ident', name: tk.v, line: tk.line };
    }
    if (tk.k === 'op' && tk.v === '(') {
      var nt = this.peek();
      if (nt.k === 'id' && ['int', 'double', 'float', 'char', 'bool', 'string'].indexOf(nt.v) >= 0 && this.is(')', 1)) {
        this.next(); this.next();
        var operand = this.parseUnary();
        return { k: 'cast', type: nt.v === 'float' ? 'double' : nt.v, a: operand, line: tk.line };
      }
      var e = this.parseExpr();
      this.expect(')');
      return e;
    }
    if (tk.k === 'op' && tk.v === '{') {
      this.p--;
      return this.parseInitList();
    }
    throw new CppError('这里出现了意外的 "' + (tk.v || '程序结尾') + '"', tk.line);
  };

  /* ---------------- 运行时 ---------------- */
  function Env(parent) { this.m = Object.create(null); this.parent = parent || null; this.thisObj = null; }
  Env.prototype.find = function (name) {
    var e = this;
    while (e) {
      if (e.m[name]) return e.m[name];
      if (e.thisObj && e.thisObj.fields[name]) return e.thisObj.fields[name];
      e = e.parent;
    }
    return null;
  };
  Env.prototype.declare = function (name, cell, line) {
    if (this.m[name]) throw new CppError('变量 "' + name + '" 已经定义过了，不能重复定义', line);
    this.m[name] = cell;
  };
  Env.prototype.get = function (name, line) {
    var c = this.find(name);
    if (!c) throw new CppError('"' + name + '" 还没有定义。是不是拼错了，或者忘记声明类型了？', line);
    return c;
  };

  function isNumT(t) { return t === 'int' || t === 'double' || t === 'bool' || t === 'char'; }
  function numOf(v) {
    if (v.t === 'char') return v.v.charCodeAt(0);
    if (v.t === 'bool') return v.v ? 1 : 0;
    return v.v;
  }
  function truthy(v, line) {
    if (v.t === 'bool') return v.v;
    if (v.t === 'ptr') return !!v.base;
    if (v.t === 'nullptr') return false;
    if (isNumT(v.t)) return numOf(v) !== 0;
    throw new CppError('这个值不能当作条件使用（条件应该是数字或 bool）', line);
  }
  function defaultOf(typeName, classes) {
    if (typeName === 'int') return { t: 'int', v: 0 };
    if (typeName === 'double') return { t: 'double', v: 0 };
    if (typeName === 'bool') return { t: 'bool', v: false };
    if (typeName === 'char') return { t: 'char', v: '\0' };
    if (typeName === 'string') return { t: 'string', v: '' };
    if (typeName === 'vector') return { t: 'vector', elem: 'int', v: [] };
    if (typeName === 'ptr') return { t: 'ptr', base: null, idx: 0 };
    if (classes && classes[typeName]) return null; // 对象由构造流程处理
    return { t: typeName, v: 0 };
  }
  function convert(val, target, elem, line) {
    if (target === 'int') {
      if (!isNumT(val.t)) throw new CppError('不能把这种值放进 int 变量', line);
      return { t: 'int', v: Math.trunc(numOf(val)) };
    }
    if (target === 'double') {
      if (!isNumT(val.t)) throw new CppError('不能把这种值放进 double 变量', line);
      return { t: 'double', v: numOf(val) };
    }
    if (target === 'bool') return { t: 'bool', v: truthy(val, line) };
    if (target === 'char') {
      if (val.t === 'char') return { t: 'char', v: val.v };
      if (val.t === 'string' && val.v.length === 1) return { t: 'char', v: val.v };
      if (isNumT(val.t)) return { t: 'char', v: String.fromCharCode(Math.trunc(numOf(val)) & 255) };
      throw new CppError('char 变量只能放一个字符', line);
    }
    if (target === 'string') {
      if (val.t === 'string') return { t: 'string', v: val.v };
      if (val.t === 'char') return { t: 'string', v: val.v };
      throw new CppError('string 变量只能放字符串（用双引号包起来）', line);
    }
    if (target === 'ptr') {
      if (val.t === 'ptr') return { t: 'ptr', base: val.base, idx: val.idx };
      if (val.t === 'nullptr') return { t: 'ptr', base: null, idx: 0 };
      if (val.t === 'array') return { t: 'ptr', base: val, idx: 0 };
      if (isNumT(val.t) && numOf(val) === 0) return { t: 'ptr', base: null, idx: 0 };
      throw new CppError('指针变量只能放地址（&x）、数组名或 nullptr', line);
    }
    if (target === 'vector') {
      if (val.t !== 'vector') throw new CppError('类型不匹配：需要 vector', line);
      return { t: 'vector', elem: elem || val.elem, v: val.v };
    }
    if (target === 'array') return val;
    if (val.t === 'object') return val;
    return val;
  }
  function fmt(val, line) {
    if (val.t === 'int') return String(val.v);
    if (val.t === 'bool') return val.v ? '1' : '0';
    if (val.t === 'char') return val.v;
    if (val.t === 'string') return val.v;
    if (val.t === 'double') {
      var v = val.v;
      if (!isFinite(v)) return v > 0 ? 'inf' : (v < 0 ? '-inf' : 'nan');
      if (Number.isInteger(v) && Math.abs(v) < 1e15) return String(v);
      var s = v.toPrecision(6);
      if (s.indexOf('e') >= 0) return s;
      return String(parseFloat(s));
    }
    if (val.t === 'ptr' || val.t === 'nullptr') throw new CppError('指针/地址不能直接输出，用 *p 输出它指向的值', line);
    throw new CppError('这种数据不能直接用 cout 输出（数组、vector、对象要逐个元素输出）', line);
  }

  function Interp(stdin) {
    this.out = '';
    this.steps = 0;
    this.budget = 500000;
    this.depth = 0;
    this.classes = {};
    this.funcs = {};
    this.currentClass = null;
    this.stdin = stdin == null ? '' : String(stdin);
    this.inPos = 0;
    this.randSeed = 12345;
    this.globals = new Env(null);
  }
  Interp.prototype.tick = function (line) {
    this.steps++;
    if (this.steps > this.budget) throw new CppError('程序运行了太久（超过 50 万步），很可能有死循环！检查一下循环条件会不会永远成立', line);
    if (this.out.length > 60000) throw new CppError('输出内容太多啦（超过 6 万字符），检查一下循环里的输出', line);
  };
  Interp.prototype.readToken = function (line) {
    var s = this.stdin, i = this.inPos;
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) throw new CppError('cin 想读取数据，但输入已经用完了。请在"输入"框里提供足够的数据', line);
    var j = i;
    while (j < s.length && !/\s/.test(s[j])) j++;
    this.inPos = j;
    return s.slice(i, j);
  };
  Interp.prototype.readLine = function (line) {
    var s = this.stdin, i = this.inPos;
    if (i >= s.length) throw new CppError('getline 想读取一行，但输入已经用完了', line);
    var j = s.indexOf('\n', i);
    if (j < 0) j = s.length;
    this.inPos = Math.min(j + 1, s.length);
    var r = s.slice(i, j);
    if (r.charAt(r.length - 1) === '\r') r = r.slice(0, -1);
    return r;
  };

  /* 左值描述符 */
  Interp.prototype.lvalue = function (node, env) {
    if (node.k === 'ident') {
      return { cell: env.get(node.name, node.line) };
    }
    if (node.k === 'index') {
      var obj = this.eval(node.obj, env);
      var idx = this.eval(node.idx, env);
      if (!isNumT(idx.t)) throw new CppError('下标必须是整数', node.line);
      var i = Math.trunc(numOf(idx));
      if (obj.t === 'array' || obj.t === 'vector') {
        if (i < 0 || i >= obj.v.length) throw new CppError('下标越界啦！长度是 ' + obj.v.length + '，却访问了下标 ' + i + '（下标从 0 开始）', node.line);
        return { arr: obj, idx: i };
      }
      if (obj.t === 'string') {
        if (i < 0 || i >= obj.v.length) throw new CppError('字符串下标越界！长度是 ' + obj.v.length + '，却访问了下标 ' + i, node.line);
        var cell = this.lvalue(node.obj, env).cell;
        if (!cell) throw new CppError('只能修改字符串变量里的字符', node.line);
        return { strCell: cell, idx: i };
      }
      throw new CppError('只有数组、vector 和字符串可以用下标访问', node.line);
    }
    if (node.k === 'member') {
      var obj2 = this.eval(node.obj, env);
      if (obj2.t !== 'object') throw new CppError('只有对象才能用 "." 访问成员', node.line);
      var f = obj2.fields[node.name];
      if (!f) throw new CppError('对象里没有成员 "' + node.name + '"', node.line);
      var fd = obj2.cls.fields.filter(function (x) { return x.name === node.name; })[0];
      if (fd && fd.access === 'private' && this.currentClass !== obj2.cls.name) {
        throw new CppError('成员 "' + node.name + '" 是私有的(private)，不能在类外面直接访问。试试通过 public 方法来使用它', node.line);
      }
      return { cell: f };
    }
    if (node.k === 'deref') return this.ptrDesc(node, env);
    throw new CppError('这里需要一个可以赋值的对象（变量、数组元素或成员）', node.line);
  };
  Interp.prototype.ptrDesc = function (node, env) {
    var p = this.eval(node.a, env);
    if (p.t !== 'ptr') throw new CppError('"*" 解引用需要指针，比如 *p', node.line);
    if (!p.base) throw new CppError('空指针(nullptr)不能解引用！先让它指向一个变量或数组', node.line);
    if (p.idx == null) return { cell: p.base };
    if (p.idx < 0 || p.idx >= p.base.v.length) throw new CppError('指针越界啦！它指到了数组外面（长度 ' + p.base.v.length + '，偏移 ' + p.idx + '）', node.line);
    return { arr: p.base, idx: p.idx };
  };
  function readL(d) {
    if (d.cell) return d.cell;
    if (d.arr) {
      var elem = d.arr.elem || (d.arr.t === 'vector' ? d.arr.elem : 'int');
      return { t: elem, v: d.arr.v[d.idx] };
    }
    if (d.strCell) return { t: 'char', v: d.strCell.v.charAt(d.strCellIdx != null ? d.strCellIdx : d.idx) };
    return null;
  }
  Interp.prototype.writeL = function (d, val, line) {
    if (d.cell) {
      var c = d.cell;
      if (c.t === 'array' || c.t === 'vector' || c.t === 'object' || c.t === 'stream') { c.v = val.v; if (val.elem) c.elem = val.elem; return; }
      if (c.t === 'ptr') { c.base = val.base; c.idx = val.idx; return; }
      var nv = convert(val, c.t, c.elem, line);
      c.v = nv.v;
      return;
    }
    if (d.arr) {
      var elem = d.arr.elem || 'int';
      if (this.classes[elem]) {
        if (val.t !== 'object' || val.cls.name !== elem) throw new CppError('类型不匹配：需要 ' + elem + ' 对象', line);
        d.arr.v[d.idx] = this.cloneVal(val);
        return;
      }
      d.arr.v[d.idx] = convert(val, elem, null, line).v;
      return;
    }
    if (d.strCell) {
      var ch = convert(val, 'char', null, line).v;
      var s = d.strCell.v;
      d.strCell.v = s.slice(0, d.idx) + ch + s.slice(d.idx + 1);
      return;
    }
  };
  function lread(interp, d, line) {
    if (d.cell) {
      var c = d.cell;
      if (c.t === 'object' || c.t === 'vector' || c.t === 'array' || c.t === 'stream') return c;
      if (c.t === 'ptr') return { t: 'ptr', base: c.base, idx: c.idx };
      return { t: c.t, v: c.v };
    }
    if (d.arr) {
      var el = d.arr.elem || 'int';
      if (el === 'row') return d.arr.v[d.idx];
      if (interp.classes[el]) return d.arr.v[d.idx];
      return { t: el, v: d.arr.v[d.idx] };
    }
    if (d.strCell) return { t: 'char', v: d.strCell.v.charAt(d.idx) };
    throw new CppError('无法读取这个值', line);
  }

  /* 对象深拷贝（按值语义） */
  Interp.prototype.cloneVal = function (val) {
    if (!val || val.t !== 'object') return val;
    var nf = {};
    for (var k in val.fields) {
      var c = val.fields[k];
      if (c.t === 'object') nf[k] = this.cloneVal(c);
      else if (c.t === 'vector') nf[k] = { t: 'vector', elem: c.elem, v: c.v.slice() };
      else if (c.t === 'array') nf[k] = { t: 'array', elem: c.elem, v: c.v.slice() };
      else nf[k] = { t: c.t, v: c.v };
    }
    return { t: 'object', cls: val.cls, fields: nf };
  };

  /* 构造对象 */
  Interp.prototype.construct = function (cls, args, line) {
    var obj = { t: 'object', cls: cls, fields: {} };
    var self = this;
    cls.fields.forEach(function (f) {
      if (self.classes[f.type.name]) {
        obj.fields[f.name] = self.construct(self.classes[f.type.name], [], line);
      } else if (f.type.name === 'vector') {
        obj.fields[f.name] = { t: 'vector', elem: f.type.elem || 'int', v: [] };
      } else {
        obj.fields[f.name] = defaultOf(f.type.name, self.classes);
      }
    });
    var ctor = null;
    for (var i = 0; i < cls.ctors.length; i++) {
      if (cls.ctors[i].params.length === args.length) { ctor = cls.ctors[i]; break; }
    }
    if (args.length > 0 && !ctor) {
      throw new CppError('类 ' + cls.name + ' 没有需要 ' + args.length + ' 个参数的构造函数', line);
    }
    if (ctor) {
      if (ctor.access === 'private' && this.currentClass !== cls.name) throw new CppError('构造函数是私有的，不能直接创建对象', line);
      var wrapped = args.map(function (v) { return { val: v, desc: null }; });
      this.runBody(ctor, wrapped, line, obj, cls.name, null);
    }
    return obj;
  };

  Interp.prototype.runBody = function (fn, args, line, thisObj, clsName, fname) {
    this.depth++;
    if (this.depth > 1200) { this.depth--; throw new CppError('递归太深了（超过 1200 层）！递归一定要有能到达的结束条件', line); }
    var env = new Env(this.globals);
    if (thisObj) env.thisObj = thisObj;
    var prevClass = this.currentClass;
    if (clsName) this.currentClass = clsName;
    var params = fn.params || [];
    if (args.length !== params.length) {
      this.depth--;
      throw new CppError((fname || '函数') + ' 需要 ' + params.length + ' 个参数，却传了 ' + args.length + ' 个', line);
    }
    for (var i = 0; i < params.length; i++) {
      var p = params[i];
      if (p.ref || p.arr) {
        var d = args[i].desc;
        if (!d || !d.cell) { this.depth--; throw new CppError('参数 "' + p.name + '" 是引用/数组，需要传一个变量', line); }
        env.m[p.name] = d.cell;
      } else {
        var val = args[i].val;
        var cell;
        if (this.classes[p.type.name]) {
          if (val.t !== 'object') throw new CppError('参数 "' + p.name + '" 需要 ' + p.type.name + ' 对象', line);
          cell = this.cloneVal(val);
        } else if (p.type.name === 'vector') {
          cell = { t: 'vector', elem: p.type.elem || val.elem, v: val.v.slice() };
        } else if (p.type.name === 'auto') {
          cell = { t: val.t, v: val.v, elem: val.elem };
        } else {
          cell = convert(val, p.type.name, p.type.elem, line);
        }
        env.m[p.name] = cell;
      }
    }
    var ret = { t: 'void', v: 0 };
    try {
      this.exec(fn.body, env);
      if (fn.ret && fn.ret.name !== 'void' && fname !== 'main') {
        throw new CppError('函数 ' + fname + ' 应该 return 一个值，但没有返回', line);
      }
    } catch (e) {
      if (e && e.sig === 'return') ret = e.val || { t: 'void', v: 0 };
      else { this.depth--; this.currentClass = prevClass; throw e; }
    }
    this.depth--;
    this.currentClass = prevClass;
    if (fn.ret && fn.ret.name !== 'void' && fname !== 'main' && ret.t !== 'void') {
      if (this.classes[fn.ret.name] || fn.ret.name === 'vector' || fn.ret.name === 'string' || ret.t === fn.ret.name || isNumT(fn.ret.name)) {
        if (isNumT(fn.ret.name)) ret = convert(ret, fn.ret.name, null, line);
      }
    }
    return ret;
  };

  /* 语句执行 */
  Interp.prototype.exec = function (node, env) {
    this.tick(node.line);
    switch (node.k) {
      case 'block': {
        var inner = new Env(env);
        inner.thisObj = env.thisObj;
        for (var i = 0; i < node.stmts.length; i++) this.exec(node.stmts[i], inner);
        return;
      }
      case 'empty': return;
      case 'decl': this.execDecl(node, env); return;
      case 'exprstmt': this.eval(node.expr, env); return;
      case 'if':
        if (truthy(this.eval(node.cond, env), node.line)) this.exec(node.then, env);
        else if (node.els) this.exec(node.els, env);
        return;
      case 'while':
        while (truthy(this.eval(node.cond, env), node.line)) {
          this.tick(node.line);
          try { this.exec(node.body, env); }
          catch (e) { if (e && e.sig === 'break') break; if (e && e.sig === 'continue') continue; throw e; }
        }
        return;
      case 'do':
        do {
          this.tick(node.line);
          try { this.exec(node.body, env); }
          catch (e) { if (e && e.sig === 'break') break; if (e && e.sig === 'continue') continue; throw e; }
        } while (truthy(this.eval(node.cond, env), node.line));
        return;
      case 'for': {
        var fenv = new Env(env);
        fenv.thisObj = env.thisObj;
        if (node.init) this.exec(node.init, fenv);
        while (node.cond == null || truthy(this.eval(node.cond, fenv), node.line)) {
          this.tick(node.line);
          try { this.exec(node.body, fenv); }
          catch (e) { if (e && e.sig === 'break') break; if (!(e && e.sig === 'continue')) throw e; }
          if (node.step) this.eval(node.step, fenv);
        }
        return;
      }
      case 'rfor': {
        var coll = this.eval(node.coll, env);
        var items;
        if (coll.t === 'array' || coll.t === 'vector') items = coll.v;
        else if (coll.t === 'string') items = coll.v.split('');
        else throw new CppError('范围 for 只能遍历数组、vector 或字符串', node.line);
        var elemT = coll.t === 'string' ? 'char' : (coll.elem || 'int');
        for (var j = 0; j < items.length; j++) {
          this.tick(node.line);
          var renv = new Env(env);
          renv.thisObj = env.thisObj;
          var cell;
          if (coll.t === 'string') cell = { t: 'char', v: items[j] };
          else if (this.classes[elemT]) cell = node.ref ? items[j] : this.cloneVal(items[j]);
          else {
            cell = { t: elemT, v: items[j] };
            if (node.type.name !== 'auto') cell = convert(cell, node.type.name, node.type.elem, node.line);
          }
          renv.m[node.name] = cell;
          try { this.exec(node.body, renv); }
          catch (e) {
            if (node.ref && coll.t !== 'string') coll.v[j] = cell.v;
            if (e && e.sig === 'break') break;
            if (e && e.sig === 'continue') continue;
            throw e;
          }
          if (node.ref && coll.t !== 'string') coll.v[j] = cell.v;
        }
        return;
      }
      case 'return': throw { sig: 'return', val: node.val ? this.eval(node.val, env) : null };
      case 'break': throw { sig: 'break' };
      case 'continue': throw { sig: 'continue' };
      default: throw new CppError('内部错误：未知语句 ' + node.k, node.line);
    }
  };

  Interp.prototype.execDecl = function (node, env) {
    var type = node.type;
    for (var i = 0; i < node.decls.length; i++) {
      var d = node.decls[i];
      var cell = null;
      if (d.ref) {
        if (!d.init) throw new CppError('引用必须在定义时绑定一个变量，如 int &r = x;', node.line);
        var desc = this.lvalue(d.init, env);
        if (!desc.cell) throw new CppError('引用必须绑定到一个变量', node.line);
        cell = desc.cell;
      } else if (d.arr2 != null) {
        var initRows = null;
        if (d.init && d.init.k === 'list') initRows = d.init.items;
        var rows;
        if (d.arr === 'auto') {
          if (!initRows) throw new CppError('省略数组长度时必须用 { } 给出初始值', node.line);
          rows = initRows.length;
        } else {
          var rv = this.eval(d.arr, env);
          if (!isNumT(rv.t)) throw new CppError('数组行数必须是整数', node.line);
          rows = Math.trunc(numOf(rv));
          if (rows < 0 || rows > 1000) throw new CppError('二维数组行数不合适（0~1000）', node.line);
        }
        var cols;
        if (d.arr2 === 'auto') {
          if (!initRows || !initRows.length || initRows[0].k !== 'list') throw new CppError('二维数组省略列数时必须用嵌套 { } 初始化', node.line);
          cols = initRows[0].items.length;
        } else {
          var cv = this.eval(d.arr2, env);
          if (!isNumT(cv.t)) throw new CppError('数组列数必须是整数', node.line);
          cols = Math.trunc(numOf(cv));
          if (cols < 0 || cols > 1000) throw new CppError('二维数组列数不合适（0~1000）', node.line);
        }
        var elem2d = type.name === 'auto' ? 'int' : type.name;
        var def2 = defaultOf(elem2d, this.classes);
        var grid = [];
        for (var r = 0; r < rows; r++) {
          var rowArr = [];
          for (var c2 = 0; c2 < cols; c2++) rowArr.push(def2.v);
          if (initRows && r < initRows.length) {
            var rl = initRows[r];
            if (rl.k !== 'list') throw new CppError('二维数组初始值应该按行用 { } 分组', node.line);
            if (rl.items.length > cols) throw new CppError('某行初始值个数超过了列数', node.line);
            for (var c3 = 0; c3 < rl.items.length; c3++) {
              rowArr[c3] = convert(this.eval(rl.items[c3], env), elem2d, null, node.line).v;
            }
          }
          grid.push({ t: 'array', elem: elem2d, v: rowArr });
        }
        cell = { t: 'array', elem: 'row', v: grid };
      } else if (d.arr != null) {
        var size;
        var initVals = null;
        if (d.init && d.init.k === 'list') initVals = d.init.items;
        if (d.arr === 'auto') {
          if (!initVals) throw new CppError('省略数组长度时必须用 { } 给出初始值', node.line);
          size = initVals.length;
        } else {
          var sv = this.eval(d.arr, env);
          if (!isNumT(sv.t)) throw new CppError('数组长度必须是整数', node.line);
          size = Math.trunc(numOf(sv));
          if (size < 0 || size > 100000) throw new CppError('数组长度不合适（0 ~ 100000）', node.line);
        }
        var elem = type.name === 'auto' ? 'int' : type.name;
        var arr = [];
        var def = defaultOf(elem, this.classes);
        for (var j = 0; j < size; j++) {
          if (this.classes[elem]) arr.push(this.construct(this.classes[elem], [], node.line));
          else arr.push(def.v);
        }
        if (initVals) {
          if (initVals.length > size) throw new CppError('初始值个数(' + initVals.length + ')超过了数组长度(' + size + ')', node.line);
          for (var k = 0; k < initVals.length; k++) {
            var iv = this.eval(initVals[k], env);
            arr[k] = convert(iv, elem, null, node.line).v;
          }
        }
        cell = { t: 'array', elem: elem, v: arr };
      } else if (type.name === 'vector') {
        var elem2 = type.elem || 'int';
        var vec = [];
        if (d.init && d.init.k === 'list') {
          for (var a = 0; a < d.init.items.length; a++) vec.push(convert(this.eval(d.init.items[a], env), elem2, null, node.line).v);
        } else if (d.init) {
          var vv = this.eval(d.init, env);
          if (vv.t !== 'vector') throw new CppError('vector 只能用 vector 初始化', node.line);
          vec = vv.v.slice();
        } else if (d.ctorArgs) {
          if (d.ctorArgs.length === 1) {
            var nv = this.eval(d.ctorArgs[0], env);
            var cnt = Math.trunc(numOf(nv));
            if (cnt < 0 || cnt > 100000) throw new CppError('vector 长度不合适', node.line);
            var dv = defaultOf(elem2, this.classes);
            for (var b = 0; b < cnt; b++) vec.push(dv.v);
          } else if (d.ctorArgs.length === 2) {
            var nv2 = this.eval(d.ctorArgs[0], env);
            var fv = this.eval(d.ctorArgs[1], env);
            var cnt2 = Math.trunc(numOf(nv2));
            if (cnt2 < 0 || cnt2 > 100000) throw new CppError('vector 长度不合适', node.line);
            var fvc = convert(fv, elem2, null, node.line);
            for (var c = 0; c < cnt2; c++) vec.push(fvc.v);
          } else throw new CppError('vector 初始化只支持 v、v(n)、v(n, 值) 或 {列表}', node.line);
        }
        cell = { t: 'vector', elem: elem2, v: vec };
      } else if (this.classes[type.name]) {
        var cls = this.classes[type.name];
        if (d.ctorArgs) {
          var cargs = this.evalArgs(d.ctorArgs, env);
          cell = this.construct(cls, cargs.map(function (x) { return x.val; }), node.line);
        } else if (d.init) {
          var ov = this.eval(d.init, env);
          if (ov.t !== 'object' || ov.cls.name !== cls.name) throw new CppError('类型不匹配：需要 ' + cls.name + ' 对象', node.line);
          cell = this.cloneVal(ov);
        } else {
          cell = this.construct(cls, [], node.line);
        }
      } else {
        var tname = type.name;
        if (d.init) {
          var initV = this.eval(d.init, env);
          if (tname === 'auto') cell = { t: initV.t, v: initV.v, elem: initV.elem };
          else cell = convert(initV, tname, null, node.line);
        } else {
          cell = defaultOf(tname, this.classes);
        }
      }
      env.declare(d.name, cell, node.line);
    }
  };

  Interp.prototype.evalArgs = function (nodes, env) {
    var res = [];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var desc = null;
      if (n.k === 'ident' || n.k === 'index' || n.k === 'member') {
        try { desc = this.lvalue(n, env); } catch (e) { desc = null; }
      }
      var val = desc ? lread(this, desc, n.line) : this.eval(n, env);
      res.push({ val: val, desc: desc });
    }
    return res;
  };

  /* 表达式求值 */
  Interp.prototype.eval = function (node, env) {
    this.tick(node.line);
    var self = this;
    switch (node.k) {
      case 'lit': return { t: node.t, v: node.v };
      case 'list': throw new CppError('{ } 初始值列表只能用在定义数组/vector 的时候', node.line);
      case 'ident': {
        if (node.name === 'this') {
          if (!env.thisObj) throw new CppError('this 只能在类的方法里使用', node.line);
          return env.thisObj;
        }
        if (node.name === 'endl') return { t: 'endl', v: '\n' };
        var c = env.get(node.name, node.line);
        return c;
      }
      case 'index': {
        var d = this.lvalue(node, env);
        return lread(this, d, node.line);
      }
      case 'member': {
        var obj = this.eval(node.obj, env);
        if (obj.t === 'object') {
          var d2 = this.lvalue(node, env);
          return lread(this, d2, node.line);
        }
        throw new CppError('只有对象才能用 "." 访问成员', node.line);
      }
      case 'assign': {
        var desc = this.lvalue(node.target, env);
        var rhs = this.eval(node.val, env);
        if (node.op !== '=') {
          var cur = lread(this, desc, node.line);
          rhs = this.binaryOp(node.op.slice(0, 1), cur, rhs, node.line);
        }
        this.writeL(desc, rhs, node.line);
        return lread(this, desc, node.line);
      }
      case 'addr': {
        var ad = this.lvalue(node.a, env);
        if (ad.cell) return { t: 'ptr', base: ad.cell, idx: null };
        if (ad.arr) return { t: 'ptr', base: ad.arr, idx: ad.idx };
        throw new CppError('& 后面需要变量或数组元素', node.line);
      }
      case 'deref': return lread(this, this.ptrDesc(node, env), node.line);
      case 'cast': {
        var cv = this.eval(node.a, env);
        return convert(cv, node.type, null, node.line);
      }
      case 'ternary':
        return truthy(this.eval(node.cond, env), node.line) ? this.eval(node.a, env) : this.eval(node.b, env);
      case 'unary': {
        if (node.op === '++' || node.op === '--') {
          var dd = this.lvalue(node.a, env);
          var old = lread(this, dd, node.line);
          if (old.t === 'ptr') {
            if (old.idx == null) throw new CppError('这个指针不指向数组，不能 ++/-- 移动', node.line);
            var np = { t: 'ptr', base: old.base, idx: old.idx + (node.op === '++' ? 1 : -1) };
            this.writeL(dd, np, node.line);
            return node.prefix ? lread(this, dd, node.line) : old;
          }
          if (!isNumT(old.t)) throw new CppError('++/-- 只能用于数字、字符或数组指针', node.line);
          var nv = numOf(old) + (node.op === '++' ? 1 : -1);
          var nval = old.t === 'char' ? { t: 'char', v: String.fromCharCode(nv & 255) } : { t: old.t === 'bool' ? 'int' : old.t, v: nv };
          this.writeL(dd, nval, node.line);
          return node.prefix ? lread(this, dd, node.line) : old;
        }
        var v = this.eval(node.a, env);
        if (node.op === '!') return { t: 'bool', v: !truthy(v, node.line) };
        if (node.op === '-') {
          if (!isNumT(v.t)) throw new CppError('负号只能用于数字', node.line);
          return { t: v.t === 'double' ? 'double' : 'int', v: -numOf(v) };
        }
        if (node.op === '+') return v;
        throw new CppError('未知运算符 ' + node.op, node.line);
      }
      case 'binary': {
        var op = node.op;
        if (op === '&&') return { t: 'bool', v: truthy(this.eval(node.a, env), node.line) && truthy(this.eval(node.b, env), node.line) };
        if (op === '||') return { t: 'bool', v: truthy(this.eval(node.a, env), node.line) || truthy(this.eval(node.b, env), node.line) };
        var a = this.eval(node.a, env);
        if (a.t === 'stream' && a.v === 'cout' && op === '<<') {
          var r = this.eval(node.b, env);
          this.out += r.t === 'endl' ? '\n' : fmt(r, node.line);
          return a;
        }
        if (a.t === 'stream' && a.v === 'cin' && op === '>>') {
          var desc2 = this.lvalue(node.b, env);
          var tok = this.readToken(node.line);
          var target = lread(this, desc2, node.line);
          var nv2;
          if (target.t === 'int' || target.t === 'bool') {
            if (!/^[+-]?\d+$/.test(tok)) throw new CppError('cin 期待一个整数，却读到了 "' + tok + '"', node.line);
            nv2 = target.t === 'bool' ? { t: 'bool', v: parseInt(tok, 10) !== 0 } : { t: 'int', v: parseInt(tok, 10) };
          } else if (target.t === 'double') {
            if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(tok)) throw new CppError('cin 期待一个数字，却读到了 "' + tok + '"', node.line);
            nv2 = { t: 'double', v: parseFloat(tok) };
          } else if (target.t === 'char') {
            nv2 = { t: 'char', v: tok.charAt(0) };
          } else if (target.t === 'string') {
            nv2 = { t: 'string', v: tok };
          } else throw new CppError('cin 不能读入这种类型的变量', node.line);
          this.writeL(desc2, nv2, node.line);
          return a;
        }
        var b = this.eval(node.b, env);
        return this.binaryOp(op, a, b, node.line);
      }
      case 'call': return this.evalCall(node, env);
      default: throw new CppError('内部错误：未知表达式 ' + node.k, node.line);
    }
  };

  Interp.prototype.binaryOp = function (op, a, b, line) {
    if (op === '+') {
      if (a.t === 'string' || b.t === 'string') {
        return { t: 'string', v: fmt(a, line) + fmt(b, line) };
      }
    }
    if (a.t === 'ptr' || b.t === 'ptr' || a.t === 'nullptr' || b.t === 'nullptr') {
      var pa = a.t === 'nullptr' ? { t: 'ptr', base: null, idx: 0 } : a;
      var pb = b.t === 'nullptr' ? { t: 'ptr', base: null, idx: 0 } : b;
      if ((op === '==' || op === '!=' || op === '<' || op === '>' || op === '<=' || op === '>=') && (pa.t !== 'ptr' || pb.t !== 'ptr')) throw new CppError('指针只能和指针/nullptr 比较', line);
      if (op === '==' || op === '!=') {
        var peq = pa.base === pb.base && (pa.base == null || pa.idx === pb.idx);
        return { t: 'bool', v: op === '==' ? peq : !peq };
      }
      if (op === '<' || op === '>' || op === '<=' || op === '>=') {
        if (pa.base !== pb.base || pa.base == null) throw new CppError('只有指向同一数组的指针才能比较大小', line);
        var pr = pa.idx < pb.idx ? -1 : (pa.idx > pb.idx ? 1 : 0);
        return { t: 'bool', v: op === '<' ? pr < 0 : op === '>' ? pr > 0 : op === '<=' ? pr <= 0 : pr >= 0 };
      }
      if (op === '-' && pa.t === 'ptr' && pb.t === 'ptr') {
        if (pa.base !== pb.base) throw new CppError('只有指向同一数组的指针才能相减', line);
        return { t: 'int', v: pa.idx - pb.idx };
      }
      if ((op === '+' || op === '-') && ((pa.t === 'ptr') !== (pb.t === 'ptr'))) {
        var pp = pa.t === 'ptr' ? pa : pb;
        var nn = pa.t === 'ptr' ? pb : pa;
        if (!isNumT(nn.t)) throw new CppError('指针只能加减整数', line);
        if (pp.idx == null) throw new CppError('这个指针不指向数组，不能做加减移动', line);
        var delta = Math.trunc(numOf(nn)) * (op === '-' && pa.t === 'ptr' ? -1 : 1);
        return { t: 'ptr', base: pp.base, idx: pp.idx + delta };
      }
      throw new CppError('指针不支持运算符 "' + op + '"', line);
    }
    if ((a.t === 'array' || b.t === 'array') && (op === '+' || op === '-')) {
      var av = a.t === 'array' ? a : b;
      var nv = a.t === 'array' ? b : a;
      if (isNumT(nv.t) && op === '+') return { t: 'ptr', base: av, idx: Math.trunc(numOf(nv)) };
    }
    if (op === '==' || op === '!=') {
      var eq;
      if (a.t === 'string' || b.t === 'string') eq = fmt(a, line) === fmt(b, line);
      else if (a.t === 'object' || b.t === 'object') eq = a === b;
      else if (isNumT(a.t) && isNumT(b.t)) eq = numOf(a) === numOf(b);
      else eq = a.v === b.v;
      return { t: 'bool', v: op === '==' ? eq : !eq };
    }
    if (op === '<' || op === '>' || op === '<=' || op === '>=') {
      var r2;
      if (a.t === 'string' && b.t === 'string') {
        r2 = a.v < b.v ? -1 : (a.v > b.v ? 1 : 0);
      } else if (isNumT(a.t) && isNumT(b.t)) {
        var x = numOf(a), y = numOf(b);
        r2 = x < y ? -1 : (x > y ? 1 : 0);
      } else throw new CppError('这两个值不能比较大小', line);
      var res = op === '<' ? r2 < 0 : op === '>' ? r2 > 0 : op === '<=' ? r2 <= 0 : r2 >= 0;
      return { t: 'bool', v: res };
    }
    if (!isNumT(a.t) || !isNumT(b.t)) {
      if ((op === '<<' || op === '>>') && (a.t === 'stream' || b.t === 'stream')) {
        throw new CppError('流运算符用错了：cout 配 <<，cin 配 >>', line);
      }
      throw new CppError('运算符 "' + op + '" 两边应该是数字（检查一下类型）', line);
    }
    var na = numOf(a), nb = numOf(b);
    var isD = a.t === 'double' || b.t === 'double';
    switch (op) {
      case '+': return { t: isD ? 'double' : 'int', v: na + nb };
      case '-': return { t: isD ? 'double' : 'int', v: na - nb };
      case '*': return { t: isD ? 'double' : 'int', v: isD ? na * nb : Math.trunc(na * nb) };
      case '/':
        if (nb === 0) throw new CppError('除数是 0！数学上不能除以 0，检查一下除数', line);
        return { t: isD ? 'double' : 'int', v: isD ? na / nb : Math.trunc(na / nb) };
      case '%':
        if (nb === 0) throw new CppError('取余 % 的右边不能是 0', line);
        if (isD) throw new CppError('% 取余只能用于整数', line);
        return { t: 'int', v: na % nb };
      case '<<': return { t: 'int', v: Math.trunc(na) << Math.trunc(nb) };
      case '>>': return { t: 'int', v: Math.trunc(na) >> Math.trunc(nb) };
      case '&': return { t: 'int', v: Math.trunc(na) & Math.trunc(nb) };
      case '|': return { t: 'int', v: Math.trunc(na) | Math.trunc(nb) };
      case '^': return { t: 'int', v: Math.trunc(na) ^ Math.trunc(nb) };
    }
    throw new CppError('未知运算符 "' + op + '"', line);
  };

  /* 调用：内置函数 / 用户函数 / 方法 / 构造 */
  Interp.prototype.evalCall = function (node, env) {
    var self = this;
    var callee = node.callee;

    /* 成员方法调用 */
    if (callee.k === 'member') {
      var obj = this.eval(callee.obj, env);
      var name = callee.name;
      if (obj.t === 'string') return this.stringMethod(obj, name, node, env);
      if (obj.t === 'vector') return this.vectorMethod(obj, name, node, env);
      if (obj.t === 'object') {
        var cls = obj.cls;
        var ms = cls.methods.filter(function (m) { return m.name === name; });
        if (!ms.length) throw new CppError('类 ' + cls.name + ' 没有方法 "' + name + '"', node.line);
        var args = this.evalArgs(node.args, env);
        var m = null;
        for (var i = 0; i < ms.length; i++) if (ms[i].params.length === args.length) { m = ms[i]; break; }
        if (!m) throw new CppError('方法 ' + name + ' 需要 ' + ms[0].params.length + ' 个参数', node.line);
        if (m.access === 'private' && this.currentClass !== cls.name) {
          throw new CppError('方法 "' + name + '" 是私有的(private)，不能在类外调用', node.line);
        }
        return this.runBody(m, args, node.line, obj, cls.name, cls.name + '::' + name);
      }
      throw new CppError('这种数据没有方法 "' + name + '"', node.line);
    }

    if (callee.k !== 'ident') throw new CppError('这个表达式不能像函数一样调用', node.line);
    var fname = callee.name;

    /* 构造函数表达式，如 Point(1,2) */
    if (this.classes[fname]) {
      var cargs = this.evalArgs(node.args, env);
      return this.construct(this.classes[fname], cargs.map(function (x) { return x.val; }), node.line);
    }

    /* STL 算法：sort / reverse / binary_search（接受指针或迭代器） */
    if (fname === 'sort' || fname === 'reverse' || fname === 'binary_search') {
      var needArgs = fname === 'binary_search' ? 3 : 2;
      if (node.args.length !== needArgs) throw new CppError(fname + ' 用法：' + (fname === 'binary_search' ? 'binary_search(起, 止, 值)' : fname + '(起, 止)') + '，如 sort(a, a+n) 或 sort(v.begin(), v.end())', node.line);
      var sp1 = this.eval(node.args[0], env), sp2 = this.eval(node.args[1], env);
      if (sp1.t === 'array') sp1 = { t: 'ptr', base: sp1, idx: 0 };
      if (sp2.t === 'array') sp2 = { t: 'ptr', base: sp2, idx: 0 };
      if (sp1.t !== 'ptr' || sp2.t !== 'ptr') throw new CppError(fname + ' 需要两个指针/迭代器，如 sort(a, a+n) 或 sort(v.begin(), v.end())', node.line);
      if (!sp1.base || sp1.base !== sp2.base) throw new CppError(fname + ' 的两个指针必须指向同一个数组/vector', node.line);
      var sarr = sp1.base.v;
      var slo = sp1.idx == null ? 0 : sp1.idx, shi = sp2.idx == null ? sarr.length : sp2.idx;
      if (slo < 0 || shi > sarr.length || slo > shi) throw new CppError(fname + ' 的范围越界了', node.line);
      var selem = sp1.base.elem || 'int';
      var slice = sarr.slice(slo, shi);
      if (fname === 'binary_search') {
        var xv = this.eval(node.args[2], env);
        var target = selem === 'string' ? String(xv.v) : numOf(xv);
        var found = false, bl = 0, br = slice.length - 1;
        while (bl <= br) {
          var bm = (bl + br) >> 1;
          if (slice[bm] === target) { found = true; break; }
          else if (slice[bm] < target) bl = bm + 1;
          else br = bm - 1;
        }
        return { t: 'bool', v: found };
      }
      if (fname === 'sort') slice.sort(function (x, y) { return selem === 'string' ? (x < y ? -1 : x > y ? 1 : 0) : x - y; });
      else slice.reverse();
      for (var si = slo; si < shi; si++) sarr[si] = slice[si - slo];
      return { t: 'void', v: 0 };
    }

    /* 特殊内置：需要左值或流 */
    if (fname === 'swap') {
      if (node.args.length !== 2) throw new CppError('swap 需要两个变量', node.line);
      var d1 = this.lvalue(node.args[0], env), d2 = this.lvalue(node.args[1], env);
      var v1 = lread(this, d1, node.line), v2 = lread(this, d2, node.line);
      this.writeL(d1, v2, node.line);
      this.writeL(d2, v1, node.line);
      return { t: 'void', v: 0 };
    }
    if (fname === 'getline') {
      if (node.args.length !== 2) throw new CppError('getline 用法：getline(cin, 字符串变量)', node.line);
      var s0 = this.eval(node.args[0], env);
      if (s0.t !== 'stream' || s0.v !== 'cin') throw new CppError('getline 第一个参数应该是 cin', node.line);
      var sd = this.lvalue(node.args[1], env);
      this.writeL(sd, { t: 'string', v: this.readLine(node.line) }, node.line);
      return { t: 'string', v: '' };
    }

    var args2 = this.evalArgs(node.args, env);
    var vals = args2.map(function (x) { return x.val; });

    /* 普通内置函数 */
    var B = this.builtins();
    if (B[fname]) return B[fname](vals, node.line, this);

    /* 用户函数 */
    var fns = this.funcs[fname];
    if (!fns || !fns.length) {
      throw new CppError('找不到函数 "' + fname + '"。检查一下名字拼写，或者它是不是还没定义', node.line);
    }
    var fn = null;
    for (var j = 0; j < fns.length; j++) if (fns[j].params.length === args2.length) { fn = fns[j]; break; }
    if (!fn) throw new CppError('函数 ' + fname + ' 需要 ' + fns[0].params.length + ' 个参数，却传了 ' + args2.length + ' 个', node.line);
    return this.runBody(fn, args2, node.line, env.thisObj, this.currentClass, fname);
  };

  Interp.prototype.stringMethod = function (obj, name, node, env) {
    var args = this.evalArgs(node.args, env).map(function (x) { return x.val; });
    var s = obj.v;
    var need = function (n) { if (args.length !== n) throw new CppError('字符串方法 ' + name + ' 需要 ' + n + ' 个参数', node.line); };
    switch (name) {
      case 'length': case 'size': need(0); return { t: 'int', v: s.length };
      case 'empty': need(0); return { t: 'bool', v: s.length === 0 };
      case 'at': {
        need(1);
        var i = Math.trunc(numOf(args[0]));
        if (i < 0 || i >= s.length) throw new CppError('字符串下标越界（长度 ' + s.length + '）', node.line);
        return { t: 'char', v: s.charAt(i) };
      }
      case 'substr': {
        if (args.length < 1 || args.length > 2) throw new CppError('substr 用法：s.substr(起点) 或 s.substr(起点, 长度)', node.line);
        var p = Math.trunc(numOf(args[0]));
        if (p < 0 || p > s.length) throw new CppError('substr 起点越界（长度 ' + s.length + '）', node.line);
        var len = args.length === 2 ? Math.trunc(numOf(args[1])) : s.length - p;
        if (len < 0) len = 0;
        return { t: 'string', v: s.substr(p, len) };
      }
      case 'find': {
        need(1);
        var idx = s.indexOf(String(args[0].v));
        return { t: 'int', v: idx }; // 教学简化：找不到返回 -1
      }
      case 'push_back': {
        need(1);
        var ch = convert(args[0], 'char', null, node.line).v;
        obj.v = s + ch;
        return { t: 'void', v: 0 };
      }
      case 'clear': need(0); obj.v = ''; return { t: 'void', v: 0 };
      case 'append': {
        need(1);
        obj.v = s + fmt(args[0], node.line);
        return { t: 'void', v: 0 };
      }
    }
    throw new CppError('字符串没有方法 "' + name + '"（可用：length、size、substr、at、find、push_back、empty、clear）', node.line);
  };

  Interp.prototype.vectorMethod = function (obj, name, node, env) {
    var args = this.evalArgs(node.args, env).map(function (x) { return x.val; });
    var need = function (n) { if (args.length !== n) throw new CppError('vector 方法 ' + name + ' 需要 ' + n + ' 个参数', node.line); };
    switch (name) {
      case 'push_back': {
        need(1);
        if (obj.v.length >= 100000) throw new CppError('vector 太大了（教学限制 10 万元素）', node.line);
        obj.v.push(convert(args[0], obj.elem, null, node.line).v);
        return { t: 'void', v: 0 };
      }
      case 'pop_back': {
        need(0);
        if (!obj.v.length) throw new CppError('vector 是空的，不能 pop_back', node.line);
        obj.v.pop();
        return { t: 'void', v: 0 };
      }
      case 'size': need(0); return { t: 'int', v: obj.v.length };
      case 'begin': need(0); return { t: 'ptr', base: obj, idx: 0 };
      case 'end': need(0); return { t: 'ptr', base: obj, idx: obj.v.length };
      case 'empty': need(0); return { t: 'bool', v: obj.v.length === 0 };
      case 'clear': need(0); obj.v = []; return { t: 'void', v: 0 };
      case 'at': case 'back': {
        var i = name === 'back' ? obj.v.length - 1 : Math.trunc(numOf(args[0]));
        if (i < 0 || i >= obj.v.length) throw new CppError('vector 下标越界（长度 ' + obj.v.length + '）', node.line);
        return { t: obj.elem, v: obj.v[i] };
      }
    }
    throw new CppError('vector 没有方法 "' + name + '"（可用：push_back、pop_back、size、empty、at、back、clear）', node.line);
  };

  Interp.prototype.builtins = function () {
    var self = this;
    function num1(v, line) {
      if (!isNumT(v.t)) throw new CppError('这个函数需要数字参数', line);
      return numOf(v);
    }
    function intRet(v) { return { t: 'int', v: Math.trunc(v) }; }
    function dblRet(v) { return { t: 'double', v: v }; }
    return {
      abs: function (a, l) { return intRet(Math.abs(num1(a[0], l))); },
      fabs: function (a, l) { return dblRet(Math.abs(num1(a[0], l))); },
      sqrt: function (a, l) {
        var x = num1(a[0], l);
        if (x < 0) throw new CppError('sqrt 不能对负数开平方', l);
        return dblRet(Math.sqrt(x));
      },
      pow: function (a, l) { return dblRet(Math.pow(num1(a[0], l), num1(a[1], l))); },
      floor: function (a, l) { return dblRet(Math.floor(num1(a[0], l))); },
      ceil: function (a, l) { return dblRet(Math.ceil(num1(a[0], l))); },
      round: function (a, l) { return dblRet(Math.round(num1(a[0], l))); },
      max: function (a, l) {
        if (a[0].t === 'string' && a[1].t === 'string') return a[0].v >= a[1].v ? a[0] : a[1];
        var x = num1(a[0], l), y = num1(a[1], l);
        var isD = a[0].t === 'double' || a[1].t === 'double';
        return { t: isD ? 'double' : 'int', v: Math.max(x, y) };
      },
      min: function (a, l) {
        if (a[0].t === 'string' && a[1].t === 'string') return a[0].v <= a[1].v ? a[0] : a[1];
        var x = num1(a[0], l), y = num1(a[1], l);
        var isD = a[0].t === 'double' || a[1].t === 'double';
        return { t: isD ? 'double' : 'int', v: Math.min(x, y) };
      },
      to_string: function (a, l) { return { t: 'string', v: fmt(a[0], l) }; },
      stoi: function (a, l) {
        var s = String(a[0].v).trim();
        var m = /^[+-]?\d+/.exec(s);
        if (!m) throw new CppError('stoi 无法把 "' + s + '" 转成整数', l);
        return intRet(parseInt(m[0], 10));
      },
      stod: function (a, l) {
        var s = String(a[0].v).trim();
        var m = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(s);
        if (!m) throw new CppError('stod 无法把 "' + s + '" 转成小数', l);
        return dblRet(parseFloat(m[0]));
      },
      srand: function (a, l) { self.randSeed = Math.trunc(num1(a[0], l)) >>> 0; return { t: 'void', v: 0 }; },
      rand: function (a, l) {
        self.randSeed = (self.randSeed * 1103515245 + 12345) >>> 0;
        return intRet((self.randSeed >>> 16) & 32767);
      }
    };
  };

  /* ---------------- 入口 ---------------- */
  function run(code, stdin) {
    try {
      var toks = tokenize(code);
      var parser = new Parser(toks);
      var items = parser.parseProgram();
      var it = new Interp(stdin);
      items.forEach(function (item) {
        if (item.k === 'class') it.classes[item.name] = item;
        else if (item.k === 'func') {
          if (!it.funcs[item.name]) it.funcs[item.name] = [];
          it.funcs[item.name].push(item);
        }
      });
      it.globals.m['cout'] = { t: 'stream', v: 'cout' };
      it.globals.m['cin'] = { t: 'stream', v: 'cin' };
      items.forEach(function (item) {
        if (item.k === 'decl') it.execDecl(item, it.globals);
      });
      var mains = it.funcs['main'];
      if (!mains || !mains.length) throw new CppError('找不到 main 函数。每个 C++ 程序都要有 int main() { ... } 作为入口', 0);
      it.runBody(mains[0], [], 0, null, null, 'main');
      return { ok: true, output: it.out, steps: it.steps };
    } catch (e) {
      if (e instanceof CppError) {
        return { ok: false, error: (e.line ? '第 ' + e.line + ' 行：' : '') + e.message, line: e.line };
      }
      if (e && e.sig) return { ok: false, error: 'break/continue/return 出现在了不该出现的位置', line: 0 };
      if (e instanceof RangeError) return { ok: false, error: '递归太深了！检查一下递归的结束条件', line: 0 };
      return { ok: false, error: '解释器遇到了问题：' + (e && e.message ? e.message : String(e)), line: 0 };
    }
  }

  function normalize(s) {
    return String(s == null ? '' : s)
      .replace(/\r/g, '')
      .split('\n')
      .map(function (l) { return l.replace(/[ \t]+$/, ''); })
      .join('\n')
      .replace(/\n+$/, '');
  }

  var api = { run: run, normalize: normalize };
  global.CppInterp = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
