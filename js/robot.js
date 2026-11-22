/* ============================================================
 * 伴学 AI 小机器人：4 款可选伙伴
 * 说话气泡 / 心情动画 / 庆祝彩带 / 轻量音效（WebAudio）
 * ============================================================ */
(function (global) {
  'use strict';

  var DEFS = [
    {
      id: 'bitcat', name: '比特猫', trait: '好奇宝宝 · 爱问"为什么"', color: '#22d3ee',
      svg: '<svg viewBox="0 0 120 120" class="robot-svg">' +
        '<line x1="60" y1="18" x2="60" y2="34" stroke="#22d3ee" stroke-width="3"/>' +
        '<circle cx="60" cy="14" r="6" fill="#fde047" class="antenna-ball"/>' +
        '<path d="M30 44 L26 20 L46 34 Z" fill="#22d3ee"/>' +
        '<path d="M90 44 L94 20 L74 34 Z" fill="#22d3ee"/>' +
        '<path d="M32 42 L30 28 L42 36 Z" fill="#f9a8d4"/>' +
        '<path d="M88 42 L90 28 L78 36 Z" fill="#f9a8d4"/>' +
        '<rect x="26" y="34" width="68" height="58" rx="26" fill="#22d3ee"/>' +
        '<rect x="34" y="46" width="52" height="30" rx="15" fill="#0f172a"/>' +
        '<g class="eyes"><circle cx="48" cy="60" r="6" fill="#7dd3fc"/><circle cx="72" cy="60" r="6" fill="#7dd3fc"/>' +
        '<circle cx="50" cy="58" r="2" fill="#fff"/><circle cx="74" cy="58" r="2" fill="#fff"/></g>' +
        '<path class="mouth" d="M54 68 Q60 73 66 68" stroke="#7dd3fc" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<circle cx="33" cy="66" r="4" fill="#f9a8d4" opacity="0.7"/><circle cx="87" cy="66" r="4" fill="#f9a8d4" opacity="0.7"/>' +
        '<rect x="42" y="92" width="12" height="10" rx="5" fill="#0ea5e9"/>' +
        '<rect x="66" y="92" width="12" height="10" rx="5" fill="#0ea5e9"/>' +
        '<path d="M94 80 Q110 74 106 58" stroke="#22d3ee" stroke-width="6" fill="none" stroke-linecap="round" class="tail"/>' +
        '</svg>'
    },
    {
      id: 'voltdragon', name: '电路龙', trait: '热血队长 · 最爱喊"冲呀"', color: '#4ade80',
      svg: '<svg viewBox="0 0 120 120" class="robot-svg">' +
        '<path d="M38 30 L30 12 L48 26 Z" fill="#fbbf24"/>' +
        '<path d="M82 30 L90 12 L72 26 Z" fill="#fbbf24"/>' +
        '<path d="M22 56 Q6 44 14 30 Q22 40 30 44 Z" fill="#86efac" class="wing-l"/>' +
        '<path d="M98 56 Q114 44 106 30 Q98 40 90 44 Z" fill="#86efac" class="wing-r"/>' +
        '<rect x="28" y="28" width="64" height="62" rx="24" fill="#4ade80"/>' +
        '<rect x="36" y="42" width="48" height="28" rx="14" fill="#0f172a"/>' +
        '<g class="eyes"><circle cx="50" cy="55" r="6" fill="#bbf7d0"/><circle cx="70" cy="55" r="6" fill="#bbf7d0"/>' +
        '<circle cx="52" cy="53" r="2" fill="#fff"/><circle cx="72" cy="53" r="2" fill="#fff"/></g>' +
        '<path class="mouth" d="M52 63 Q60 69 68 63" stroke="#bbf7d0" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<ellipse cx="60" cy="80" rx="16" ry="8" fill="#86efac"/>' +
        '<circle cx="55" cy="80" r="2" fill="#166534"/><circle cx="65" cy="80" r="2" fill="#166534"/>' +
        '<rect x="42" y="90" width="12" height="12" rx="5" fill="#22c55e"/>' +
        '<rect x="66" y="90" width="12" height="12" rx="5" fill="#22c55e"/>' +
        '<path d="M92 84 Q108 88 104 72" stroke="#4ade80" stroke-width="6" fill="none" stroke-linecap="round" class="tail"/>' +
        '</svg>'
    },
    {
      id: 'pixelrabbit', name: '像素兔', trait: '温柔学霸 · 讲解超耐心', color: '#f472b6',
      svg: '<svg viewBox="0 0 120 120" class="robot-svg">' +
        '<rect x="38" y="4" width="14" height="36" rx="7" fill="#f472b6" class="ear-l"/>' +
        '<rect x="68" y="4" width="14" height="36" rx="7" fill="#f472b6" class="ear-r"/>' +
        '<rect x="42" y="10" width="6" height="24" rx="3" fill="#fbcfe8"/>' +
        '<rect x="72" y="10" width="6" height="24" rx="3" fill="#fbcfe8"/>' +
        '<rect x="28" y="34" width="64" height="56" rx="26" fill="#f472b6"/>' +
        '<rect x="36" y="46" width="48" height="28" rx="14" fill="#0f172a"/>' +
        '<g class="eyes"><circle cx="50" cy="59" r="6" fill="#f9a8d4"/><circle cx="70" cy="59" r="6" fill="#f9a8d4"/>' +
        '<circle cx="52" cy="57" r="2" fill="#fff"/><circle cx="72" cy="57" r="2" fill="#fff"/></g>' +
        '<path class="mouth" d="M54 67 Q60 72 66 67" stroke="#f9a8d4" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<circle cx="34" cy="66" r="4" fill="#fda4af" opacity="0.8"/><circle cx="86" cy="66" r="4" fill="#fda4af" opacity="0.8"/>' +
        '<path d="M56 78 L60 82 L64 78" stroke="#be185d" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<rect x="42" y="90" width="12" height="11" rx="5" fill="#ec4899"/>' +
        '<rect x="66" y="90" width="12" height="11" rx="5" fill="#ec4899"/>' +
        '<circle cx="94" cy="82" r="7" fill="#fbcfe8" class="tail"/>' +
        '</svg>'
    },
    {
      id: 'gearbear', name: '齿轮熊', trait: '沉稳工程师 · 调试找它准没错', color: '#fb923c',
      svg: '<svg viewBox="0 0 120 120" class="robot-svg">' +
        '<circle cx="34" cy="28" r="12" fill="#fb923c"/><circle cx="86" cy="28" r="12" fill="#fb923c"/>' +
        '<circle cx="34" cy="28" r="6" fill="#fed7aa"/><circle cx="86" cy="28" r="6" fill="#fed7aa"/>' +
        '<rect x="26" y="30" width="68" height="60" rx="26" fill="#fb923c"/>' +
        '<rect x="34" y="42" width="52" height="28" rx="14" fill="#0f172a"/>' +
        '<g class="eyes"><circle cx="48" cy="55" r="6" fill="#fdba74"/><circle cx="72" cy="55" r="6" fill="#fdba74"/>' +
        '<circle cx="50" cy="53" r="2" fill="#fff"/><circle cx="74" cy="53" r="2" fill="#fff"/></g>' +
        '<path class="mouth" d="M54 63 Q60 68 66 63" stroke="#fdba74" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<g class="gear"><circle cx="60" cy="80" r="9" fill="#fbbf24"/>' +
        '<rect x="58" y="68" width="4" height="24" fill="#fbbf24"/><rect x="48" y="78" width="24" height="4" fill="#fbbf24"/>' +
        '<circle cx="60" cy="80" r="4" fill="#92400e"/></g>' +
        '<rect x="40" y="90" width="13" height="12" rx="5" fill="#f97316"/>' +
        '<rect x="67" y="90" width="13" height="12" rx="5" fill="#f97316"/>' +
        '</svg>'
    }
  ];

  var bubbleTimer = null;
  var moodTimer = null;
  var audioCtx = null;

  function el(id) { return document.getElementById(id); }

  function sfx(kind) {
    try {
      if (!Game.state.settings.sound) return;
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var seqs = {
        click: [[660, 0.05, 0]],
        win: [[523, 0.09, 0], [659, 0.09, 0.09], [784, 0.09, 0.18], [1047, 0.16, 0.27]],
        level: [[523, 0.1, 0], [659, 0.1, 0.1], [784, 0.1, 0.2], [1047, 0.1, 0.3], [1319, 0.25, 0.4]],
        badge: [[880, 0.08, 0], [1175, 0.18, 0.08]],
        fail: [[233, 0.12, 0], [196, 0.16, 0.1]],
        pop: [[440, 0.04, 0], [880, 0.06, 0.04]]
      };
      var seq = seqs[kind] || seqs.click;
      for (var i = 0; i < seq.length; i++) {
        var f = seq[i][0], dur = seq[i][1], at = seq[i][2];
        var o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = kind === 'fail' ? 'triangle' : 'sine';
        o.frequency.value = f;
        var t0 = audioCtx.currentTime + at;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t0); o.stop(t0 + dur + 0.05);
      }
    } catch (e) {}
  }

  function confetti(count) {
    var cv = document.createElement('canvas');
    cv.className = 'confetti-canvas';
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    document.body.appendChild(cv);
    var ctx = cv.getContext('2d');
    var colors = ['#22d3ee', '#f472b6', '#fde047', '#4ade80', '#fb923c', '#a78bfa', '#f87171'];
    var ps = [];
    var n = count || 150;
    for (var i = 0; i < n; i++) {
      ps.push({
        x: Math.random() * cv.width,
        y: -20 - Math.random() * cv.height * 0.4,
        w: 6 + Math.random() * 7,
        h: 8 + Math.random() * 8,
        vx: -1.5 + Math.random() * 3,
        vy: 2 + Math.random() * 3.5,
        rot: Math.random() * Math.PI,
        vr: -0.15 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        sway: Math.random() * Math.PI * 2
      });
    }
    var start = performance.now();
    function frame(now) {
      var t = now - start;
      ctx.clearRect(0, 0, cv.width, cv.height);
      var alive = false;
      for (var j = 0; j < ps.length; j++) {
        var p = ps[j];
        p.sway += 0.06;
        p.x += p.vx + Math.sin(p.sway) * 1.2;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y < cv.height + 30) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - t / 3200);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive && t < 3400) requestAnimationFrame(frame);
      else cv.remove();
    }
    requestAnimationFrame(frame);
  }

  var Robot = {
    DEFS: DEFS,
    sfx: sfx,
    confetti: confetti,

    init: function () {
      var dock = el('robot-dock');
      if (!dock) return;
      dock.innerHTML =
        '<div id="robot-bubble" class="robot-bubble hidden"><div id="robot-bubble-text"></div></div>' +
        '<div id="robot-body" class="robot-body mood-idle" title="点我聊聊">' +
        '<div id="robot-svg-holder"></div>' +
        '<div class="robot-shadow"></div>' +
        '</div>';
      el('robot-body').addEventListener('click', function () {
        Robot.say(RandomTip(), 'happy', 6000);
        sfx('pop');
      });
      this.set(Game.state.robot || 'bitcat');
    },

    set: function (id) {
      var def = null;
      for (var i = 0; i < DEFS.length; i++) if (DEFS[i].id === id) def = DEFS[i];
      if (!def) def = DEFS[0];
      var holder = el('robot-svg-holder');
      if (holder) holder.innerHTML = def.svg;
      var body = el('robot-body');
      if (body) body.style.setProperty('--robot-color', def.color);
      this.def = def;
    },

    mood: function (m, ms) {
      var body = el('robot-body');
      if (!body) return;
      body.className = 'robot-body mood-' + m;
      if (moodTimer) clearTimeout(moodTimer);
      if (ms) {
        moodTimer = setTimeout(function () { body.className = 'robot-body mood-idle'; }, ms);
      }
    },

    say: function (text, mood, ms) {
      var bubble = el('robot-bubble'), txt = el('robot-bubble-text');
      if (!bubble) return;
      txt.innerHTML = text;
      bubble.classList.remove('hidden');
      bubble.classList.remove('bubble-pop');
      void bubble.offsetWidth;
      bubble.classList.add('bubble-pop');
      this.mood(mood || 'talk', ms || 6000);
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(function () {
        bubble.classList.add('hidden');
        Robot.mood('idle');
      }, ms || 6000);
    },

    hideBubble: function () {
      var bubble = el('robot-bubble');
      if (bubble) bubble.classList.add('hidden');
    },

    celebrate: function (big) {
      this.mood('celebrate', big ? 3000 : 1800);
      sfx(big ? 'level' : 'win');
      if (big) confetti(180);
      else confetti(60);
    }
  };

  var TIPS = [
    '费曼秘诀：能把一个概念讲给完全不懂的人听，才算真正学会！',
    '写代码前先想清楚步骤，用注释写下来，再翻译成代码。',
    '报错不可怕，它是电脑在给你写信。读懂第几行、什么问题，就成功一半了。',
    '卡住超过 10 分钟？起来走走，回来常常一眼看出问题。',
    '每天进步一点点：今天弄懂一个小概念，就是胜利。',
    '试试把代码里的数字改一改，运行看看会发生什么——探索是最好的老师。',
    '变量名起得好，代码像文章；名字起得糟，三天后自己也看不懂。',
    '循环三问：从哪开始？什么时候停？每步怎么变？',
    '调试神器：在关键位置 cout 一下变量的值，看看它是不是你想的样子。',
    '学完一章，试着不看书把章末闯关再讲一遍思路给我听！'
  ];
  function RandomTip() {
    return TIPS[Math.floor(Math.random() * TIPS.length)];
  }
  Robot.RandomTip = RandomTip;

  global.Robot = Robot;
})(typeof window !== 'undefined' ? window : globalThis);
