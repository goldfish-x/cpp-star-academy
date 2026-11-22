/* ============================================================
 * 游戏化系统：经验 / 等级 / 称号 / 徽章 / 打卡 / 错题本
 * 进度保存在浏览器 localStorage，离线可用
 * ============================================================ */
(function (global) {
  'use strict';

  var KEY = 'cpp_academy_v1';

  var TITLES = [
    '编程新手', '代码学徒', '逻辑见习生', '循环骑士', '分支法师',
    '数组猎人', '函数工匠', '字符串诗人', '递归行者', '算法先锋',
    '结构大师', '对象领主', '星际毕业生', 'C++ 传奇大师'
  ];

  var BADGES = [
    { id: 'first_run', icon: '🚀', name: '初次点火', desc: '第一次运行代码', check: function (s) { return s.stats.runs >= 1; } },
    { id: 'first_pass', icon: '⚔️', name: '首战告捷', desc: '通过第一道练习', check: function (s) { return s.stats.passes >= 1; } },
    { id: 'teacher', icon: '🧑‍🏫', name: '费曼小老师', desc: '第一次用自己的话讲懂概念', check: function (s) { return s.stats.feynman >= 1; } },
    { id: 'chapter1', icon: '🛸', name: '启航勋章', desc: '完成第 1 章闯关', check: function (s) { return chPassed(s, 'c1'); } },
    { id: 'explorer', icon: '🗺️', name: '概念收藏家', desc: '读完 20 张概念卡', check: function (s) { return s.stats.concepts >= 20; } },
    { id: 'perfect5', icon: '⚡', name: '五连绝世', desc: '连续 5 题一次通过', check: function (s) { return s.stats.bestPerfect >= 5; } },
    { id: 'debugger', icon: '🔧', name: '调试勇士', desc: '失败 3 次以上仍攻克难题', check: function (s) { return s.stats.debugFixes >= 1; } },
    { id: 'wrongfix', icon: '🩹', name: '错题克星', desc: '订正 3 道错题本里的题', check: function (s) { return s.stats.corrections >= 3; } },
    { id: 'streak3', icon: '📅', name: '三日之约', desc: '连续学习 3 天', check: function (s) { return s.streak.best >= 3; } },
    { id: 'streak7', icon: '🌟', name: '七日恒星', desc: '连续学习 7 天', check: function (s) { return s.streak.best >= 7; } },
    { id: 'runner', icon: '🔭', name: '探索引擎', desc: '累计运行代码 50 次', check: function (s) { return s.stats.runs >= 50; } },
    { id: 'scholar', icon: '📚', name: '勤学先锋', desc: '累计通过 30 个任务', check: function (s) { return s.stats.passes >= 30; } },
    { id: 'speed', icon: '💨', name: '闪电手', desc: '一次通过任意章末闯关', check: function (s) { return s.stats.challengeFirstTry >= 1; } },
    { id: 'half', icon: '🧭', name: '半程领航员', desc: '完成半程章末闯关（8 个）', check: function (s) { return challengesPassed(s) >= Math.ceil(CURRICULUM.length / 2); } },
    { id: 'rich', icon: '👑', name: '经验大亨', desc: '达到 10 级', check: function (s) { return levelInfo(s.xp).level >= 10; } },
    { id: 'graduate', icon: '🎓', name: '星际毕业生', desc: '完成全部 16 章闯关', check: function (s) { return challengesPassed(s) >= CURRICULUM.length; } }
  ];

  function chPassed(s, id) {
    return !!(s.chapters[id] && s.chapters[id].challenge && s.chapters[id].challenge.passed);
  }
  function challengesPassed(s) {
    var n = 0;
    for (var k in s.chapters) if (chPassed(s, k)) n++;
    return n;
  }
  function needFor(level) { return 50 + 25 * (level - 1); }
  function levelInfo(xp) {
    var level = 1, rest = xp;
    while (rest >= needFor(level)) { rest -= needFor(level); level++; }
    var need = needFor(level);
    var title = TITLES[Math.min(level - 1, TITLES.length - 1)];
    return { level: level, cur: rest, need: need, pct: Math.min(100, Math.round(rest / need * 100)), title: title };
  }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function yesterdayStr() {
    var d = new Date(); d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function freshState() {
    return {
      name: '', robot: '', createdAt: Date.now(),
      xp: 0, badges: {},
      chapters: {},
      streak: { last: '', count: 0, best: 0 },
      stats: { runs: 0, passes: 0, feynman: 0, concepts: 0, corrections: 0, debugFixes: 0, perfect: 0, bestPerfect: 0, challengeFirstTry: 0 },
      wrongBook: [],
      today: { date: todayStr(), done: 0 },
      codeStore: {},
      settings: { sound: true },
      graduated: false
    };
  }

  var Game = {
    state: null,
    BADGES: BADGES,
    TITLES: TITLES,
    levelInfo: levelInfo,
    todayStr: todayStr,
    /* UI 回调，由 app.js 注入 */
    onXp: null, onLevelUp: null, onBadge: null,

    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        this.state = raw ? JSON.parse(raw) : freshState();
      } catch (e) { this.state = freshState(); }
      var f = freshState();
      for (var k in f) if (this.state[k] === undefined) this.state[k] = f[k];
      for (var k2 in f.stats) if (this.state.stats[k2] === undefined) this.state.stats[k2] = f.stats[k2];
      return this.state;
    },
    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(this.state)); } catch (e) {}
    },
    reset: function () {
      this.state = freshState();
      this.save();
    },

    chData: function (chId) {
      if (!this.state.chapters[chId]) {
        this.state.chapters[chId] = { concepts: {}, feynman: false, tasks: {}, challenge: null };
      }
      return this.state.chapters[chId];
    },
    taskData: function (chId, taskId, isChallenge) {
      var cd = this.chData(chId);
      var slot = isChallenge ? 'challenge' : 'tasks';
      if (isChallenge) {
        if (!cd.challenge) cd.challenge = { passed: false, attempts: 0, fails: 0, seenSolution: false, firstTry: false };
        return cd.challenge;
      }
      if (!cd.tasks[taskId]) cd.tasks[taskId] = { passed: false, attempts: 0, fails: 0, seenSolution: false, firstTry: false };
      return cd.tasks[taskId];
    },

    /* 每日打卡：返回 {isNewDay, streak, comeback} */
    touchDay: function () {
      var s = this.state, t = todayStr();
      var isNewDay = s.streak.last !== t;
      var comeback = false;
      if (isNewDay) {
        if (s.streak.last === yesterdayStr()) s.streak.count++;
        else if (s.streak.last !== '') { comeback = s.streak.count >= 2; s.streak.count = 1; }
        else s.streak.count = 1;
        s.streak.last = t;
        if (s.streak.count > s.streak.best) s.streak.best = s.streak.count;
        s.today = { date: t, done: 0 };
        this.save();
      } else if (s.today.date !== t) {
        s.today = { date: t, done: 0 };
      }
      return { isNewDay: isNewDay, streak: s.streak.count, comeback: comeback };
    },

    addXp: function (amount, reason) {
      var before = levelInfo(this.state.xp);
      this.state.xp += amount;
      var after = levelInfo(this.state.xp);
      this.save();
      if (this.onXp) this.onXp(amount, reason);
      var newBadges = this.checkBadges();
      if (after.level > before.level && this.onLevelUp) this.onLevelUp(after, before);
      return { levelUp: after.level > before.level, newBadges: newBadges };
    },

    checkBadges: function () {
      var s = this.state, got = [];
      for (var i = 0; i < BADGES.length; i++) {
        var b = BADGES[i];
        if (!s.badges[b.id] && b.check(s)) {
          s.badges[b.id] = Date.now();
          got.push(b);
        }
      }
      if (got.length) {
        this.save();
        if (this.onBadge) for (var j = 0; j < got.length; j++) this.onBadge(got[j]);
      }
      return got;
    },

    markConcept: function (chId, kid) {
      var cd = this.chData(chId);
      if (cd.concepts[kid]) return false;
      cd.concepts[kid] = true;
      this.state.stats.concepts++;
      this.addXp(5, '读懂概念');
      this.save();
      return true;
    },

    markFeynman: function (chId) {
      var cd = this.chData(chId);
      if (cd.feynman) return false;
      cd.feynman = true;
      this.state.stats.feynman++;
      this.state.today.done++;
      this.addXp(15, '小老师讲解');
      this.save();
      return true;
    },

    recordRun: function () {
      this.state.stats.runs++;
      this.checkBadges();
      this.save();
    },

    recordFail: function (chId, taskId, isChallenge) {
      var td = this.taskData(chId, taskId, isChallenge);
      td.attempts++; td.fails++;
      this.state.stats.perfect = 0;
      var inBook = false;
      for (var i = 0; i < this.state.wrongBook.length; i++) {
        if (this.state.wrongBook[i].taskId === taskId) { inBook = true; break; }
      }
      if (td.fails >= 2 && !inBook) {
        this.state.wrongBook.push({ chId: chId, taskId: taskId, isChallenge: !!isChallenge, time: Date.now() });
      }
      this.save();
      return { fails: td.fails, addedToBook: !inBook && td.fails >= 2 };
    },

    markSeenSolution: function (chId, taskId, isChallenge) {
      var td = this.taskData(chId, taskId, isChallenge);
      td.seenSolution = true;
      this.save();
    },

    /* 通过任务：发经验、记统计、清错题 */
    completeTask: function (chId, task, opts) {
      var isChallenge = !!opts.isChallenge;
      var td = this.taskData(chId, task.id, isChallenge);
      var firstPass = !td.passed;
      var firstTry = td.fails === 0 && !td.seenSolution;
      td.attempts++;
      td.passed = true;
      if (firstTry) td.firstTry = true;
      if (isChallenge && firstPass) this.chData(chId).clearedAt = Date.now();

      var s = this.state;
      var xp = 0, reasons = [];
      if (firstPass) {
        s.today.done++;
        s.stats.passes++;
        if (firstTry) {
          s.stats.perfect++;
          if (s.stats.perfect > s.stats.bestPerfect) s.stats.bestPerfect = s.stats.perfect;
        } else {
          s.stats.perfect = 0;
        }
        if (td.fails >= 3) s.stats.debugFixes++;
        if (isChallenge && firstTry) s.stats.challengeFirstTry++;
        xp = task.xp || (isChallenge ? 50 : 20);
        if (td.seenSolution) xp = Math.round(xp / 2);
        else if (firstTry) xp += isChallenge ? 10 : 5;
        reasons.push(isChallenge ? '闯关成功' : '练习通过');
        if (firstTry && !td.seenSolution) reasons.push('一次通过加成');
      }
      /* 错题本订正 */
      for (var i = s.wrongBook.length - 1; i >= 0; i--) {
        if (s.wrongBook[i].taskId === task.id) {
          s.wrongBook.splice(i, 1);
          if (firstPass) { s.stats.corrections++; reasons.push('错题订正'); }
        }
      }
      this.save();
      var award = null;
      if (xp > 0) award = this.addXp(xp, reasons.join(' · '));
      else this.checkBadges();
      /* 毕业检测 */
      var justGraduated = false;
      if (challengesPassed(s) >= CURRICULUM.length && !s.graduated) {
        s.graduated = true; this.save(); justGraduated = true;
      }
      return { firstPass: firstPass, firstTry: firstTry, xp: xp, award: award, justGraduated: justGraduated, seenSolution: td.seenSolution };
    },

    chapterProgress: function (ch) {
      var cd = this.state.chapters[ch.id];
      var total = ch.concepts.length + 1 + ch.tasks.length + 1;
      var done = 0;
      if (cd) {
        for (var i = 0; i < ch.concepts.length; i++) if (cd.concepts[ch.concepts[i].id]) done++;
        if (cd.feynman) done++;
        for (var j = 0; j < ch.tasks.length; j++) {
          var td = cd.tasks[ch.tasks[j].id];
          if (td && td.passed) done++;
        }
        if (cd.challenge && cd.challenge.passed) done++;
      }
      return { done: done, total: total, pct: Math.round(done / total * 100) };
    },
    tasksAllPassed: function (ch) {
      var cd = this.state.chapters[ch.id];
      if (!cd) return false;
      for (var j = 0; j < ch.tasks.length; j++) {
        var td = cd.tasks[ch.tasks[j].id];
        if (!td || !td.passed) return false;
      }
      return true;
    },
    isUnlocked: function (index) {
      if (index === 0) return true;
      var prev = CURRICULUM[index - 1];
      return chPassed(this.state, prev.id);
    },
    challengesPassed: function () { return challengesPassed(this.state); },
    badgeCount: function () {
      var n = 0; for (var k in this.state.badges) n++; return n;
    }
  };

  global.Game = Game;
})(typeof window !== 'undefined' ? window : globalThis);
