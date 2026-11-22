/* ============================================================
 * C++ 星际编程学院 · 主程序
 * 视图渲染 / 代码编辑器 / 评测 / 费曼讲解 / 动画事件
 * ============================================================ */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* GitHub 分享配置（仓库发布后生效） */
  var SHARE = {
    owner: 'goldfish-x',
    repo: 'cpp-star-academy',
    pages: 'https://goldfish-x.github.io/cpp-star-academy/',
    repoUrl: 'https://github.com/goldfish-x/cpp-star-academy'
  };

  var currentChapter = null;   // 章节对象
  var currentTask = null;      // { ch, task, isChallenge }
  var hintLevel = 0;
  var goalCelebratedDate = '';
  var idleTimer = null;
  var lastIdleReset = 0;
  var saveTimer = null;

  /* ---------------- 语法高亮 ---------------- */
  var HL_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(#\s*[a-z]+)|\b(using|namespace|return|if|else|for|while|do|break|continue|struct|class|public|private|protected|true|false|const|void|auto|new|delete|switch|case)\b|\b(int|double|float|bool|char|string|vector|long|short|unsigned|signed|include)\b|\b(cout|cin|endl|getline|main|std)\b|(\b\d+(?:\.\d+)?\b)/g;
  function highlight(code) {
    var out = '', last = 0, m;
    HL_RE.lastIndex = 0;
    while ((m = HL_RE.exec(code)) !== null) {
      out += esc(code.slice(last, m.index));
      var cls = m[1] ? 'hl-com' : m[2] ? 'hl-str' : m[3] ? 'hl-pre' : m[4] ? 'hl-kw' : m[5] ? 'hl-typ' : m[6] ? 'hl-io' : 'hl-num';
      out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
      last = m.index + m[0].length;
      if (m.index === HL_RE.lastIndex) HL_RE.lastIndex++;
    }
    out += esc(code.slice(last));
    return out + '\n';
  }

  /* ---------------- 顶栏 ---------------- */
  function renderTopbar() {
    var s = Game.state;
    var info = Game.levelInfo(s.xp);
    $('hud-level').textContent = 'Lv.' + info.level;
    $('hud-title').textContent = info.title;
    $('xpfill').style.width = info.pct + '%';
    $('xptext').textContent = info.cur + ' / ' + info.need;
    $('streak-n').textContent = s.streak.count;
    $('today-n').textContent = Math.min(s.today.done, 3) + '/3';
    $('badge-n').textContent = Game.badgeCount();
    $('wrong-n').textContent = s.wrongBook.length;
    $('btn-sound').textContent = s.settings.sound ? '🔊' : '🔇';
    $('btn-wrong').classList.toggle('has-items', s.wrongBook.length > 0);
  }

  /* ---------------- 首页星图 ---------------- */
  function renderHome() {
    var s = Game.state;
    var passed = Game.challengesPassed();
    $('hero-stats').innerHTML =
      '<span>🛸 闯关 <b>' + passed + '/' + CURRICULUM.length + '</b></span>' +
      '<span>🏅 徽章 <b>' + Game.badgeCount() + '/16</b></span>' +
      '<span>✨ 总经验 <b>' + s.xp + '</b></span>' +
      '<span>🔥 连续 <b>' + s.streak.count + '</b> 天</span>';
    var grid = $('chapter-grid');
    var html = '';
    for (var i = 0; i < CURRICULUM.length; i++) {
      var ch = CURRICULUM[i];
      var unlocked = Game.isUnlocked(i);
      var prog = Game.chapterProgress(ch);
      var chPassed = !!(s.chapters[ch.id] && s.chapters[ch.id].challenge && s.chapters[ch.id].challenge.passed);
      html += '<div class="chapter-card' + (unlocked ? '' : ' locked') + (chPassed ? ' cleared' : '') + '" data-index="' + i + '">' +
        '<div class="cc-emoji">' + ch.emoji + '</div>' +
        '<div class="cc-num">第 ' + (i + 1) + ' 章' + (chPassed ? ' <span class="cc-star">⭐</span>' : '') + '</div>' +
        '<div class="cc-title">' + esc(ch.title) + '</div>' +
        '<div class="cc-sub">' + esc(ch.subtitle) + '</div>' +
        '<div class="cc-bar"><div style="width:' + prog.pct + '%"></div></div>' +
        '<div class="cc-prog">' + (unlocked ? prog.done + ' / ' + prog.total + ' 完成' : '🔒 通过上一章闯关解锁') + '</div>' +
        '<button class="cc-quick" data-quick="' + i + '">⚡ 直达闯关</button>' +
        '</div>';
    }
    grid.innerHTML = html;
    var cards = grid.querySelectorAll('.chapter-card');
    for (var j = 0; j < cards.length; j++) {
      cards[j].addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        if (!Game.isUnlocked(idx)) {
          Robot.say('这一章还没解锁哦！先通过第 ' + idx + ' 章的闯关挑战，飞船才能继续前进 🚀', 'talk', 5000);
          Robot.sfx('fail');
          return;
        }
        Robot.sfx('click');
        openChapter(idx);
      });
    }
    var quickBtns = grid.querySelectorAll('[data-quick]');
    for (var qb = 0; qb < quickBtns.length; qb++) {
      quickBtns[qb].addEventListener('click', function (ev) {
        ev.stopPropagation();
        var qi = parseInt(this.getAttribute('data-quick'), 10);
        Robot.sfx('click');
        openChapter(qi);
        openEditor(CURRICULUM[qi], CURRICULUM[qi].challenge, true);
        Robot.say('直达闯关模式！⚡ 没做练习也没关系——闯关会检验你是否真的掌握了本章核心。卡住了就回去练一练～', 'talk', 7000);
      });
    }
    var ep = $('epilogue-card');
    if (s.graduated) {
      ep.className = 'epilogue-card unlocked';
      ep.innerHTML = '🎓 <b>毕业寄语：更广阔的星辰大海</b> —— 点击查看进阶路线';
    } else {
      ep.className = 'epilogue-card';
      ep.innerHTML = '🎓 毕业寄语 · 完成全部 ' + CURRICULUM.length + ' 章闯关后开启';
    }
  }

  function findContinueIndex() {
    for (var i = 0; i < CURRICULUM.length; i++) {
      var ch = CURRICULUM[i];
      var cd = Game.state.chapters[ch.id];
      if (!cd || !cd.challenge || !cd.challenge.passed) return i;
    }
    return -1;
  }

  /* ---------------- 章节视图 ---------------- */
  function openChapter(index) {
    currentChapter = CURRICULUM[index];
    $('view-home').classList.add('hidden');
    $('view-chapter').classList.remove('hidden');
    window.scrollTo(0, 0);
    renderChapter();
  }

  function goHome() {
    currentChapter = null;
    $('view-chapter').classList.add('hidden');
    $('view-home').classList.remove('hidden');
    renderHome();
    renderTopbar();
    window.scrollTo(0, 0);
  }

  function renderChapter() {
    var ch = currentChapter;
    if (!ch) return;
    var idx = CURRICULUM.indexOf(ch);
    var cd = Game.chData(ch.id);
    var prog = Game.chapterProgress(ch);
    $('ch-title').innerHTML = ch.emoji + ' 第 ' + (idx + 1) + ' 章 · ' + esc(ch.title);
    $('ch-intro').textContent = ch.intro;
    $('ch-progress').innerHTML = '<div class="cc-bar wide"><div style="width:' + prog.pct + '%"></div></div><span>' + prog.done + '/' + prog.total + '</span>';

    /* 概念卡 */
    var html = '';
    for (var i = 0; i < ch.concepts.length; i++) {
      var k = ch.concepts[i];
      var read = !!cd.concepts[k.id];
      html += '<div class="concept-card' + (read ? ' read' : '') + '" id="cc-' + k.id + '">' +
        '<div class="concept-head"><span class="concept-idx">概念 ' + (i + 1) + '</span><h4>' + esc(k.title) + '</h4>' +
        (read ? '<span class="read-mark">✓ 已读懂</span>' : '') + '</div>' +
        '<div class="concept-body">' + k.html + '</div>' +
        '<div class="concept-demo"><div class="demo-bar"><span>示例代码</span>' +
        '<button class="btn tiny" data-demo="' + k.id + '">▶ 运行看看</button></div>' +
        '<pre class="demo-code">' + esc(k.code) + '</pre>' +
        '<pre class="demo-out hidden" id="demo-out-' + k.id + '"></pre></div>' +
        '<ul class="points">' + k.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
        '<button class="btn small concept-ok" data-ok="' + k.id + '"' + (read ? ' disabled' : '') + '>' +
        (read ? '✓ 已读懂' : '🙋 我懂了！+5 XP') + '</button>' +
        '</div>';
    }
    $('concept-list').innerHTML = html;

    /* 费曼小老师 */
    var f = ch.feynman;
    var fbox = $('feynman-box');
    if (cd.feynman) {
      fbox.innerHTML = '<div class="feynman-passed">✅ <b>讲解通过！</b>你已经能用自己的话讲清楚这一章的核心概念了。<button class="btn small" id="feynman-again">再讲一遍</button></div>' +
        '<div id="feynman-work" class="hidden"></div>';
      $('feynman-again').addEventListener('click', function () {
        $('feynman-work').classList.remove('hidden');
        buildFeynmanForm(f);
      });
    } else {
      fbox.innerHTML = '<div id="feynman-work"></div>';
      buildFeynmanForm(f);
    }

    /* 练习列表 */
    var thtml = '';
    for (var j = 0; j < ch.tasks.length; j++) {
      var t = ch.tasks[j];
      var td = cd.tasks[t.id];
      var status = td && td.passed ? 'passed' : (td && td.fails > 0 ? 'trying' : 'todo');
      var icon = status === 'passed' ? (td.firstTry ? '⚡' : '✅') : status === 'trying' ? '🔧' : '⬜';
      var label = status === 'passed' ? '已通过' : status === 'trying' ? '挑战中 · 失败 ' + td.fails + ' 次' : '未开始';
      thtml += '<div class="task-card ' + status + '" data-task="' + t.id + '">' +
        '<div class="task-icon">' + icon + '</div>' +
        '<div class="task-info"><div class="task-title">练习 ' + (j + 1) + ' · ' + esc(t.title) + '</div>' +
        '<div class="task-story">' + esc(t.story) + '</div></div>' +
        '<div class="task-side"><span class="xp-tag">+' + t.xp + ' XP</span><span class="task-status">' + label + '</span>' +
        '<button class="btn small primary">' + (status === 'passed' ? '回顾' : '开始') + '</button></div>' +
        '</div>';
    }
    $('task-list').innerHTML = thtml;
    var tcards = $('task-list').querySelectorAll('.task-card');
    for (var m = 0; m < tcards.length; m++) {
      tcards[m].addEventListener('click', function () {
        var tid = this.getAttribute('data-task');
        var task = null;
        for (var q = 0; q < ch.tasks.length; q++) if (ch.tasks[q].id === tid) task = ch.tasks[q];
        Robot.sfx('click');
        openEditor(ch, task, false);
      });
    }

    /* 章末闯关 */
    var unlocked = Game.tasksAllPassed(ch);
    var chDone = cd.challenge && cd.challenge.passed;
    var cbox = $('challenge-box');
    var c = ch.challenge;
    cbox.innerHTML = '<div class="challenge-card' + (chDone ? ' cleared' : '') + (unlocked ? '' : ' locked') + '">' +
      '<div class="challenge-title">' + esc(c.title) + (chDone ? ' ⭐' : '') + '</div>' +
      '<div class="challenge-story">' + esc(c.story) + '</div>' +
      '<div class="challenge-foot"><span class="xp-tag big">+' + c.xp + ' XP</span>' +
      '<button class="btn primary" id="btn-challenge">' + (chDone ? '🔁 再次挑战' : '🎮 接受挑战！') + '</button>' +
      (unlocked ? '' : '<span class="lock-note">💡 练习未完成也可直达闯关；建议先练一练更稳</span>') +
      '</div></div>';
    $('btn-challenge').addEventListener('click', function () {
      Robot.sfx('click');
      openEditor(ch, c, true);
    });

    /* 下一章 */
    var next = $('ch-next');
    if (chDone && idx + 1 < CURRICULUM.length) {
      next.innerHTML = '<button class="btn primary big" id="btn-next-ch">🚀 前往第 ' + (idx + 2) + ' 章：' + esc(CURRICULUM[idx + 1].title) + '</button>';
      $('btn-next-ch').addEventListener('click', function () { openChapter(idx + 1); });
    } else if (chDone && idx + 1 === CURRICULUM.length) {
      next.innerHTML = '<button class="btn primary big" id="btn-graduate">🎓 查看毕业寄语</button>';
      $('btn-graduate').addEventListener('click', showEpilogue);
    } else {
      next.innerHTML = '';
    }

    /* 概念卡事件 */
    var demoBtns = $('concept-list').querySelectorAll('[data-demo]');
    for (var d = 0; d < demoBtns.length; d++) {
      demoBtns[d].addEventListener('click', function () {
        var kid = this.getAttribute('data-demo');
        var kon = null;
        for (var q = 0; q < ch.concepts.length; q++) if (ch.concepts[q].id === kid) kon = ch.concepts[q];
        var out = $('demo-out-' + kid);
        out.classList.remove('hidden');
        Game.recordRun();
        var r = CppInterp.run(kon.code, kon.demoInput || '');
        if (r.ok) {
          out.textContent = r.output === '' ? '（程序运行成功，没有输出）' : r.output;
          out.className = 'demo-out';
        } else {
          out.textContent = '⚠ ' + r.error;
          out.className = 'demo-out err';
        }
        Robot.sfx('pop');
        renderTopbar();
      });
    }
    var okBtns = $('concept-list').querySelectorAll('[data-ok]');
    for (var o = 0; o < okBtns.length; o++) {
      okBtns[o].addEventListener('click', function () {
        var kid = this.getAttribute('data-ok');
        if (Game.markConcept(ch.id, kid)) {
          Robot.say('读懂一个概念，离大师又近一步！继续保持 📖', 'happy', 3500);
          renderChapter();
          renderTopbar();
        }
      });
    }
  }

  function buildFeynmanForm(f) {
    var work = $('feynman-work');
    if (!work) return;
    work.innerHTML = '<div class="feynman-prompt">🧑‍🏫 <b>小老师任务：</b>' + esc(f.prompt) + '</div>' +
      '<textarea id="feynman-text" rows="4" placeholder="用你自己的话写下来，就像在教一个完全不懂的朋友……（至少 ' + f.minLen + ' 个字）"></textarea>' +
      '<div class="feynman-actions"><button class="btn primary" id="feynman-submit">🎤 讲给机器人听</button>' +
      '<span class="feynman-tip">提示：' + esc(f.tip) + '</span></div>' +
      '<div id="feynman-feedback"></div>';
    $('feynman-submit').addEventListener('click', function () {
      var text = $('feynman-text').value.trim();
      var fb = $('feynman-feedback');
      if (text.length < f.minLen) {
        fb.innerHTML = '<div class="fb-warn">再展开讲讲吧～至少写 ' + f.minLen + ' 个字。费曼说：讲不清楚的地方，就是还没学透的地方。</div>';
        return;
      }
      var lower = text.toLowerCase();
      var matched = [], missing = [];
      for (var i = 0; i < f.groups.length; i++) {
        var hit = false;
        for (var j = 0; j < f.groups[i].length; j++) {
          if (lower.indexOf(f.groups[i][j].toLowerCase()) >= 0) { hit = true; break; }
        }
        if (hit) matched.push(i); else missing.push(i);
      }
      if (matched.length >= f.need) {
        var first = Game.markFeynman(currentChapter.id);
        fb.innerHTML = '<div class="fb-good">🎉 讲得太棒了！你抓住了 ' + matched.length + '/' + f.groups.length + ' 个关键 ideas。' +
          (first ? '获得 <b>+15 XP</b>！' : '') + '能讲清楚，才是真的懂！</div>';
        Robot.say('哇，你讲得连我都听懂了！这就是费曼学习法的威力 🎉', 'celebrate', 4000);
        Robot.celebrate(false);
        renderTopbar();
        setTimeout(function () { renderChapter(); }, 1600);
      } else {
        var missWords = missing.map(function (mi) { return f.groups[mi][0]; });
        fb.innerHTML = '<div class="fb-warn">已经讲到 ' + matched.length + ' 个要点了，不错！再想想这几个方面：<b>' +
          missWords.map(esc).join('、') + '</b>。试着把它们也讲进去？（不用堆关键词，用自己的话说清楚就好）</div>';
        Robot.say('差一点点！想想我提示的几个方面，再讲一遍试试 💪', 'talk', 5000);
      }
    });
  }

  /* ---------------- 代码编辑器 ---------------- */
  function findTask(taskId) {
    for (var i = 0; i < CURRICULUM.length; i++) {
      var ch = CURRICULUM[i];
      for (var j = 0; j < ch.tasks.length; j++) if (ch.tasks[j].id === taskId) return { ch: ch, task: ch.tasks[j], isChallenge: false };
      if (ch.challenge.id === taskId) return { ch: ch, task: ch.challenge, isChallenge: true };
    }
    return null;
  }

  function openEditor(ch, task, isChallenge) {
    currentTask = { ch: ch, task: task, isChallenge: isChallenge };
    hintLevel = 0;
    var td = Game.taskData(ch.id, task.id, isChallenge);
    $('ed-title').textContent = (isChallenge ? '🎮 ' : '✏️ ') + task.title;
    $('ed-story').textContent = task.story;
    $('ed-goal').innerHTML = '<b>任务目标：</b>' + task.goal;
    var code = Game.state.codeStore[task.id] != null ? Game.state.codeStore[task.id] : task.starter;
    $('ed-code').value = code;
    $('ed-input').value = task.tests[0].input;
    $('ed-output').textContent = '点击「运行」看看代码会输出什么……';
    $('ed-output').className = 'console';
    $('ed-tests').innerHTML = '<div class="tests-note">共 ' + task.tests.length + ' 个测试点 · 点击「提交评测」自动验证（每个测试点会用各自的输入）</div>';
    $('ed-verdict').innerHTML = '';
    $('ed-hints').innerHTML = '';
    $('ed-hints').classList.add('hidden');
    $('ed-solution').classList.toggle('hidden', td.fails < 3 && !td.seenSolution);
    syncHighlight();
    $('editor-modal').classList.remove('hidden');
    document.body.classList.add('modal-open');
    setTimeout(function () { $('ed-code').focus(); }, 60);
  }

  function closeEditor() {
    $('editor-modal').classList.add('hidden');
    document.body.classList.remove('modal-open');
    currentTask = null;
    if (currentChapter) renderChapter();
    renderTopbar();
    renderHome();
  }

  function syncHighlight() {
    var code = $('ed-code');
    $('ed-hl').innerHTML = highlight(code.value);
    $('ed-hl').scrollTop = code.scrollTop;
    $('ed-hl').scrollLeft = code.scrollLeft;
  }

  function runCode() {
    if (!currentTask) return;
    Game.recordRun();
    var r = CppInterp.run($('ed-code').value, $('ed-input').value);
    var out = $('ed-output');
    if (r.ok) {
      out.textContent = r.output === '' ? '（运行成功，没有输出。检查一下是不是忘了 cout？）' : r.output;
      out.className = 'console';
      Robot.sfx('pop');
    } else {
      out.textContent = '⚠ 编译/运行错误：\n' + r.error;
      out.className = 'console err';
      Robot.sfx('fail');
      Robot.mood('sad', 2500);
    }
    renderTopbar();
  }

  function submitCode() {
    if (!currentTask) return;
    var ct = currentTask;
    var code = $('ed-code').value;
    var results = [];
    var allPass = true;
    Game.recordRun();
    for (var i = 0; i < ct.task.tests.length; i++) {
      var t = ct.task.tests[i];
      var r = CppInterp.run(code, t.input);
      var ok = r.ok && CppInterp.normalize(r.output) === CppInterp.normalize(t.expected);
      if (!ok) allPass = false;
      results.push({ ok: ok, input: t.input, expected: t.expected, got: r.ok ? r.output : null, error: r.ok ? null : r.error });
    }
    var html = '';
    for (var j = 0; j < results.length; j++) {
      var res = results[j];
      html += '<div class="test-item ' + (res.ok ? 'pass' : 'fail') + '">' +
        '<div class="test-head">' + (res.ok ? '✅' : '❌') + ' 测试点 ' + (j + 1) + '</div>' +
        '<div class="test-io"><span>输入</span><pre>' + esc(res.input === '' ? '（无）' : res.input) + '</pre></div>' +
        (res.ok ? '' :
          '<div class="test-io"><span>期望输出</span><pre>' + esc(res.expected === '' ? '（空行）' : res.expected) + '</pre></div>' +
          '<div class="test-io"><span>' + (res.error ? '错误信息' : '你的输出') + '</span><pre class="bad">' +
          esc(res.error ? res.error : (res.got === '' ? '（空）' : res.got)) + '</pre></div>') +
        '</div>';
    }
    $('ed-tests').innerHTML = html;

    if (allPass) {
      var r2 = Game.completeTask(ct.ch.id, ct.task, { isChallenge: ct.isChallenge });
      var v = $('ed-verdict');
      var msg = r2.firstPass
        ? '🎉 全部 ' + results.length + ' 个测试点通过！' + (r2.xp > 0 ? ' <b>+' + r2.xp + ' XP</b>' : '') +
          (r2.firstTry ? ' ⚡ 一次通过，太厉害了！' : '') + (r2.seenSolution ? '（看过参考答案，经验减半，下次独立完成更棒）' : '')
        : '✅ 回顾完成，全部测试点依然通过！';
      var nextBtn = '';
      if (ct.isChallenge) {
        var idx = CURRICULUM.indexOf(ct.ch);
        if (idx + 1 < CURRICULUM.length) nextBtn = '<button class="btn primary" id="v-next">🚀 前往第 ' + (idx + 2) + ' 章</button>';
        else nextBtn = '<button class="btn primary" id="v-graduate">🎓 领取毕业寄语</button>';
      } else {
        var ti = ct.ch.tasks.indexOf(ct.task);
        if (ti + 1 < ct.ch.tasks.length) nextBtn = '<button class="btn primary" id="v-next-task">下一题 →</button>';
        else if (Game.tasksAllPassed(ct.ch)) nextBtn = '<button class="btn primary" id="v-to-challenge">🎮 闯关已解锁！</button>';
      }
      v.innerHTML = '<div class="verdict good">' + msg + '</div>' +
        '<div class="verdict-actions"><button class="btn" id="v-back">返回章节</button>' + nextBtn + '</div>';
      $('v-back').addEventListener('click', closeEditor);
      if ($('v-next')) $('v-next').addEventListener('click', function () {
        var idx2 = CURRICULUM.indexOf(ct.ch);
        closeEditor();
        openChapter(idx2 + 1);
      });
      if ($('v-graduate')) $('v-graduate').addEventListener('click', function () { closeEditor(); showEpilogue(); });
      if ($('v-next-task')) $('v-next-task').addEventListener('click', function () {
        var ti2 = ct.ch.tasks.indexOf(ct.task);
        openEditor(ct.ch, ct.ch.tasks[ti2 + 1], false);
      });
      if ($('v-to-challenge')) $('v-to-challenge').addEventListener('click', function () {
        openEditor(ct.ch, ct.ch.challenge, true);
      });
      Robot.celebrate(ct.isChallenge);
      if (ct.isChallenge) {
        Robot.say('闯关成功！🎉 下一章的星门已经打开，飞船继续前进！', 'celebrate', 5000);
      } else {
        Robot.say(r2.firstTry ? '一次通过！你的逻辑越来越严密了 ⚡' : '通过啦！失败是成功之母，调试让你更强大 💪', 'happy', 4500);
      }
      if (Game.state.today.done >= 3 && goalCelebratedDate !== Game.todayStr()) {
        goalCelebratedDate = Game.todayStr();
        setTimeout(function () {
          Robot.say('🎯 今日目标达成：完成 3 个学习任务！明天继续保持哦～', 'celebrate', 6000);
          Robot.confetti(80);
        }, 1800);
      }
      if (r2.justGraduated) {
        setTimeout(function () { showEpilogue(); Robot.celebrate(true); }, 1500);
      }
      renderTopbar();
    } else {
      var fr = Game.recordFail(ct.ch.id, ct.task.id, ct.isChallenge);
      var passCount = results.filter(function (x) { return x.ok; }).length;
      $('ed-verdict').innerHTML = '<div class="verdict bad">通过 ' + passCount + '/' + results.length + ' 个测试点。别灰心，看看失败的测试点：输入是什么？期望什么？你的输出差在哪？</div>';
      Robot.sfx('fail');
      Robot.mood('sad', 2500);
      var td = Game.taskData(ct.ch.id, ct.task.id, ct.isChallenge);
      if (td.fails >= 3) {
        $('ed-solution').classList.remove('hidden');
        Robot.say('已经失败 ' + td.fails + ' 次了，要不要点「提示」或看看「参考答案」？看懂答案后，试着给我讲一遍思路，再自己写出来 📖', 'talk', 8000);
      } else if (fr.addedToBook) {
        Robot.say('这道题先记进错题本 📕 了。改天回来订正它，就能拿「错题克星」徽章！', 'talk', 6000);
      } else {
        Robot.say('差一点点！对照失败测试点的「期望输出」和「你的输出」，找找差别在哪里 🔍', 'talk', 6000);
      }
      renderTopbar();
    }
  }

  /* ---------------- 徽章 / 错题本 ---------------- */
  function showBadges() {
    var s = Game.state;
    var html = '';
    for (var i = 0; i < Game.BADGES.length; i++) {
      var b = Game.BADGES[i];
      var got = s.badges[b.id];
      html += '<div class="badge-cell' + (got ? ' got' : '') + '">' +
        '<div class="badge-icon">' + b.icon + '</div>' +
        '<div class="badge-name">' + esc(b.name) + '</div>' +
        '<div class="badge-desc">' + esc(b.desc) + '</div>' +
        (got ? '<div class="badge-date">' + new Date(got).toLocaleDateString('zh-CN') + '</div>' : '<div class="badge-date">未解锁</div>') +
        '</div>';
    }
    $('badge-grid').innerHTML = html;
    $('badges-modal').classList.remove('hidden');
    Robot.sfx('click');
  }

  function showWrongBook() {
    var s = Game.state;
    var list = $('wrong-list');
    if (!s.wrongBook.length) {
      list.innerHTML = '<div class="empty-note">🎉 错题本空空如也！保持住～</div>';
    } else {
      var html = '';
      for (var i = 0; i < s.wrongBook.length; i++) {
        var e = s.wrongBook[i];
        var ft = findTask(e.taskId);
        if (!ft) continue;
        html += '<div class="wrong-item"><div><b>' + esc(ft.task.title) + '</b>' +
          '<span class="wrong-ch">' + esc(ft.ch.emoji + ' ' + ft.ch.title) + '</span></div>' +
          '<button class="btn small primary" data-fix="' + e.taskId + '">去订正 →</button></div>';
      }
      list.innerHTML = html;
      var btns = list.querySelectorAll('[data-fix]');
      for (var j = 0; j < btns.length; j++) {
        btns[j].addEventListener('click', function () {
          var ft2 = findTask(this.getAttribute('data-fix'));
          $('wrong-modal').classList.add('hidden');
          openChapter(CURRICULUM.indexOf(ft2.ch));
          openEditor(ft2.ch, ft2.task, ft2.isChallenge);
        });
      }
    }
    $('wrong-modal').classList.remove('hidden');
    Robot.sfx('click');
  }

  /* ---------------- 回溯学习 ---------------- */
  function daysSince(ts) { return Math.floor((Date.now() - ts) / 86400000); }

  function reviewSuggestions() {
    var s = Game.state, out = [];
    for (var i = 0; i < CURRICULUM.length; i++) {
      var ch = CURRICULUM[i];
      var cd = s.chapters[ch.id];
      if (!cd) continue;
      if (cd.challenge && cd.challenge.passed && cd.clearedAt) {
        var d = daysSince(cd.clearedAt);
        var reviewed = cd.lastReviewAt ? daysSince(cd.lastReviewAt) : 999;
        if (d >= 3 && reviewed >= 3) {
          out.push({ kind: 'concept', ch: ch, label: ch.emoji + '《' + ch.title + '》通关已 ' + d + ' 天，按记忆曲线该回溯啦！' });
        }
      }
      for (var tid in cd.tasks) {
        var td = cd.tasks[tid];
        if (td.passed && td.seenSolution) {
          var ft = findTask(tid);
          if (ft) out.push({ kind: 'redo', ch: ch, task: ft.task, isChallenge: false, label: '✏️《' + ft.task.title + '》曾看参考答案，独立重写一遍才算真懂！' });
        }
      }
    }
    for (var w = 0; w < s.wrongBook.length; w++) {
      var fw = findTask(s.wrongBook[w].taskId);
      if (fw) out.push({ kind: 'wrong', ch: fw.ch, task: fw.task, isChallenge: fw.isChallenge, label: '📕 错题《' + fw.task.title + '》还在等你复仇！' });
    }
    return out.slice(0, 6);
  }

  function markReview(ch) {
    var cd = Game.chData(ch.id);
    cd.lastReviewAt = Date.now();
    Game.save();
  }

  function jumpReview(ch, mode, task, isChallenge) {
    markReview(ch);
    $('review-modal').classList.add('hidden');
    var idx = CURRICULUM.indexOf(ch);
    openChapter(idx);
    if (mode === 'concept') {
      setTimeout(function () { $('concept-list').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
      Robot.say('回溯模式 📖：重读概念卡，试试这次能不能不看书讲给我听？', 'talk', 6000);
    } else if (mode === 'task') {
      openEditor(ch, task || ch.tasks[0], !!isChallenge);
    } else if (mode === 'challenge') {
      openEditor(ch, ch.challenge, true);
    }
  }

  function showReview() {
    var s = Game.state;
    var sugs = reviewSuggestions();
    var html = '';
    if (sugs.length) {
      html += '<div class="rev-suggest-title">🤖 机器人的复习建议（艾宾浩斯记忆曲线：3 天 / 7 天回溯最有效）</div>';
      for (var i = 0; i < sugs.length; i++) {
        html += '<div class="rev-suggest"><span>' + esc(sugs[i].label) + '</span><button class="btn small primary" data-sug="' + i + '">去回溯 →</button></div>';
      }
    } else {
      html += '<div class="rev-suggest-title">🤖 暂无到期复习项——保持每天学习，记忆曲线会替你安排！</div>';
    }
    html += '<div class="rev-suggest-title" style="margin-top:16px">📚 全部章节回溯入口</div>';
    var any = false;
    for (var j = 0; j < CURRICULUM.length; j++) {
      var ch = CURRICULUM[j];
      var prog = Game.chapterProgress(ch);
      if (prog.done === 0) continue;
      any = true;
      var cd = s.chapters[ch.id];
      var cleared = cd.challenge && cd.challenge.passed;
      var when = cleared && cd.clearedAt ? '⭐ ' + daysSince(cd.clearedAt) + ' 天前通关' : '进行中 ' + prog.pct + '%';
      html += '<div class="review-row"><div class="rev-info"><b>' + ch.emoji + ' ' + esc(ch.title) + '</b>' +
        '<span class="rev-when">' + when + ' · ' + prog.done + '/' + prog.total + '</span></div>' +
        '<div class="rev-btns">' +
        '<button class="btn tiny" data-rev="concept" data-ch="' + ch.id + '">📖 概念</button>' +
        '<button class="btn tiny" data-rev="task" data-ch="' + ch.id + '">✏️ 重练</button>' +
        '<button class="btn tiny" data-rev="challenge" data-ch="' + ch.id + '">🎮 重闯</button>' +
        '</div></div>';
    }
    if (!any) html += '<div class="empty-note">还没有学习记录～先去第 1 章出发吧！</div>';
    $('review-body').innerHTML = html;
    $('review-modal').classList.remove('hidden');
    Robot.sfx('click');
    var sugBtns = $('review-body').querySelectorAll('[data-sug]');
    for (var k = 0; k < sugBtns.length; k++) {
      sugBtns[k].addEventListener('click', function () {
        var sg = reviewSuggestions()[parseInt(this.getAttribute('data-sug'), 10)];
        if (!sg) return;
        if (sg.kind === 'wrong') { $('review-modal').classList.add('hidden'); showWrongBook(); return; }
        jumpReview(sg.ch, sg.kind === 'redo' ? 'task' : 'concept', sg.task, sg.isChallenge);
      });
    }
    var revBtns = $('review-body').querySelectorAll('[data-rev]');
    for (var m = 0; m < revBtns.length; m++) {
      revBtns[m].addEventListener('click', function () {
        var chId = this.getAttribute('data-ch');
        var mode = this.getAttribute('data-rev');
        var ch = null;
        for (var q = 0; q < CURRICULUM.length; q++) if (CURRICULUM[q].id === chId) ch = CURRICULUM[q];
        jumpReview(ch, mode);
      });
    }
  }

  /* ---------------- GitHub 分享 ---------------- */
  function copyText(text, btn) {
    function done() {
      var old = btn.textContent;
      btn.textContent = '已复制 ✓';
      setTimeout(function () { btn.textContent = old; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }

  function showShare() {
    var cloneCmd = 'git clone ' + SHARE.repoUrl + '.git && cd ' + SHARE.repo + ' && node server.js';
    $('share-body').innerHTML =
      '<p class="share-intro">本网站已开源到 GitHub 🎉 朋友无需安装任何东西，点在线链接即可开始学习；也可以克隆仓库离线运行。每个人的进度保存在自己浏览器里，互不影响。</p>' +
      '<div class="share-row"><div class="share-label">🌐 在线版（GitHub Pages，直接玩）</div>' +
      '<div class="share-link">' + esc(SHARE.pages) + '</div>' +
      '<div class="share-actions"><button class="btn small primary" id="sh-copy-pages">复制链接</button>' +
      '<button class="btn small" id="sh-open-pages">打开</button></div></div>' +
      '<div class="share-row"><div class="share-label">📦 GitHub 仓库（源码 / 提 issue / 贡献课程）</div>' +
      '<div class="share-link">' + esc(SHARE.repoUrl) + '</div>' +
      '<div class="share-actions"><button class="btn small primary" id="sh-copy-repo">复制链接</button>' +
      '<button class="btn small" id="sh-open-repo">打开</button></div></div>' +
      '<div class="share-row"><div class="share-label">💻 本地运行命令（离线可用）</div>' +
      '<div class="share-link mono">' + esc(cloneCmd) + '</div>' +
      '<div class="share-actions"><button class="btn small primary" id="sh-copy-cmd">复制命令</button></div></div>';
    $('share-modal').classList.remove('hidden');
    Robot.sfx('click');
    $('sh-copy-pages').addEventListener('click', function () { copyText(SHARE.pages, this); });
    $('sh-copy-repo').addEventListener('click', function () { copyText(SHARE.repoUrl, this); });
    $('sh-copy-cmd').addEventListener('click', function () { copyText(cloneCmd, this); });
    $('sh-open-pages').addEventListener('click', function () { window.open(SHARE.pages, '_blank'); });
    $('sh-open-repo').addEventListener('click', function () { window.open(SHARE.repoUrl, '_blank'); });
  }

  function showEpilogue() {
    $('epilogue-body').innerHTML = EPILOGUE.html;
    $('epilogue-modal').classList.remove('hidden');
    Robot.confetti(120);
  }

  /* ---------------- 动画事件 ---------------- */
  function bindGameEvents() {
    Game.onXp = function (amount, reason) {
      renderTopbar();
      var bar = $('xpbar-anchor');
      var rect = bar.getBoundingClientRect();
      var fl = document.createElement('div');
      fl.className = 'xp-float';
      fl.textContent = '+' + amount + ' XP · ' + reason;
      fl.style.left = Math.max(8, rect.left) + 'px';
      fl.style.top = (rect.bottom + 6) + 'px';
      $('xp-floats').appendChild(fl);
      setTimeout(function () { fl.remove(); }, 1600);
    };
    Game.onLevelUp = function (after) {
      $('lv-num').textContent = 'Lv.' + after.level;
      $('lv-title').textContent = '获得称号：' + after.title;
      $('levelup-overlay').classList.remove('hidden');
      Robot.celebrate(true);
      setTimeout(function () { $('levelup-overlay').classList.add('hidden'); }, 3200);
    };
    Game.onBadge = function (b) {
      var t = document.createElement('div');
      t.className = 'badge-toast';
      t.innerHTML = '<div class="bt-icon">' + b.icon + '</div><div><div class="bt-label">徽章解锁！</div>' +
        '<div class="bt-name">' + esc(b.name) + '</div><div class="bt-desc">' + esc(b.desc) + '</div></div>';
      $('badge-toasts').appendChild(t);
      Robot.sfx('badge');
      setTimeout(function () {
        t.classList.add('out');
        setTimeout(function () { t.remove(); }, 500);
      }, 4200);
      renderTopbar();
    };
  }

  /* ---------------- 每日督学 ---------------- */
  function dailyGreeting() {
    var info = Game.touchDay();
    var s = Game.state;
    var name = s.name || '小宇航员';
    var msg;
    if (info.isNewDay) {
      msg = '早上好，' + esc(name) + '！🌅 今天是连续学习的第 <b>' + info.streak + '</b> 天 🔥';
      if (info.streak >= 7) msg += '，恒星级坚持，太了不起了！';
      else if (info.streak >= 3) msg += '，三日之约达成，继续加油！';
      if (info.comeback) msg = '欢迎回来，' + esc(name) + '！连续记录断开了没关系，今天重新开始计数 💪 学习永远不怕晚。';
      msg += '<br>今日小目标：完成 3 个学习任务（概念/讲解/练习都算）！';
    } else {
      msg = '欢迎回来，' + esc(name) + '！今天已完成 <b>' + s.today.done + '</b> 个任务，' +
        (s.today.done >= 3 ? '目标已达成，超额学习更棒 🌟' : '再完成 ' + (3 - s.today.done) + ' 个就达标啦 🎯');
    }
    if (s.wrongBook.length > 0) {
      msg += '<br>📕 错题本里还有 <b>' + s.wrongBook.length + '</b> 道题等你订正哦。';
    }
    var sugN = reviewSuggestions().length;
    if (sugN > 0) msg += '<br>🔁 有 <b>' + sugN + '</b> 项内容到了记忆曲线复习点，点顶栏 🔁 回溯学习。';
    renderTopbar();
    renderHome();
    setTimeout(function () { Robot.say(msg, 'happy', 9000); }, 700);
  }

  function resetIdle() {
    var now = Date.now();
    if (now - lastIdleReset < 8000) return;
    lastIdleReset = now;
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      if (!$('onboarding').classList.contains('hidden')) return;
      if (!$('editor-modal').classList.contains('hidden')) {
        Robot.say('卡住了吗？读一读报错信息，或者点「提示」～休息一下眼睛也很重要 👀', 'talk', 7000);
      } else {
        Robot.say(RandomIdleMsg(), 'talk', 7000);
      }
    }, 150000);
  }
  function RandomIdleMsg() {
    var s = Game.state;
    if (s.today.done === 0) return '今天还没开始学习哦～点开一章，只要 5 分钟就能完成一个小任务 🚀';
    if (s.wrongBook.length > 0) return '错题本里有 ' + s.wrongBook.length + ' 道题在等你复仇！订正它们印象最深 📕';
    return Robot.RandomTip();
  }

  /* ---------------- 新手引导 ---------------- */
  function showOnboarding() {
    var ob = $('onboarding');
    ob.classList.remove('hidden');
    var html = '';
    for (var i = 0; i < Robot.DEFS.length; i++) {
      var d = Robot.DEFS[i];
      html += '<div class="robot-choice" data-robot="' + d.id + '" style="--rc:' + d.color + '">' +
        '<div class="rc-svg">' + d.svg + '</div>' +
        '<div class="rc-name">' + d.name + '</div>' +
        '<div class="rc-trait">' + d.trait + '</div>' +
        '</div>';
    }
    $('robot-choices').innerHTML = html;
    var chosen = null;
    var cards = $('robot-choices').querySelectorAll('.robot-choice');
    for (var j = 0; j < cards.length; j++) {
      cards[j].addEventListener('click', function () {
        for (var k = 0; k < cards.length; k++) cards[k].classList.remove('selected');
        this.classList.add('selected');
        chosen = this.getAttribute('data-robot');
        $('ob-start').disabled = false;
        Robot.sfx('pop');
      });
    }
    $('ob-start').addEventListener('click', function () {
      if (!chosen) return;
      var name = $('ob-name').value.trim() || '小宇航员';
      Game.state.name = name;
      Game.state.robot = chosen;
      Game.save();
      ob.classList.add('hidden');
      enterApp();
      Robot.confetti(100);
      var def = null;
      for (var q = 0; q < Robot.DEFS.length; q++) if (Robot.DEFS[q].id === chosen) def = Robot.DEFS[q];
      setTimeout(function () {
        Robot.say('你好，' + esc(name) + '！我是你的伴学机器人<b>' + def.name + '</b> 🤖<br>我们的学习路线：① 学概念 → ② 当小老师讲给我听 → ③ 动手练习 → ④ 章末闯关。<br>准备好了吗？点开第一章，出发！🚀', 'celebrate', 12000);
      }, 500);
    });
  }

  /* ---------------- 启动 ---------------- */
  function enterApp() {
    Robot.init();
    bindGameEvents();
    renderTopbar();
    renderHome();
    dailyGreeting();
    resetIdle();
  }

  function boot() {
    Game.load();

    /* 顶栏按钮 */
    $('btn-home').addEventListener('click', function () { Robot.sfx('click'); goHome(); });
    $('btn-badges').addEventListener('click', showBadges);
    $('btn-review').addEventListener('click', showReview);
    $('btn-share').addEventListener('click', showShare);
    $('btn-review-home').addEventListener('click', showReview);
    $('btn-ch-review').addEventListener('click', showReview);
    $('btn-wrong').addEventListener('click', showWrongBook);
    $('btn-sound').addEventListener('click', function () {
      Game.state.settings.sound = !Game.state.settings.sound;
      Game.save();
      renderTopbar();
      if (Game.state.settings.sound) Robot.sfx('pop');
    });
    $('btn-continue').addEventListener('click', function () {
      var idx = findContinueIndex();
      Robot.sfx('click');
      if (idx < 0) showEpilogue();
      else openChapter(idx);
    });
    $('btn-back').addEventListener('click', function () { Robot.sfx('click'); goHome(); });
    $('epilogue-card').addEventListener('click', function () {
      if (Game.state.graduated) showEpilogue();
      else Robot.say('完成全部 14 章闯关，就能开启毕业寄语啦 🎓', 'talk', 5000);
    });
    $('btn-reset').addEventListener('click', function () {
      $('confirm-modal').classList.remove('hidden');
    });
    $('confirm-no').addEventListener('click', function () { $('confirm-modal').classList.add('hidden'); });
    $('confirm-yes').addEventListener('click', function () {
      Game.reset();
      location.reload();
    });

    /* 通用关闭 */
    var closers = document.querySelectorAll('[data-close]');
    for (var i = 0; i < closers.length; i++) {
      closers[i].addEventListener('click', function () {
        this.closest('.modal').classList.add('hidden');
      });
    }
    $('levelup-overlay').addEventListener('click', function () { this.classList.add('hidden'); });

    /* 编辑器 */
    $('ed-close').addEventListener('click', closeEditor);
    $('ed-run').addEventListener('click', runCode);
    $('ed-submit').addEventListener('click', submitCode);
    $('ed-reset').addEventListener('click', function () {
      if (!currentTask) return;
      $('ed-code').value = currentTask.task.starter;
      Game.state.codeStore[currentTask.task.id] = currentTask.task.starter;
      Game.save();
      syncHighlight();
      Robot.sfx('click');
    });
    $('ed-hint').addEventListener('click', function () {
      if (!currentTask) return;
      var hints = currentTask.task.hints;
      if (hintLevel >= hints.length) {
        Robot.say('提示都看完啦！实在不行可以看看参考答案，然后讲给我听 📖', 'talk', 5000);
        return;
      }
      var box = $('ed-hints');
      box.classList.remove('hidden');
      box.innerHTML += '<div class="hint-item">💡 提示 ' + (hintLevel + 1) + '：' + esc(hints[hintLevel]) + '</div>';
      hintLevel++;
      Robot.sfx('pop');
    });
    $('ed-solution').addEventListener('click', function () {
      if (!currentTask) return;
      Game.markSeenSolution(currentTask.ch.id, currentTask.task.id, currentTask.isChallenge);
      var box = $('ed-hints');
      box.classList.remove('hidden');
      box.innerHTML += '<div class="hint-item solution"><b>📖 参考答案</b>（看懂后请用自己的话讲一遍思路，再独立写出来。本题经验将减半）<pre>' +
        esc(currentTask.task.solution) + '</pre></div>';
      Robot.say('答案在这里～费曼式做法：先读懂，再合上答案自己写，最后讲给我听为什么这样写 🧑‍🏫', 'talk', 8000);
      renderTopbar();
    });
    var codeEl = $('ed-code');
    codeEl.addEventListener('input', function () {
      syncHighlight();
      if (currentTask) {
        var tid = currentTask.task.id;
        var val = codeEl.value;
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(function () {
          Game.state.codeStore[tid] = val;
          Game.save();
        }, 400);
      }
    });
    codeEl.addEventListener('scroll', function () {
      $('ed-hl').scrollTop = codeEl.scrollTop;
      $('ed-hl').scrollLeft = codeEl.scrollLeft;
    });
    codeEl.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var s = this.selectionStart, en = this.selectionEnd;
        this.value = this.value.slice(0, s) + '  ' + this.value.slice(en);
        this.selectionStart = this.selectionEnd = s + 2;
        syncHighlight();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runCode();
      } else if (e.key === 'Enter') {
        /* 自动缩进 */
        var pos = this.selectionStart;
        var before = this.value.slice(0, pos);
        var lineStart = before.lastIndexOf('\n') + 1;
        var line = before.slice(lineStart);
        var indentMatch = /^[ \t]*/.exec(line);
        var indent = indentMatch ? indentMatch[0] : '';
        if (/\{\s*$/.test(line)) indent += '  ';
        e.preventDefault();
        var after = this.value.slice(this.selectionEnd);
        this.value = before + '\n' + indent + after;
        this.selectionStart = this.selectionEnd = pos + 1 + indent.length;
        syncHighlight();
      }
    });

    /* 空闲提醒 */
    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('keydown', resetIdle);
    document.addEventListener('click', resetIdle);

    if (!Game.state.name || !Game.state.robot) showOnboarding();
    else enterApp();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
