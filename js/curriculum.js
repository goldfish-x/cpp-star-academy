/* ============================================================
 * C++ 星际编程学院 · 课程数据
 * 每章: concepts(概念卡) → feynman(当小老师) → tasks(练习×3)
 *       → challenge(章末趣味闯关)
 * ============================================================ */
var CURRICULUM = [];

/* ---------- 第 1 章 ---------- */
CURRICULUM.push({
  id: 'c1', emoji: '🚀', title: '你好，C++！', subtitle: '发出你的第一条星际电报',
  intro: '欢迎登上「C++ 星际学院」飞船！在这里，每一行代码都是发给宇宙的电报。本章你将学会程序的基本骨架，并亲手发出第一条电报。',
  concepts: [
    { id: 'c1k1', title: '程序是什么？', html: '<p>程序就像一份<strong>写给电脑的菜谱</strong>：一步一步告诉电脑做什么。电脑非常听话，但也非常"笨"——它只会严格按照你写的步骤执行，一步都不会猜。</p><p>C++ 程序的骨架长这样：<code>#include</code> 引入工具箱，<code>int main() { ... }</code> 是程序的<strong>入口</strong>——电脑永远从 main 的第一行开始执行，大括号 <code>{ }</code> 包住所有步骤。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "你好，宇宙！" << endl;\n    return 0;\n}',
      points: ['电脑按顺序、逐行执行指令', 'main 函数是程序的入口', '大括号 { } 把步骤打包在一起', 'return 0 表示"程序顺利结束"'] },
    { id: 'c1k2', title: 'cout：向屏幕喊话', html: '<p><code>cout</code>（读作 see-out）是 C++ 的"喇叭"。把想说的话用<strong>双引号</strong>包起来，通过 <code>&lt;&lt;</code> 递给 cout，它就会显示在屏幕上。</p><p><code>endl</code> 表示 end line——换到新的一行。可以连续喊话：<code>cout &lt;&lt; "A" &lt;&lt; "B";</code> 会输出 AB。</p><p>注意：每条语句结束都要写<strong>分号 ;</strong>，就像句子的句号。漏掉分号是新手最常见的错误！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "第一行电报" << endl;\n    cout << "第二行" << "接着同一行" << endl;\n    return 0;\n}',
      points: ['文字要用双引号 " " 包起来', '<< 把内容递给 cout 输出', 'endl 换行，可以连续 <<', '每条语句末尾写分号 ;'] },
    { id: 'c1k3', title: '注释：写给自己看的笔记', html: '<p>以 <code>//</code> 开头的内容是<strong>注释</strong>，电脑会完全忽略它。注释是写给人类看的笔记——解释代码在做什么。</p><p>优秀的程序员都爱写注释。费曼学习法的第一步就是"用自己的话讲清楚"，注释正是你练习讲解的好地方！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // 这是一条注释，电脑不会执行它\n    cout << "代码会被执行" << endl; // 行尾也可以写注释\n    return 0;\n}',
      points: ['// 之后的内容电脑会忽略', '注释帮助自己和别人理解代码', '多行注释用 /* ... */ 包住'] }
  ],
  feynman: { id: 'c1f', prompt: '假设你的好朋友完全没学过编程。请用你自己的话向 TA 解释：一个 C++ 程序的基本结构是什么样的？cout 是干什么的？（提示：可以讲讲 main、大括号、分号、endl 各起什么作用）',
    groups: [['main', '入口', '主函数', '开始的地方'], ['cout', '输出', '打印', '显示', '屏幕'], ['分号', ';', '句号'], ['endl', '换行', '新的一行', '下一行']],
    need: 3, minLen: 15, tip: '试着把程序想象成一份菜谱或一封信，每个符号都有它的角色。' },
  tasks: [
    { id: 'c1t1', title: '第一条电报', story: '飞船通讯器已就绪，向全宇宙发出标准问候语！',
      goal: '输出一行文字：<code>Hello, C++!</code>（注意大小写、逗号和感叹号都要一模一样）',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在下面的引号里写出问候语\n    cout << "" << endl;\n    return 0;\n}',
      tests: [{ input: '', expected: 'Hello, C++!' }],
      hints: ['把 Hello, C++! 写在双引号里面', 'cout << "Hello, C++!" << endl;', '完整写法：cout << "Hello, C++!" << endl; 别忘了分号'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c1t2', title: '宇航员报到', story: '地面指挥中心需要确认你的身份和状态，分两行汇报。',
      goal: '输出两行：第一行 <code>我是编程小宇航员</code>，第二行 <code>准备出发！</code>',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "我是编程小宇航员" << endl;\n    // 再写一条 cout，输出第二行\n    return 0;\n}',
      tests: [{ input: '', expected: '我是编程小宇航员\n准备出发！' }],
      hints: ['一条 cout 输出一行，两条 cout 输出两行', 'endl 会让输出换到新的一行', '第二条：cout << "准备出发！" << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "我是编程小宇航员" << endl;\n    cout << "准备出发！" << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c1t3', title: '飞船徽章', story: '用字符画一枚小小的火箭徽章，打印在飞船外壳上。',
      goal: '输出 4 行图案（注意空格也要一致）：<pre>  ^\n |=|\n |=|\n |_|</pre>并给每行写一条注释说明画的是火箭的哪个部分。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "  ^" << endl;   // 火箭头\n    // 补全剩下的三行\n    return 0;\n}',
      tests: [{ input: '', expected: '  ^\n |=|\n |=|\n |_|' }],
      hints: ['每行图案用一条 cout 输出', '引号里的空格也是图案的一部分，要数清楚', '第二、三行都是 cout << " |=|" << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "  ^" << endl;   // 火箭头\n    cout << " |=|" << endl;  // 船身\n    cout << " |=|" << endl;  // 船身\n    cout << " |_|" << endl;  // 尾翼\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c1c', title: '🎮 闯关：火箭发射倒计时', story: '发射塔已就位！请你编写倒计时程序，从 5 数到 1，最后喊出"发射！"。每个数字占一行。你现在只会 cout——没关系，6 条 cout 就能完成任务！',
    goal: '输出 6 行：<pre>5\n4\n3\n2\n1\n发射！</pre>',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // 用 6 条 cout 完成倒计时（以后学会循环后会更简单！）\n    return 0;\n}',
    tests: [{ input: '', expected: '5\n4\n3\n2\n1\n发射！' }],
    hints: ['每个数字单独一行，可以用 cout << 5 << endl;（数字不用引号）', '最后一行是文字"发射！"，要加双引号', '一共 6 条 cout 语句，按顺序写下来'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << 5 << endl;\n    cout << 4 << endl;\n    cout << 3 << endl;\n    cout << 2 << endl;\n    cout << 1 << endl;\n    cout << "发射！" << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 2 章 ---------- */
CURRICULUM.push({
  id: 'c2', emoji: '📦', title: '变量宝盒', subtitle: '给数据安一个家',
  intro: '飞船上有无数宝盒，每个盒子贴着标签、装着一种数据。这一章你将学会打造自己的宝盒——变量，让程序拥有"记忆"。',
  concepts: [
    { id: 'c2k1', title: '变量：贴标签的宝盒', html: '<p><strong>变量</strong>就是一个有名字的盒子，用来存放数据。定义变量时要说明<strong>类型</strong>（盒子装什么）和<strong>名字</strong>（标签）：</p><p><code>int age = 10;</code> 意思是：造一个叫 age 的整数盒子，放入 10。</p><p>常用类型：<code>int</code> 整数、<code>double</code> 小数、<code>char</code> 单个字符（单引号）、<code>string</code> 字符串（双引号）、<code>bool</code> 真/假（true/false）。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 10;          // 整数\n    double height = 1.45;  // 小数\n    char grade = \'A\';      // 单个字符，用单引号\n    string name = "小星";  // 字符串，用双引号\n    bool ready = true;     // 真或假\n    cout << name << " " << age << "岁" << endl;\n    cout << height << "米 " << grade << " " << ready << endl;\n    return 0;\n}',
      points: ['类型决定盒子能装什么数据', 'int 整数 / double 小数 / char 字符 / string 文字 / bool 真假', 'char 用单引号，string 用双引号', 'bool 输出时 true 显示 1，false 显示 0'] },
    { id: 'c2k2', title: '赋值：换掉盒子里的东西', html: '<p>盒子里的内容可以随时更换：<code>age = age + 1;</code> 先算出右边（旧值加 1），再放回盒子。这叫<strong>赋值</strong>，<code>=</code> 不是"等于"，而是"把右边放进左边"！</p><p>给盒子起名有规矩：只能用字母、数字、下划线，不能以数字开头，不能用 int 这类关键字。好名字让人一眼看懂，如 <code>fuel</code>（燃料）比 <code>x1</code> 好得多。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int fuel = 100;\n    cout << "出发前燃料：" << fuel << endl;\n    fuel = fuel - 30;   // 消耗 30\n    cout << "飞行后燃料：" << fuel << endl;\n    fuel = 100;         // 直接换新值\n    cout << "补给后燃料：" << fuel << endl;\n    return 0;\n}',
      points: ['= 是"把右边放进左边"，不是数学的等于', 'age = age + 1 让盒子增加 1', '变量名：字母/数字/下划线，不能数字开头', '起有意义的名字，代码更好懂'] },
    { id: 'c2k3', title: '字符串拼接与交换魔法', html: '<p>字符串可以用 <code>+</code> 拼接：<code>"你好, " + name</code> 得到一句完整的话。</p><p>经典谜题：交换两个盒子的内容，直接 <code>a = b; b = a;</code> 行不行？不行——第一步后 a 的旧值就丢了！要借助<strong>第三个临时盒子</strong>。这是编程里非常重要的"临时变量"思想。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string name = "小星";\n    cout << "欢迎来到" + name + "的飞船！" << endl;\n\n    int a = 3, b = 5;\n    int temp = a;  // 先把 a 的旧值存进临时盒子\n    a = b;\n    b = temp;\n    cout << a << " " << b << endl;  // 5 3\n    return 0;\n}',
      points: ['string 可以用 + 拼接', 'int a = 3, b = 5; 一行定义多个变量', '交换两个变量需要第三个临时变量', '直接 a=b; b=a; 会丢失数据'] }
  ],
  feynman: { id: 'c2f', prompt: '用你自己的话向朋友解释：什么是变量？为什么变量要有"类型"？赋值符号 = 和数学里的等号有什么不同？可以举一个盒子的例子。',
    groups: [['变量', '盒子', '存储', '存放', '记忆'], ['类型', 'int', '整数', 'double', '小数', '种类'], ['赋值', '放进', '存入', '更换', '右边'], ['名字', '命名', '标签', '标识符']],
    need: 3, minLen: 20, tip: '想想"贴标签的盒子"：标签是名字，盒子形状是类型，里面的东西是值。' },
  tasks: [
    { id: 'c2t1', title: '宇航员名片', story: '制作一张电子名片：年龄要自动加 1（因为过了一个生日！）。',
      goal: '定义 <code>int age = 10;</code> 让 age 增加 1 后输出；再定义 <code>string name = "小星";</code> 和 <code>double height = 1.45;</code> 各输出一行。共 3 行：<pre>11\n小星\n1.45</pre>',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 10;\n    // 让 age 增加 1\n    cout << age << endl;\n    // 定义 name 和 height 并输出\n    return 0;\n}',
      tests: [{ input: '', expected: '11\n小星\n1.45' }],
      hints: ['age = age + 1; 会让 age 变成 11', 'string name = "小星"; 文字要加双引号', 'double height = 1.45; 然后 cout << height << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 10;\n    age = age + 1;\n    cout << age << endl;\n    string name = "小星";\n    cout << name << endl;\n    double height = 1.45;\n    cout << height << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c2t2', title: '交换能量块', story: '两块能量块放反了位置，用临时宝盒把它们交换过来。',
      goal: '已有 <code>a = 3, b = 5</code>，借助临时变量交换它们，输出一行：<code>5 3</code>（中间一个空格）。不许直接输出写死的数字！',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 3, b = 5;\n    // 用第三个变量 temp 完成交换\n    cout << a << " " << b << endl;\n    return 0;\n}',
      tests: [{ input: '', expected: '5 3' }],
      hints: ['先把 a 的旧值存进 temp', '三步：temp = a; a = b; b = temp;', '如果直接 a = b; b = a; 两个都会变成 5'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 3, b = 5;\n    int temp = a;\n    a = b;\n    b = temp;\n    cout << a << " " << b << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c2t3', title: '拼接欢迎词', story: '飞船广播要播出欢迎词，用字符串拼接生成它。',
      goal: '定义 <code>string place = "星际学院";</code>，用 <code>+</code> 拼接出 <code>欢迎来到星际学院！</code> 并输出（必须用拼接，不能整句写死）。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string place = "星际学院";\n    // 用 + 拼接出完整的欢迎词\n    return 0;\n}',
      tests: [{ input: '', expected: '欢迎来到星际学院！' }],
      hints: ['字符串 + 字符串 = 更长的字符串', '"欢迎来到" + place + "！"', 'cout << "欢迎来到" + place + "！" << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string place = "星际学院";\n    string msg = "欢迎来到" + place + "！";\n    cout << msg << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c2c', title: '🎮 闯关：飞船仪表盘', story: '你是飞船仪表工程师！用 4 种不同类型的变量记录飞船状态：燃料消耗 20 后还剩多少？速度、等级、就绪状态也要显示。注意 bool 输出时是什么样！',
    goal: '定义 <code>int fuel = 100;</code>（消耗 20）、<code>double speed = 7.9;</code>、<code>char level = \'A\';</code>、<code>bool ready = true;</code>，按顺序每行输出一个值：<pre>80\n7.9\nA\n1</pre>',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int fuel = 100;\n    // 消耗 20 燃料，再定义 speed、level、ready\n    // 按顺序每行输出一个\n    return 0;\n}',
    tests: [{ input: '', expected: '80\n7.9\nA\n1' }],
    hints: ['fuel = fuel - 20; 之后 fuel 是 80', 'char 用单引号：char level = \'A\';', 'bool ready = true; 输出时显示 1（C++ 的规定）'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int fuel = 100;\n    fuel = fuel - 20;\n    double speed = 7.9;\n    char level = \'A\';\n    bool ready = true;\n    cout << fuel << endl;\n    cout << speed << endl;\n    cout << level << endl;\n    cout << ready << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 3 章 ---------- */
CURRICULUM.push({
  id: 'c3', emoji: '⌨️', title: '和电脑对话', subtitle: '输入、运算与整数除法的陷阱',
  intro: '只会喊话的飞船不够聪明——它还要会"听"。本章学会用 cin 接收数据，用运算符做计算，并识破 C++ 最著名的新手陷阱：整数除法。',
  concepts: [
    { id: 'c3k1', title: 'cin：听电脑外的声音', html: '<p><code>cin</code>（see-in）是 cout 的反义词：从输入中<strong>读取</strong>数据放进变量，方向用 <code>&gt;&gt;</code>。</p><p><code>cin &gt;&gt; a &gt;&gt; b;</code> 会依次读入两个数。输入的数据用空格或换行分隔。在本网站，输入写在代码下方的"输入"框里；评测时系统会自动喂入测试数据。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;   // 依次读入两个整数\n    cout << "你输入了 " << a << " 和 " << b << endl;\n    cout << "它们的和是 " << a + b << endl;\n    return 0;\n}',
      points: ['cin >> 变量 把输入存进变量', '可以连续 >> 读多个', '输入用空格或换行分隔', '读入前变量要先定义好类型'] },
    { id: 'c3k2', title: '算术运算符与整数除法陷阱', html: '<p>C++ 的运算符：<code>+ - *</code> 加减乘，<code>/</code> 除，<code>%</code> 取余数。</p><p>⚠️ <strong>大陷阱</strong>：两个 int 相除，结果还是 int——小数部分被直接砍掉！<code>7 / 2</code> 得 3，不是 3.5。想要 3.5，让至少一边变成小数：<code>7 * 1.0 / 2</code>。</p><p><code>%</code> 非常有用：<code>n % 2</code> 判断奇偶，<code>n % 10</code> 取出个位数字。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << 7 / 2 << endl;        // 3（整数除法！）\n    cout << 7 * 1.0 / 2 << endl;  // 3.5\n    cout << 7 % 2 << endl;        // 1（余数）\n    cout << 123 % 10 << endl;     // 3（个位）\n    cout << 123 / 10 << endl;     // 12（去掉个位）\n    return 0;\n}',
      points: ['int / int 结果砍掉小数（向零取整）', '想要小数结果：乘 1.0 或用 double', '% 取余数：判奇偶、拆数字神器', 'n / 10 去掉个位，n % 10 取出个位'] },
    { id: 'c3k3', title: '混合运算与优先级', html: '<p>先乘除后加减，括号最优先——和数学一样。写复杂算式时，<strong>多加括号</strong>让意图清晰，比背优先级表更可靠。</p><p>把大问题拆成小步骤也是费曼式编程的精髓：先算分钟，再算剩余秒数，每步一个变量，清清楚楚。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int seconds;\n    cin >> seconds;          // 比如 125\n    int minutes = seconds / 60;\n    int rest = seconds % 60;\n    cout << minutes << " " << rest << endl;  // 2 5\n    return 0;\n}',
      points: ['先乘除后加减，括号最优先', '复杂算式多加括号更清晰', '把计算拆成小步骤，每步一个变量', '/ 和 % 配合可以拆分单位'] }
  ],
  feynman: { id: 'c3f', prompt: '向朋友解释：cin 是怎么工作的？为什么 C++ 里 7 / 2 等于 3 而不是 3.5？怎样才能得到 3.5？% 运算符有什么用？举一个生活中的例子。',
    groups: [['cin', '输入', '读入', '键盘', '读取'], ['运算', '加', '减', '乘', '除'], ['整数除法', '取整', '砍掉', '舍去', '丢掉小数', 'int'], ['%', '余数', '取余', '剩下']],
    need: 3, minLen: 20, tip: '想想分糖果：7 颗糖分给 2 人，每人 3 颗，还剩 1 颗——这就是 / 和 %。' },
  tasks: [
    { id: 'c3t1', title: '三合一计算器', story: '飞船需要一个快速计算器：输入两个数，立刻报告和、差、积。',
      goal: '读入两个整数 a 和 b，输出一行三个数（空格分隔）：<code>a+b a-b a*b</code>。例如输入 <code>7 3</code> 输出 <code>10 4 21</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // 输出和、差、积，用空格隔开\n    return 0;\n}',
      tests: [{ input: '7 3', expected: '10 4 21' }, { input: '-2 5', expected: '3 -7 -10' }, { input: '0 0', expected: '0 0 0' }],
      hints: ['用 << " " 在数字之间输出空格', 'cout << a + b << " " << ...', '三个表达式：a+b、a-b、a*b'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << " " << a - b << " " << a * b << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c3t2', title: '时间转换器', story: '导航电脑只懂"几分几秒"，把总秒数转换给它。',
      goal: '读入一个整数秒数，输出 <code>分钟 剩余秒</code>。例如 <code>125</code> → <code>2 5</code>；<code>59</code> → <code>0 59</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int seconds;\n    cin >> seconds;\n    // 用 / 60 和 % 60 拆分\n    return 0;\n}',
      tests: [{ input: '125', expected: '2 5' }, { input: '3600', expected: '60 0' }, { input: '59', expected: '0 59' }],
      hints: ['分钟 = seconds / 60（整数除法正好砍掉零头）', '剩余秒 = seconds % 60', 'cout << seconds / 60 << " " << seconds % 60 << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int seconds;\n    cin >> seconds;\n    cout << seconds / 60 << " " << seconds % 60 << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c3t3', title: '圆形舷窗', story: '工匠要制作圆形舷窗，需要周长和面积。圆周率取 3.14。',
      goal: '读入一个小数半径 r（double），输出 <code>周长 面积</code>，π 取 <code>3.14</code>。例如 <code>3</code> → <code>18.84 28.26</code>。注意别掉进整数除法陷阱（本题都是乘法，放心）。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double r;\n    cin >> r;\n    double pi = 3.14;\n    // 周长 = 2*pi*r，面积 = pi*r*r\n    return 0;\n}',
      tests: [{ input: '3', expected: '18.84 28.26' }, { input: '1.5', expected: '9.42 7.065' }, { input: '2', expected: '12.56 12.56' }],
      hints: ['周长 = 2 * pi * r', '面积 = pi * r * r', 'cout << 2 * pi * r << " " << pi * r * r << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double r;\n    cin >> r;\n    double pi = 3.14;\n    cout << 2 * pi * r << " " << pi * r * r << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c3c', title: '🎮 闯关：星际零钱兑换机', story: '空间站的自动兑换机坏了！请你重写它的核心：输入一个整数金额（元），输出最少张数的 100 元、50 元、10 元、1 元各多少张。策略：先尽量用大面额！这正是 / 和 % 的舞台。',
    goal: '读入金额 n，输出一行四个数：<code>100元张数 50元张数 10元张数 1元张数</code>。例如 <code>386</code> → <code>3 1 3 6</code>（3×100+1×50+3×10+6×1=386）。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int n100 = n / 100;\n    n = n % 100;   // 剩下的钱\n    // 继续拆 50、10、1\n    return 0;\n}',
    tests: [{ input: '386', expected: '3 1 3 6' }, { input: '99', expected: '0 1 4 9' }, { input: '1000', expected: '10 0 0 0' }, { input: '7', expected: '0 0 0 7' }],
    hints: ['每拆完一种面额，用 n = n % 面额 更新剩余金额', '50 元张数 = n / 50，然后 n = n % 50', '最后剩下的 n 就是 1 元张数'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int n100 = n / 100; n = n % 100;\n    int n50 = n / 50;   n = n % 50;\n    int n10 = n / 10;   n = n % 10;\n    cout << n100 << " " << n50 << " " << n10 << " " << n << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 4 章 ---------- */
CURRICULUM.push({
  id: 'c4', emoji: '🔀', title: '聪明的选择', subtitle: '让程序学会做决定',
  intro: '之前的程序只会一条路走到黑。本章给飞船装上"判断引擎"：if / else 让程序根据不同情况走不同的路——这是智能的起点。',
  concepts: [
    { id: 'c4k1', title: 'if / else：岔路口', html: '<p><code>if (条件) { ... } else { ... }</code>：条件成立走第一条路，否则走第二条。条件是一个结果为真/假的表达式。</p><p>比较运算符：<code>&gt; &lt; &gt;= &lt;=</code>，相等是 <code>==</code>（两个等号！），不等是 <code>!=</code>。⚠️ 把 <code>==</code> 写成 <code>=</code> 是经典错误——一个是提问，一个是赋值。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    if (n % 2 == 0) {\n        cout << "偶数" << endl;\n    } else {\n        cout << "奇数" << endl;\n    }\n    return 0;\n}',
      points: ['if 条件成立才执行大括号里的代码', 'else 是"否则"分支', '== 判断相等，= 是赋值，别混淆', '!= 表示不等于'] },
    { id: 'c4k2', title: 'else if：多个岔路', html: '<p>情况不止两种时，用 <code>else if</code> 串联多个条件。电脑<strong>从上往下</strong>检查，命中第一个就执行并跳过其余——所以条件的顺序很重要！</p><p>成绩分级：先查 >=90，再查 >=80……如果顺序颠倒，95 分会先命中 >=60 而被判成 C！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int score;\n    cin >> score;\n    if (score >= 90) {\n        cout << "A" << endl;\n    } else if (score >= 80) {\n        cout << "B" << endl;\n    } else if (score >= 60) {\n        cout << "C" << endl;\n    } else {\n        cout << "D" << endl;\n    }\n    return 0;\n}',
      points: ['else if 从上往下依次检查', '命中一个就跳过后面所有分支', '范围判断要从最严格的条件开始', '最后的 else 兜底所有剩余情况'] },
    { id: 'c4k3', title: '逻辑运算：并且、或者、不是', html: '<p>组合条件：<code>&amp;&amp;</code> 并且（两边都真才真）、<code>||</code> 或者（一边真就真）、<code>!</code> 取反。</p><p>闰年规则就是逻辑运算的经典应用：能被 4 整除<strong>并且</strong>不能被 100 整除，<strong>或者</strong>能被 400 整除。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int year;\n    cin >> year;\n    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {\n        cout << "闰年" << endl;\n    } else {\n        cout << "平年" << endl;\n    }\n    return 0;\n}',
      points: ['&& 并且：都真才真', '|| 或者：一真即真', '! 取反：真变假、假变真', '复杂条件加括号，清晰又安全'] }
  ],
  feynman: { id: 'c4f', prompt: '向朋友解释：if / else 是怎么帮程序做决定的？== 和 = 有什么区别？&& 和 || 分别什么时候用？举一个生活里"做选择"的例子。',
    groups: [['if', '如果', '判断', '条件'], ['else', '否则', '不然', '另一'], ['==', '相等', '等于', '比较', '='], ['&&', '||', '并且', '或者', '同时', '逻辑']],
    need: 3, minLen: 20, tip: '想想"如果下雨就带伞，否则戴帽子"——程序就是这样思考的。' },
  tasks: [
    { id: 'c4t1', title: '奇偶探测器', story: '能量块分奇偶两种型号，探测器要自动识别。',
      goal: '读入整数 n，是偶数输出 <code>偶数</code>，否则输出 <code>奇数</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 用 % 2 和 if/else 判断\n    return 0;\n}',
      tests: [{ input: '7', expected: '奇数' }, { input: '0', expected: '偶数' }, { input: '-4', expected: '偶数' }, { input: '101', expected: '奇数' }],
      hints: ['n % 2 的结果是 0 或 1（负偶数也是 0）', 'if (n % 2 == 0) 判断偶数', '别忘了 else 分支输出"奇数"'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    if (n % 2 == 0) {\n        cout << "偶数" << endl;\n    } else {\n        cout << "奇数" << endl;\n    }\n    return 0;\n}', xp: 20 },
    { id: 'c4t2', title: '成绩分级机', story: '学院的成绩单要自动打上等级印章。',
      goal: '读入成绩 score（0~100 整数）：>=90 输出 <code>A</code>，>=80 输出 <code>B</code>，>=60 输出 <code>C</code>，否则 <code>D</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int score;\n    cin >> score;\n    // 用 if / else if / else 分级\n    return 0;\n}',
      tests: [{ input: '95', expected: 'A' }, { input: '90', expected: 'A' }, { input: '85', expected: 'B' }, { input: '60', expected: 'C' }, { input: '59', expected: 'D' }],
      hints: ['从最高的条件开始查：先 >=90', 'else if (score >= 80) 处理 B', '最后的 else 不用写条件，兜底 D'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int score;\n    cin >> score;\n    if (score >= 90) cout << "A" << endl;\n    else if (score >= 80) cout << "B" << endl;\n    else if (score >= 60) cout << "C" << endl;\n    else cout << "D" << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c4t3', title: '闰年预言家', story: '星际历法需要知道哪一年有 366 天。',
      goal: '读入年份 year，闰年输出 <code>闰年</code>，否则 <code>平年</code>。规则：能被 4 整除且不能被 100 整除，或能被 400 整除。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int year;\n    cin >> year;\n    // 用 && 和 || 组合三个条件\n    return 0;\n}',
      tests: [{ input: '2024', expected: '闰年' }, { input: '1900', expected: '平年' }, { input: '2000', expected: '闰年' }, { input: '2023', expected: '平年' }],
      hints: ['能被 4 整除：year % 4 == 0', '不能被 100 整除：year % 100 != 0', '(year % 4 == 0 && year % 100 != 0) || year % 400 == 0'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int year;\n    cin >> year;\n    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {\n        cout << "闰年" << endl;\n    } else {\n        cout << "平年" << endl;\n    }\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c4c', title: '🎮 闯关：游乐园售票机器人', story: '星际游乐园的售票员请假了，你来顶班！规则要严格按顺序判断：① 年龄小于 6 岁或身高不足 100cm → 免票；② 否则 14 岁及以下 → 儿童票；③ 否则 60 岁及以上 → 老人票；④ 其余 → 成人票。小心：顺序错了就会卖错票！',
    goal: '读入两个整数：年龄 age 和身高 height（cm），输出 <code>免票</code> / <code>儿童票</code> / <code>老人票</code> / <code>成人票</code> 之一。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age, height;\n    cin >> age >> height;\n    // 按规则顺序判断四种票\n    return 0;\n}',
    tests: [{ input: '5 110', expected: '免票' }, { input: '10 95', expected: '免票' }, { input: '12 130', expected: '儿童票' }, { input: '14 100', expected: '儿童票' }, { input: '30 170', expected: '成人票' }, { input: '65 160', expected: '老人票' }, { input: '6 99', expected: '免票' }],
    hints: ['第一个条件用 ||：age < 6 || height < 100', '免票判断必须放最前面，否则会误判', '接着 else if (age <= 14)，再 else if (age >= 60)，最后 else'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age, height;\n    cin >> age >> height;\n    if (age < 6 || height < 100) {\n        cout << "免票" << endl;\n    } else if (age <= 14) {\n        cout << "儿童票" << endl;\n    } else if (age >= 60) {\n        cout << "老人票" << endl;\n    } else {\n        cout << "成人票" << endl;\n    }\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 5 章 ---------- */
CURRICULUM.push({
  id: 'c5', emoji: '🔁', title: '循环魔法', subtitle: '让电脑不知疲倦地重复',
  intro: '还记得第 1 章用 6 条 cout 写倒计时吗？如果要数到 10000 呢？电脑最擅长重复劳动——本章学会循环，把枯燥的重复交给它。',
  concepts: [
    { id: 'c5k1', title: 'for：计次循环', html: '<p><code>for (起点; 条件; 步进)</code> 是"数着做"的循环：<code>for (int i = 1; i &lt;= 5; i++)</code> 让 i 从 1 变到 5，每次执行一遍循环体。</p><p>三个部分各司其职：<strong>起点</strong>只执行一次；每轮先查<strong>条件</strong>，成立才执行循环体；每轮结束执行<strong>步进</strong>。<code>i++</code> 就是 i = i + 1 的简写。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 5; i >= 1; i--) {\n        cout << i << endl;\n    }\n    cout << "发射！" << endl;\n    return 0;\n}',
      points: ['for (起点; 条件; 步进) 三段式', 'i++ 等于 i = i + 1，i-- 是减 1', '条件不成立时循环结束', '第 1 章的倒计时现在 3 行就搞定'] },
    { id: 'c5k2', title: 'while：条件循环与累加器', html: '<p><code>while (条件)</code> 是"只要…就一直做"的循环，适合<strong>不知道要重复几次</strong>的场景，比如"读到 0 为止"。</p><p><strong>累加器</strong>是循环的黄金搭档：循环外定义 <code>sum = 0</code>，循环内不断 <code>sum += x</code>。计数器 count 同理。⚠️ 千万保证条件 eventually 会变假，否则就是死循环！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int sum = 0;              // 累加器\n    for (int i = 1; i <= n; i++) {\n        sum += i;             // 把 i 加进 sum\n    }\n    cout << sum << endl;\n    return 0;\n}',
      points: ['while 适合"直到…为止"的场景', '累加器：循环外清零，循环内累加', '+= 是 sum = sum + x 的简写', '小心死循环：条件必须有机会变假'] },
    { id: 'c5k3', title: 'break 与 continue', html: '<p><code>break</code>：立刻<strong>跳出整个循环</strong>。<code>continue</code>：<strong>跳过本轮</strong>剩余部分，直接进入下一轮。</p><p>经典组合：<code>while (true)</code> 无限循环 + 读到特定值就 break——"读入若干数直到 0"就这么写。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, sum = 0, count = 0;\n    while (true) {\n        cin >> x;\n        if (x == 0) break;    // 读到 0 就结束\n        sum += x;\n        count++;\n    }\n    cout << sum << " " << count << endl;\n    return 0;\n}',
      points: ['break 跳出整个循环', 'continue 跳过本轮，进入下一轮', 'while(true) + break 处理"直到…"输入', '循环里也能用 if 做筛选'] }
  ],
  feynman: { id: 'c5f', prompt: '向朋友解释：for 循环的三个部分各干什么？for 和 while 分别适合什么场景？什么是累加器？break 和 continue 有什么不同？',
    groups: [['for', 'while', '循环', '重复'], ['条件', '起点', '步进', '次数', '什么时候'], ['累加', 'sum', '求和', '计数', '加起来'], ['break', '跳出', '停止', 'continue', '跳过']],
    need: 3, minLen: 20, tip: '想想操场跑圈：跑几圈是 for，跑到天黑是 while，累加器是计圈手环。' },
  tasks: [
    { id: 'c5t1', title: '能量累加器', story: '飞船要给 1 到 n 号电池充电，报告总能量。',
      goal: '读入 n，计算 <code>1+2+...+n</code> 并输出。例如 n=100 → 5050。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int sum = 0;\n    // 用 for 循环累加\n    cout << sum << endl;\n    return 0;\n}',
      tests: [{ input: '100', expected: '5050' }, { input: '1', expected: '1' }, { input: '10', expected: '55' }],
      hints: ['for (int i = 1; i <= n; i++)', '循环体里写 sum += i;（或 sum = sum + i;）', 'sum 要在循环外定义为 0'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int sum = 0;\n    for (int i = 1; i <= n; i++) {\n        sum += i;\n    }\n    cout << sum << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c5t2', title: '3 的倍数雷达', story: '雷达要筛出 1~n 中所有 3 的倍数。',
      goal: '读入 n，把 1~n 中所有 3 的倍数<strong>从小到大</strong>输出在同一行，空格分隔。例如 n=10 → <code>3 6 9</code>。一个都没有就输出空行。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 遍历 1~n，用 % 3 筛选\n    cout << endl;\n    return 0;\n}',
      tests: [{ input: '10', expected: '3 6 9' }, { input: '15', expected: '3 6 9 12 15' }, { input: '2', expected: '' }],
      hints: ['遍历每个 i，判断 i % 3 == 0', '符合条件的输出 cout << i << " ";', '也可以让 i 从 3 开始每次加 3，更聪明！'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 3; i <= n; i += 3) {\n        cout << i << " ";\n    }\n    cout << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c5t3', title: '黑洞读数器', story: '传感器不断吐出读数，直到出现 0 表示结束。统计总和与个数。',
      goal: '不断读入整数直到读到 <code>0</code>（0 不计入），输出 <code>总和 个数</code>。例如输入 <code>3 5 7 0</code> → <code>15 3</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, sum = 0, count = 0;\n    // while(true) + break，或者 while(cin>>x && x!=0) 的简化写法\n    cout << sum << " " << count << endl;\n    return 0;\n}',
      tests: [{ input: '3 5 7 0', expected: '15 3' }, { input: '0', expected: '0 0' }, { input: '10 -2 0', expected: '8 2' }],
      hints: ['while (true) { cin >> x; if (x == 0) break; ... }', 'break 之前不要累加 0', 'count++ 统计个数'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, sum = 0, count = 0;\n    while (true) {\n        cin >> x;\n        if (x == 0) break;\n        sum += x;\n        count++;\n    }\n    cout << sum << " " << count << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c5c', title: '🎮 闯关：嘀嗒密码（FizzBuzz）', story: '外星人的接头暗号是经典编程面试题 FizzBuzz 的星际版！从 1 数到 n：3 的倍数说"嘀"，5 的倍数说"嗒"，既是 3 又是 5 的倍数说"嘀嗒"，其余报数字。每行一个。小心判断顺序——先查谁？',
    goal: '读入 n，输出 n 行。例如 n=5：<pre>1\n2\n嘀\n4\n嗒</pre>n=15 时最后一行是 <code>嘀嗒</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        // 先判断 15 的倍数，再 3，再 5，最后数字\n    }\n    return 0;\n}',
    tests: [{ input: '5', expected: '1\n2\n嘀\n4\n嗒' }, { input: '15', expected: '1\n2\n嘀\n4\n嗒\n嘀\n7\n8\n嘀\n嗒\n11\n嘀\n13\n14\n嘀嗒' }],
    hints: ['先判断 i % 15 == 0（同时是 3 和 5 的倍数）', '如果先查 3 的倍数，15 会被"嘀"抢走，永远轮不到"嘀嗒"', '也可以用 i % 3 == 0 && i % 5 == 0 作为第一个条件'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        if (i % 15 == 0) cout << "嘀嗒" << endl;\n        else if (i % 3 == 0) cout << "嘀" << endl;\n        else if (i % 5 == 0) cout << "嗒" << endl;\n        else cout << i << endl;\n    }\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 6 章 ---------- */
CURRICULUM.push({
  id: 'c6', emoji: '🗄️', title: '数据仓库', subtitle: '数组：一整排宝盒',
  intro: '一个变量装一个数据，那 100 个成绩呢？定义 100 个变量太傻了。数组把一排同类型的盒子编上号，用循环就能批量处理——这是数据结构的起点。',
  concepts: [
    { id: 'c6k1', title: '数组：编号的一排盒子', html: '<p><code>int scores[5];</code> 造了 5 个连续的 int 盒子，编号（<strong>下标</strong>）从 <strong>0</strong> 到 4——注意不是从 1 开始！</p><p>可以用初始值列表：<code>int a[5] = {5, 3, 9, 1, 7};</code>，也可以省略长度让电脑数：<code>int a[] = {1, 2, 3};</code>。</p><p>⚠️ <strong>越界</strong>是数组最危险的错误：访问 a[5]（长度只有 5）就像打开不存在的 6 号抽屉。本网站的解释器会抓住它并提醒你。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5] = {5, 3, 9, 1, 7};\n    cout << a[0] << endl;   // 第一个：5\n    cout << a[4] << endl;   // 最后一个：7\n    a[1] = 100;             // 修改 2 号盒子\n    cout << a[1] << endl;   // 100\n    return 0;\n}',
      points: ['int a[5] 有 5 个元素，下标 0~4', '下标从 0 开始，最后一个是 长度-1', '{ } 列表初始化，可省略长度', '越界访问是危险错误，要时刻警惕'] },
    { id: 'c6k2', title: '循环遍历数组', html: '<p>数组 + for 循环是黄金组合：<code>for (int i = 0; i &lt; 5; i++)</code> 让 i 恰好扫过所有合法下标。</p><p>读入一批数据、逆序输出、逐个加工……都是"遍历"的变体。把数组想象成一条传送带，循环就是站在旁边逐个检查的工人。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;              // 先读个数\n    int a[100];\n    for (int i = 0; i < n; i++) {\n        cin >> a[i];       // 逐个读入\n    }\n    for (int i = n - 1; i >= 0; i--) {\n        cout << a[i] << " ";   // 逆序输出\n    }\n    cout << endl;\n    return 0;\n}',
      points: ['for i = 0; i < n; i++ 扫过所有下标', 'cin >> a[i] 批量读入', '逆序遍历：i 从 n-1 递减到 0', '数组长度要开得够大（如 a[100]）'] },
    { id: 'c6k3', title: '打擂台：找最值与统计', html: '<p>找最大值的经典算法叫"<strong>打擂台</strong>"：先让第一个元素当擂主，然后逐个挑战，谁大谁留下。</p><p>求平均值要小心整数除法：<code>sum * 1.0 / n</code> 才能得到小数。统计"超过平均值的个数"需要<strong>两遍遍历</strong>：先算平均，再比较——因为不看完全部数据，不知道平均是多少！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5] = {5, 3, 9, 1, 7};\n    int maxv = a[0];        // 第一个当擂主\n    for (int i = 1; i < 5; i++) {\n        if (a[i] > maxv) maxv = a[i];  // 挑战成功\n    }\n    cout << "最大值 " << maxv << endl;\n    return 0;\n}',
      points: ['打擂台：先设擂主，再逐个挑战', '最小值同理，把 > 换成 <', '平均值用 sum * 1.0 / n 避免整数除法', '有些问题需要遍历两遍'] }
  ],
  feynman: { id: 'c6f', prompt: '向朋友解释：数组是什么？下标为什么从 0 开始、最后一个元素的下标是多少？什么是"越界"？"打擂台"找最大值是怎么进行的？',
    groups: [['数组', '一排', '一批', '连续', '多个'], ['下标', '索引', '编号', '0', '位置'], ['遍历', '循环', '逐个', '每个', '扫'], ['越界', '超出', '范围', '最大', '擂台']],
    need: 3, minLen: 20, tip: '想想一排储物柜：编号从 0 开始，打开不存在的柜子就是越界。' },
  tasks: [
    { id: 'c6t1', title: '倒带播放器', story: '外星音乐盒只能倒着放歌，把 5 个音符逆序输出。',
      goal: '读入 5 个整数存入数组，然后<strong>逆序</strong>输出在同一行，空格分隔。例如 <code>1 2 3 4 5</code> → <code>5 4 3 2 1</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5];\n    for (int i = 0; i < 5; i++) cin >> a[i];\n    // 逆序输出\n    cout << endl;\n    return 0;\n}',
      tests: [{ input: '1 2 3 4 5', expected: '5 4 3 2 1' }, { input: '9 7 5 3 1', expected: '1 3 5 7 9' }, { input: '2 2 2 2 2', expected: '2 2 2 2 2' }],
      hints: ['逆序：i 从 4 开始递减到 0', 'for (int i = 4; i >= 0; i--)', '输出 cout << a[i] << " ";'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5];\n    for (int i = 0; i < 5; i++) cin >> a[i];\n    for (int i = 4; i >= 0; i--) {\n        cout << a[i] << " ";\n    }\n    cout << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c6t2', title: '成绩擂台赛', story: '找出全班的最高分和最低分。',
      goal: '先读入 n（1~100），再读入 n 个成绩，输出 <code>最高分 最低分</code>。例如 n=5，成绩 88 92 76 95 81 → <code>95 76</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    // 打擂台找最大和最小\n    return 0;\n}',
      tests: [{ input: '5\n88 92 76 95 81', expected: '95 76' }, { input: '1\n60', expected: '60 60' }, { input: '3\n-5 -2 -9', expected: '-2 -9' }],
      hints: ['int maxv = a[0], minv = a[0]; 两个擂主', '一个循环里同时打两场擂台', 'if (a[i] > maxv) maxv = a[i]; if (a[i] < minv) minv = a[i];'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int maxv = a[0], minv = a[0];\n    for (int i = 1; i < n; i++) {\n        if (a[i] > maxv) maxv = a[i];\n        if (a[i] < minv) minv = a[i];\n    }\n    cout << maxv << " " << minv << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c6t3', title: '高于平均线的星星', story: '统计有多少颗星星的亮度超过平均亮度。',
      goal: '读入 n 和 n 个整数，输出<strong>严格大于平均值</strong>的数的个数。例如 1 2 3 4（平均 2.5）→ <code>2</code>；5 5 5 → <code>0</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    // 第一遍：求和算平均（小心整数除法！）\n    // 第二遍：统计大于平均值的个数\n    return 0;\n}',
      tests: [{ input: '4\n1 2 3 4', expected: '2' }, { input: '3\n5 5 5', expected: '0' }, { input: '5\n10 20 30 40 50', expected: '2' }],
      hints: ['double avg = sum * 1.0 / n;', '再遍历一遍，if (a[i] > avg) count++;', '平均值可能是小数，sum 用 int 也行，乘 1.0 即可'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> a[i];\n        sum += a[i];\n    }\n    double avg = sum * 1.0 / n;\n    int count = 0;\n    for (int i = 0; i < n; i++) {\n        if (a[i] > avg) count++;\n    }\n    cout << count << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c6c', title: '🎮 闯关：星际运动会评分', story: '体操决赛有 7 位评委打分。规则：去掉一个最高分、去掉一个最低分，剩下 5 个分数求和就是最终得分。注意：如果有并列最高/最低，只去掉一个！你能用"总和 - 最大 - 最小"巧妙解决吗？',
    goal: '读入 7 个整数评分，输出去掉一个最高和一个最低后的总分。例如 <code>10 9 8 7 6 5 4</code> → <code>35</code>；<code>7 7 7 7 7 7 7</code> → <code>35</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[7];\n    for (int i = 0; i < 7; i++) cin >> a[i];\n    // 思路：总和 - 最大值 - 最小值\n    return 0;\n}',
    tests: [{ input: '10 9 8 7 6 5 4', expected: '35' }, { input: '7 7 7 7 7 7 7', expected: '35' }, { input: '1 2 3 4 5 6 100', expected: '20' }, { input: '9 9 9 1 1 5 6', expected: '30' }],
    hints: ['一遍循环同时求 sum、maxv、minv', '答案 = sum - maxv - minv', '全相同的情况也自动正确：7*7-7-7=35'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[7];\n    int sum = 0;\n    for (int i = 0; i < 7; i++) {\n        cin >> a[i];\n        sum += a[i];\n    }\n    int maxv = a[0], minv = a[0];\n    for (int i = 1; i < 7; i++) {\n        if (a[i] > maxv) maxv = a[i];\n        if (a[i] < minv) minv = a[i];\n    }\n    cout << sum - maxv - minv << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 7 章 ---------- */
CURRICULUM.push({
  id: 'c7', emoji: '🏭', title: '函数工厂', subtitle: '把代码打包成可复用的机器',
  intro: '如果每段功能都要重写一遍，代码会又长又乱。函数把一段代码打包成"机器"：喂进原料（参数），吐出产品（返回值）。这是程序员最重要的整理术。',
  concepts: [
    { id: 'c7k1', title: '定义与调用函数', html: '<p>函数三要素：<strong>返回类型</strong>（产品是什么）、<strong>名字</strong>、<strong>参数列表</strong>（原料）。</p><p><code>int square(int x) { return x * x; }</code> 造了一台平方机器。调用 <code>square(7)</code> 得到 49。<code>return</code> 把结果交回去并立刻结束函数。</p><p>main 也是函数！程序从 main 开始，main 调用其他函数，其他函数还能调用更多函数。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    return x * x;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << square(n) << endl;\n    cout << square(3) + square(4) << endl;  // 9+16=25\n    return 0;\n}',
      points: ['返回类型 名字(参数) { 函数体 }', 'return 交出结果并结束函数', '调用：函数名(实参)', '函数让代码可以反复使用'] },
    { id: 'c7k2', title: '参数与返回值的设计', html: '<p>不需要原料的函数参数为空：<code>int dice() { ... }</code>；不产出产品的函数返回类型写 <code>void</code>，可以不写 return。</p><p>函数内部定义的变量是<strong>局部变量</strong>，出了函数就消失——不同函数里可以各有自己的 i，互不干扰。这叫<strong>作用域</strong>。</p><p>判断质数、求数字和……把每个小功能做成函数，main 就像指挥官一样清爽。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nbool isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;  // 发现因子\n    }\n    return true;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    if (isPrime(n)) cout << "是质数" << endl;\n    else cout << "不是质数" << endl;\n    return 0;\n}',
      points: ['void 表示不返回任何值', 'bool 函数常用来做判断', '局部变量只在函数内有效（作用域）', 'return 可以提前结束函数'] },
    { id: 'c7k3', title: '函数调用函数', html: '<p>函数可以互相调用，组合出复杂功能：<code>max3</code> 可以借助两次 <code>max</code> 完成。</p><p>费曼式思考：把大问题拆成"我会做的小问题"，每个小问题一个函数。这正是"分而治之"的编程哲学。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint max2(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint max3(int a, int b, int c) {\n    return max2(max2(a, b), c);  // 嵌套调用\n}\n\nint main() {\n    cout << max3(3, 9, 5) << endl;  // 9\n    return 0;\n}',
      points: ['函数可以调用其他函数', '复杂功能 = 小函数的组合', 'max3 用两次 max2 实现', '拆解问题是编程的核心思维'] }
  ],
  feynman: { id: 'c7f', prompt: '向朋友解释：函数是什么？参数和返回值各扮演什么角色？为什么函数能让代码更好？什么是局部变量的"作用域"？',
    groups: [['函数', '功能', '机器', '打包', '模块'], ['参数', '传入', '原料', '输入'], ['return', '返回', '结果', '产品', '输出'], ['复用', '重复使用', '调用', '简洁', '作用域', '局部']],
    need: 3, minLen: 20, tip: '把函数想象成榨汁机：水果是参数，果汁是返回值，机器可以反复用。' },
  tasks: [
    { id: 'c7t1', title: '平方机器', story: '造一台平方机器并试用它。',
      goal: '定义函数 <code>int square(int x)</code> 返回 x 的平方。main 中读入 n，输出 square(n)。',
      starter: '#include <iostream>\nusing namespace std;\n\n// 在这里定义 square 函数\n\nint main() {\n    int n;\n    cin >> n;\n    cout << square(n) << endl;\n    return 0;\n}',
      tests: [{ input: '7', expected: '49' }, { input: '-3', expected: '9' }, { input: '0', expected: '0' }, { input: '12', expected: '144' }],
      hints: ['int square(int x) { return x * x; }', '函数要写在 main 的外面（上面）', 'return 把结果交回给调用者'],
      solution: '#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    return x * x;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << square(n) << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c7t2', title: '质数安检门', story: '质数只能被 1 和自己整除。造一扇安检门判断任何数。',
      goal: '定义 <code>bool isPrime(int n)</code>。main 读入 n，是质数输出 <code>是质数</code>，否则 <code>不是质数</code>。注意 1 不是质数，2 是。',
      starter: '#include <iostream>\nusing namespace std;\n\nbool isPrime(int n) {\n    // n < 2 不是质数；否则试除 2 到 sqrt(n)\n    return true;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    if (isPrime(n)) cout << "是质数" << endl;\n    else cout << "不是质数" << endl;\n    return 0;\n}',
      tests: [{ input: '7', expected: '是质数' }, { input: '1', expected: '不是质数' }, { input: '2', expected: '是质数' }, { input: '9', expected: '不是质数' }, { input: '97', expected: '是质数' }],
      hints: ['先处理 n < 2 返回 false', 'for (int i = 2; i * i <= n; i++) 试除', '发现 n % i == 0 立刻 return false'],
      solution: '#include <iostream>\nusing namespace std;\n\nbool isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    if (isPrime(n)) cout << "是质数" << endl;\n    else cout << "不是质数" << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c7t3', title: '数字拆解机', story: '把整数的每一位数字加起来：123 → 1+2+3 = 6。',
      goal: '定义 <code>int digitSum(int n)</code> 返回各位数字之和（n >= 0）。提示：循环里用 <code>n % 10</code> 取个位、<code>n / 10</code> 去个位。',
      starter: '#include <iostream>\nusing namespace std;\n\nint digitSum(int n) {\n    int sum = 0;\n    // 循环拆出每一位\n    return sum;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << digitSum(n) << endl;\n    return 0;\n}',
      tests: [{ input: '123', expected: '6' }, { input: '9999', expected: '36' }, { input: '0', expected: '0' }, { input: '100000', expected: '1' }],
      hints: ['while (n > 0) 循环', 'sum += n % 10; 取出个位累加', 'n = n / 10; 去掉个位'],
      solution: '#include <iostream>\nusing namespace std;\n\nint digitSum(int n) {\n    int sum = 0;\n    while (n > 0) {\n        sum += n % 10;\n        n = n / 10;\n    }\n    return sum;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << digitSum(n) << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c7c', title: '🎮 闯关：函数工具箱', story: '空间站工具箱缺两件工具：max3（三个数找最大）和 factorial（阶乘：n! = 1×2×...×n，规定 0! = 1）。造好它们，通过质检！质检员会先喂三个数，再喂一个 n（n ≤ 12）。',
    goal: '定义 <code>int max3(int a, int b, int c)</code> 和 <code>int factorial(int n)</code>。main 读入 a b c 输出最大值（一行），再读入 n 输出 n!（一行）。例如输入 <code>3 9 5</code> 和 <code>6</code> → 输出 <code>9</code> 和 <code>720</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nint max3(int a, int b, int c) {\n    // 可以借助两次比较\n    return a;\n}\n\nint factorial(int n) {\n    int result = 1;\n    // 累乘 1 到 n\n    return result;\n}\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    cout << max3(a, b, c) << endl;\n    int n;\n    cin >> n;\n    cout << factorial(n) << endl;\n    return 0;\n}',
    tests: [{ input: '3 9 5\n6', expected: '9\n720' }, { input: '-1 -5 -3\n0', expected: '-1\n1' }, { input: '7 7 7\n12', expected: '7\n479001600' }, { input: '10 2 3\n1', expected: '10\n1' }],
    hints: ['max3：先比 a 和 b，胜者再和 c 比', 'factorial：for 循环 result *= i，从 1 乘到 n', 'n=0 时循环不执行，result 保持 1，正好是 0!'],
    solution: '#include <iostream>\nusing namespace std;\n\nint max3(int a, int b, int c) {\n    int m = a;\n    if (b > m) m = b;\n    if (c > m) m = c;\n    return m;\n}\n\nint factorial(int n) {\n    int result = 1;\n    for (int i = 1; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    cout << max3(a, b, c) << endl;\n    int n;\n    cin >> n;\n    cout << factorial(n) << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 8 章 ---------- */
CURRICULUM.push({
  id: 'c8', emoji: '✨', title: '字符串魔法', subtitle: '玩转文字数据',
  intro: '名字、口令、电报……程序里到处都是文字。string 类型让文字处理变得像玩积木：拼接、测量、截取、逐个检查字符。',
  concepts: [
    { id: 'c8k1', title: 'string 的基本操作', html: '<p><code>string s = "hello";</code> 定义字符串。常用操作：</p><p>• <code>s.length()</code> 或 <code>s.size()</code>：长度<br>• <code>s + t</code>：拼接<br>• <code>s == t</code>：比较是否相同<br>• <code>cin &gt;&gt; s</code>：读一个单词（遇空格停）<br>• <code>getline(cin, s)</code>：读一整行（含空格）</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s = "hello";\n    cout << s.length() << endl;      // 5\n    cout << s + " world" << endl;    // hello world\n    string t;\n    cin >> t;\n    if (t == s) cout << "相同" << endl;\n    else cout << "不同" << endl;\n    return 0;\n}',
      points: ['length() / size() 求长度', '+ 拼接，== 比较内容', 'cin >> 读单词，getline 读整行', '注意方法要带括号：s.length()'] },
    { id: 'c8k2', title: '字符与下标', html: '<p>字符串是<strong>字符的序列</strong>：<code>s[0]</code> 是第一个字符（char 类型），下标同样从 0 开始。</p><p>char 本质是小整数（编码）：<code>\'a\'</code> 是 97，<code>\'A\'</code> 是 65。所以 <code>\'b\' - \'a\'</code> 等于 1，<code>c - \'a\' + \'A\'</code> 能把小写转大写！字符可以直接比较大小。</p><p>遍历字符串：<code>for (int i = 0; i &lt; (int)s.length(); i++)</code>，逐个检查 s[i]。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s = "Hello";\n    cout << s[0] << endl;          // H\n    s[0] = \'h\';                    // 修改字符\n    cout << s << endl;             // hello\n    char c = \'a\';\n    cout << (int)c << endl;        // 97（编码）\n    cout << (char)(c - 32) << endl; // A（转大写）\n    return 0;\n}',
      points: ['s[i] 取第 i 个字符，从 0 开始', 'char 是编码整数：\'a\'=97，\'A\'=65', '字符可比较、可加减', '(int)c 看编码，(char)n 转回字符'] },
    { id: 'c8k3', title: '截取与查找', html: '<p>• <code>s.substr(起点, 长度)</code>：截取子串，如 <code>"hello".substr(1, 3)</code> 得 <code>"ell"</code><br>• <code>s.find(t)</code>：查找子串位置（本网站简化：找不到返回 -1）<br>• <code>s.push_back(c)</code>：末尾追加一个字符</p><p>回文判断是经典练习：正着读反着读一样，如 level。用<strong>双指针</strong>：一头一尾向中间靠拢，逐个比较。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    bool ok = true;\n    int n = s.length();\n    for (int i = 0; i < n / 2; i++) {\n        if (s[i] != s[n - 1 - i]) {  // 首尾对称比较\n            ok = false;\n            break;\n        }\n    }\n    if (ok) cout << "是回文" << endl;\n    else cout << "不是回文" << endl;\n    return 0;\n}',
      points: ['substr(起点, 长度) 截取子串', 'find 查找位置（简化版找不到返回 -1）', '回文：首尾双指针向中间比较', 'n-1-i 是与 i 对称的位置'] }
  ],
  feynman: { id: 'c8f', prompt: '向朋友解释：string 和 char 有什么关系？怎么求字符串长度、取某个位置的字符？cin >> 和 getline 读字符串有什么不同？回文是怎么判断的？',
    groups: [['string', '字符串', '文字', '文本'], ['length', 'size', '长度', '几个字符'], ['下标', '位置', '字符', 'char', '['], ['getline', '整行', '空格', 'substr', '截取', '回文']],
    need: 3, minLen: 20, tip: '字符串就像一串珠子：每颗珠子是一个 char，可以数、可以取、可以换。' },
  tasks: [
    { id: 'c8t1', title: '单词测量仪', story: '测量一个单词的长度和首字母。',
      goal: '读入一个单词（无空格），输出 <code>长度 首字符</code>。例如 <code>hello</code> → <code>5 h</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // 输出长度和第一个字符\n    return 0;\n}',
      tests: [{ input: 'hello', expected: '5 h' }, { input: 'C', expected: '1 C' }, { input: 'rocket', expected: '6 r' }],
      hints: ['长度：s.length()', '首字符：s[0]', 'cout << s.length() << " " << s[0] << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    cout << s.length() << " " << s[0] << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c8t2', title: '回文探测器', story: '外星遗迹的门只对回文口令开启。',
      goal: '读入一个单词，是回文输出 <code>是回文</code>，否则 <code>不是回文</code>。例如 level → 是回文，hello → 不是回文。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    int n = s.length();\n    bool ok = true;\n    // 首尾双指针比较\n    if (ok) cout << "是回文" << endl;\n    else cout << "不是回文" << endl;\n    return 0;\n}',
      tests: [{ input: 'level', expected: '是回文' }, { input: 'hello', expected: '不是回文' }, { input: 'abba', expected: '是回文' }, { input: 'a', expected: '是回文' }, { input: 'ab', expected: '不是回文' }],
      hints: ['比较 s[i] 和 s[n-1-i]，i 从 0 到 n/2-1', '发现不相等就 ok = false; break;', '长度 1 的单词天然是回文（循环不执行）'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    int n = s.length();\n    bool ok = true;\n    for (int i = 0; i < n / 2; i++) {\n        if (s[i] != s[n - 1 - i]) {\n            ok = false;\n            break;\n        }\n    }\n    if (ok) cout << "是回文" << endl;\n    else cout << "不是回文" << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c8t3', title: '句子单词计数器', story: '统计一句英文里有几个单词（单词间恰好一个空格，首尾无空格）。',
      goal: '用 <code>getline(cin, s)</code> 读入一整行，输出单词数。例如 <code>I love C++</code> → <code>3</code>。提示：单词数 = 空格数 + 1。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    int spaces = 0;\n    // 遍历每个字符，数空格\n    cout << spaces + 1 << endl;\n    return 0;\n}',
      tests: [{ input: 'I love C++', expected: '3' }, { input: 'hello', expected: '1' }, { input: 'a b c d', expected: '4' }],
      hints: ['getline 能读入含空格的整行', 'for 遍历，if (s[i] == \' \') spaces++;', '单词数 = 空格数 + 1'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    int spaces = 0;\n    for (int i = 0; i < (int)s.length(); i++) {\n        if (s[i] == \' \') spaces++;\n    }\n    cout << spaces + 1 << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c8c', title: '🎮 闯关：凯撒秘密电报', story: '星际间谍用古老的凯撒密码发电报：每个字母变成字母表里的下一个（a→b，z→a 绕回，大写同理），非字母字符不变。破译机已经就位，请你编写加密机！提示：char 的编码运算 + % 26 绕回。',
    goal: '读入一个单词，输出加密后的结果。例如 <code>hello</code> → <code>ifmmp</code>；<code>Zebra!</code> → <code>Afcsb!</code>；<code>xyz</code> → <code>yza</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    for (int i = 0; i < (int)s.length(); i++) {\n        char c = s[i];\n        // 小写：c = (c - \'a\' + 1) % 26 + \'a\';\n        // 大写同理；其他字符不变\n        cout << c;\n    }\n    cout << endl;\n    return 0;\n}',
    tests: [{ input: 'hello', expected: 'ifmmp' }, { input: 'Zebra!', expected: 'Afcsb!' }, { input: 'xyz', expected: 'yza' }, { input: 'ABC-123', expected: 'BCD-123' }],
    hints: ['先判断 c 是否在 \'a\'~\'z\' 之间：c >= \'a\' && c <= \'z\'', '小写加密：c = (c - \'a\' + 1) % 26 + \'a\';（% 26 让 z 绕回 a）', '大写用 \'A\' 做基准，同样公式；数字和符号不处理'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    for (int i = 0; i < (int)s.length(); i++) {\n        char c = s[i];\n        if (c >= \'a\' && c <= \'z\') {\n            c = (c - \'a\' + 1) % 26 + \'a\';\n        } else if (c >= \'A\' && c <= \'Z\') {\n            c = (c - \'A\' + 1) % 26 + \'A\';\n        }\n        cout << c;\n    }\n    cout << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 9 章 ---------- */
CURRICULUM.push({
  id: 'c9', emoji: '🎨', title: '图案大师', subtitle: '嵌套循环与行列思维',
  intro: '一行星星会打了，那金字塔呢？循环里套循环——外层管"行"，内层管"列"。掌握嵌套循环，你就能用字符画出任何图案，也为二维世界打下基础。',
  concepts: [
    { id: 'c9k1', title: '循环套循环', html: '<p><strong>外层循环每走一步，内层循环完整跑一轮。</strong>外层 i=1 时内层跑完，i=2 时内层再跑完……总执行次数 = 外层次数 × 内层次数。</p><p>打印图案的万能思路：<strong>外层管行，内层管列</strong>。每行结束后 cout &lt;&lt; endl 换行。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 3;\n    for (int i = 0; i < n; i++) {        // 行\n        for (int j = 0; j < n; j++) {    // 列\n            cout << "*";\n        }\n        cout << endl;                    // 每行结束换行\n    }\n    return 0;\n}',
      points: ['外层一步，内层一轮', '外层管行，内层管列', '每行末尾输出 endl', '总次数 = 外层 × 内层'] },
    { id: 'c9k2', title: '找规律：用 i 和 j 表达', html: '<p>图案题的核心是<strong>找规律</strong>：第 i 行有几个空格？几个星星？把它们写成含 i 的算式。</p><p>直角三角形：第 i 行（从 1 数）有 i 个星 → 内层 <code>j &lt; i</code>。<br>金字塔：第 i 行有 n-i 个空格、2i-1 个星。</p><p>费曼式做法：先在纸上画 n=3 的例子，数一数，列出表格，规律自然浮现。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {       // 第 i 行\n        for (int j = 0; j < i; j++) {    // i 个星\n            cout << "*";\n        }\n        cout << endl;\n    }\n    return 0;\n}',
      points: ['先在纸上画小例子找规律', '第 i 行的数量写成 i 的算式', '直角三角形：第 i 行 i 个星', '金字塔：n-i 个空格 + 2i-1 个星'] },
    { id: 'c9k3', title: '二维数组简介', html: '<p><code>int grid[3][4];</code> 是 3 行 4 列的表格，<code>grid[i][j]</code> 访问第 i 行第 j 列（都从 0 开始）。</p><p>二维数组就是"数组的数组"，用双重循环遍历。地图、棋盘、像素画……都是二维世界。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            cout << grid[i][j] << " ";\n        }\n        cout << endl;\n    }\n    return 0;\n}',
      points: ['int g[行][列] 定义二维数组', 'g[i][j] 访问元素，下标都从 0 开始', '双重循环遍历：外层行、内层列', '{ {..}, {..} } 按行初始化'] }
  ],
  feynman: { id: 'c9f', prompt: '向朋友解释：嵌套循环是怎么执行的？外层和内层各管什么？打印金字塔时，怎么找出"第 i 行有几个空格几个星"的规律？',
    groups: [['嵌套', '里面', '两层', '内外', '套'], ['行', '列', '外层', '内层'], ['规律', '公式', '算式', 'i', 'j'], ['换行', 'endl', '每行', '纸上', '例子']],
    need: 3, minLen: 20, tip: '想想时钟：分针走一格（外层），时针…不对，是秒针走一整圈（内层）！' },
  tasks: [
    { id: 'c9t1', title: '星号方阵', story: '打印一个 n×n 的星号方阵。',
      goal: '读入 n，输出 n 行 n 列的 <code>*</code>。例如 n=3：<pre>***\n***\n***</pre>',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 双重循环：外层行，内层列\n    return 0;\n}',
      tests: [{ input: '3', expected: '***\n***\n***' }, { input: '1', expected: '*' }, { input: '4', expected: '****\n****\n****\n****' }],
      hints: ['外层 for i 从 0 到 n-1 管行', '内层 for j 从 0 到 n-1 输出 *', '内层结束后 cout << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            cout << "*";\n        }\n        cout << endl;\n    }\n    return 0;\n}', xp: 20 },
    { id: 'c9t2', title: '直角三角形', story: '打印靠右…不，靠左的直角三角形。',
      goal: '读入 n，第 i 行（从 1 数）输出 i 个星。例如 n=3：<pre>*\n**\n***</pre>',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        // 第 i 行输出 i 个星\n        cout << endl;\n    }\n    return 0;\n}',
      tests: [{ input: '3', expected: '*\n**\n***' }, { input: '4', expected: '*\n**\n***\n****' }, { input: '1', expected: '*' }],
      hints: ['内层次数跟 i 有关：j < i', 'for (int j = 0; j < i; j++) cout << "*";', '这就是"找规律"：第 i 行 i 个星'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            cout << "*";\n        }\n        cout << endl;\n    }\n    return 0;\n}', xp: 20 },
    { id: 'c9t3', title: '迷你乘法表', story: '打印 n 行乘法表：第 i 行是 i×1 到 i×i 的积。',
      goal: '读入 n，第 i 行输出 <code>i*1 i*2 ... i*i</code>（空格分隔）。例如 n=3：<pre>1\n2 4\n3 6 9</pre>',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        // 内层 j 从 1 到 i，输出 i*j\n        cout << endl;\n    }\n    return 0;\n}',
      tests: [{ input: '3', expected: '1\n2 4\n3 6 9' }, { input: '4', expected: '1\n2 4\n3 6 9\n4 8 12 16' }, { input: '1', expected: '1' }],
      hints: ['内层 for (int j = 1; j <= i; j++)', '输出 cout << i * j << " ";', '行末 endl'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << i * j << " ";\n        }\n        cout << endl;\n    }\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c9c', title: '🎮 闯关：星际金字塔', story: '外星文明的入口是一座星号金字塔。n 层金字塔：第 i 行（从 1 数）有 n-i 个空格、2i-1 个星，居中对齐。先在纸上画 n=3 找规律，再写两个内层循环（一个打空格，一个打星）！',
    goal: '读入 n，输出金字塔。例如 n=3：<pre>  *\n ***\n*****</pre>n=5 时第一行是 4 个空格加 1 个星。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        // 先打 n-i 个空格\n        // 再打 2*i-1 个星\n        cout << endl;\n    }\n    return 0;\n}',
    tests: [{ input: '3', expected: '  *\n ***\n*****' }, { input: '5', expected: '    *\n   ***\n  *****\n *******\n*********' }, { input: '1', expected: '*' }],
    hints: ['空格数 = n - i，星数 = 2*i - 1', '两个内层循环：for j < n-i 打空格；for j < 2*i-1 打星', '行末不要多打空格，直接 endl'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < n - i; j++) cout << " ";\n        for (int j = 0; j < 2 * i - 1; j++) cout << "*";\n        cout << endl;\n    }\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 10 章 ---------- */
CURRICULUM.push({
  id: 'c10', emoji: '🌀', title: '递归秘境', subtitle: '函数调用自己的魔法',
  intro: '俄罗斯套娃里还藏着套娃。递归就是"函数调用自己"——把大问题拆成同款小问题，直到小到一眼能答。这是编程里最优雅也最烧脑的思想。',
  concepts: [
    { id: 'c10k1', title: '递归 = 递去 + 归来', html: '<p>递归两要素：① <strong>基线条件</strong>（小到直接回答，不再调用自己）；② <strong>递归步骤</strong>（把问题缩小一点，调用自己）。</p><p>阶乘：<code>n! = n × (n-1)!</code>，而 <code>1! = 1</code> 就是基线。求 5! 时：5! → 4! → 3! → 2! → 1! 触底，然后层层返回相乘。</p><p>⚠️ 没有基线或问题不缩小 = 无限递归，程序会崩溃（本网站会在 1200 层时保护你）。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint fact(int n) {\n    if (n <= 1) return 1;        // 基线条件\n    return n * fact(n - 1);      // 递归步骤\n}\n\nint main() {\n    cout << fact(5) << endl;     // 120\n    return 0;\n}',
      points: ['递归 = 自己调用自己', '必须有基线条件（触底）', '每次调用问题必须缩小', '递去层层展开，归来层层收拢'] },
    { id: 'c10k2', title: '斐波那契：双分支递归', html: '<p>斐波那契数列：1, 1, 2, 3, 5, 8, 13…每项是前两项之和：<code>fib(n) = fib(n-1) + fib(n-2)</code>，基线是 fib(1)=fib(2)=1。</p><p>一次调用分裂成两个——像树枝分叉。画一画 fib(5) 的调用树，你会直观看到递归的展开与收拢。</p><p>（小思考：fib(40) 会非常慢，因为重复计算太多。以后学会"记忆化"就能优化——这是进阶话题！）</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint fib(int n) {\n    if (n <= 2) return 1;            // 两个基线\n    return fib(n - 1) + fib(n - 2);  // 双分支\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << endl;\n    return 0;\n}',
      points: ['fib(n) = fib(n-1) + fib(n-2)', '基线：fib(1) = fib(2) = 1', '双分支递归像树一样分叉', '朴素递归有大量重复计算（进阶可优化）'] },
    { id: 'c10k3', title: '递归 vs 循环', html: '<p>很多递归都能改写成循环，反之亦然。递归的优势是<strong>表达自然</strong>：问题的定义本身就是递归的（阶乘、树、分形）。</p><p>数字各位之和也能递归：<code>digitSum(n) = n%10 + digitSum(n/10)</code>，基线 n==0 返回 0。对比第 7 章的循环版本，体会两种风格！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint digitSum(int n) {\n    if (n == 0) return 0;             // 基线\n    return n % 10 + digitSum(n / 10); // 个位 + 剩余位\n}\n\nint main() {\n    cout << digitSum(123) << endl;    // 6\n    return 0;\n}',
      points: ['递归和循环常常可以互相改写', '递归适合"定义本身就是递归"的问题', 'digitSum(n) = n%10 + digitSum(n/10)', '每次 n/10 让问题缩小'] }
  ],
  feynman: { id: 'c10f', prompt: '向朋友解释：什么是递归？为什么一定要有"基线条件"？用阶乘或斐波那契举例说明"递去"和"归来"的过程。没有基线会怎样？',
    groups: [['递归', '自己调用自己', '自身', '调用自己'], ['基线', '结束', '停止', '边界', '最小', '触底'], ['阶乘', '斐波那契', 'fib', 'fact', '例子'], ['缩小', '分解', '层层', '返回', 'n-1']],
    need: 3, minLen: 25, tip: '想想套娃：每个娃里有个更小的娃，最小的实心娃就是基线。' },
  tasks: [
    { id: 'c10t1', title: '递归阶乘', story: '用递归重新打造阶乘机器（第 7 章你用循环做过）。',
      goal: '用<strong>递归</strong>定义 <code>int fact(int n)</code>，读入 n（0~12）输出 n!。不许用循环！',
      starter: '#include <iostream>\nusing namespace std;\n\nint fact(int n) {\n    // 基线：n <= 1 返回 1\n    // 递归：n * fact(n-1)\n    return 1;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fact(n) << endl;\n    return 0;\n}',
      tests: [{ input: '5', expected: '120' }, { input: '0', expected: '1' }, { input: '10', expected: '3628800' }, { input: '1', expected: '1' }],
      hints: ['if (n <= 1) return 1;', 'return n * fact(n - 1);', 'n=0 也走基线，返回 1，正好 0!=1'],
      solution: '#include <iostream>\nusing namespace std;\n\nint fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fact(n) << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c10t2', title: '斐波那契兔子', story: '经典兔子问题：第 n 个月有多少对兔子？答案是斐波那契数列第 n 项。',
      goal: '用递归定义 <code>int fib(int n)</code>（fib(1)=fib(2)=1），读入 n（1~25）输出 fib(n)。例如 n=10 → 55。',
      starter: '#include <iostream>\nusing namespace std;\n\nint fib(int n) {\n    // 基线 + 双分支递归\n    return 1;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << endl;\n    return 0;\n}',
      tests: [{ input: '1', expected: '1' }, { input: '2', expected: '1' }, { input: '10', expected: '55' }, { input: '20', expected: '6765' }],
      hints: ['if (n <= 2) return 1;', 'return fib(n-1) + fib(n-2);', 'n=20 以内朴素递归完全没问题'],
      solution: '#include <iostream>\nusing namespace std;\n\nint fib(int n) {\n    if (n <= 2) return 1;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c10t3', title: '递归数字和', story: '用递归重做数字拆解机，体会两种风格的差异。',
      goal: '用<strong>递归</strong>定义 <code>int digitSum(int n)</code>：n%10 + digitSum(n/10)，基线 n==0。读入 n 输出各位数字和。',
      starter: '#include <iostream>\nusing namespace std;\n\nint digitSum(int n) {\n    // 基线：n == 0 返回 0\n    // 递归：n%10 + digitSum(n/10)\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << digitSum(n) << endl;\n    return 0;\n}',
      tests: [{ input: '123', expected: '6' }, { input: '9999', expected: '36' }, { input: '5', expected: '5' }, { input: '0', expected: '0' }],
      hints: ['if (n == 0) return 0;', 'return n % 10 + digitSum(n / 10);', '每次 n/10 缩小问题，最终触底'],
      solution: '#include <iostream>\nusing namespace std;\n\nint digitSum(int n) {\n    if (n == 0) return 0;\n    return n % 10 + digitSum(n / 10);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << digitSum(n) << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c10c', title: '🎮 闯关：汉诺塔能量水晶', story: '传说星际神庙里有汉诺塔：n 个水晶盘从 A 柱搬到 C 柱，每次搬一个，大盘永远不能压在小盘上。最少步数满足 f(n) = 2×f(n-1) + 1（先把上面 n-1 个挪开，搬最大的，再挪回来），f(1)=1。用递归算出 n 个盘的最少步数！n=10 时是 1023，n=20 时超过一百万——指数增长的威力！',
    goal: '用递归定义 <code>int hanoi(int n)</code>，读入 n（1~20）输出最少步数。例如 n=3 → 7，n=10 → 1023。',
    starter: '#include <iostream>\nusing namespace std;\n\nint hanoi(int n) {\n    // 基线：n == 1 返回 1\n    // 递归：2 * hanoi(n-1) + 1\n    return 1;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << hanoi(n) << endl;\n    return 0;\n}',
    tests: [{ input: '1', expected: '1' }, { input: '3', expected: '7' }, { input: '10', expected: '1023' }, { input: '20', expected: '1048575' }],
    hints: ['if (n == 1) return 1;', 'return 2 * hanoi(n - 1) + 1;', '也可以发现公式 f(n) = 2^n - 1，但本题要求用递归'],
    solution: '#include <iostream>\nusing namespace std;\n\nint hanoi(int n) {\n    if (n == 1) return 1;\n    return 2 * hanoi(n - 1) + 1;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << hanoi(n) << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 11 章 ---------- */
CURRICULUM.push({
  id: 'c11', emoji: '🧭', title: '排序与查找', subtitle: '算法世界的第一扇门',
  intro: '数据乱糟糟怎么办？排序！找东西太慢怎么办？二分查找！本章进入真正的"算法"领域——同样的问题，聪明的方法能快成千上万倍。',
  concepts: [
    { id: 'c11k1', title: '冒泡排序', html: '<p>冒泡排序：反复扫描数组，<strong>相邻两个比较，顺序不对就交换</strong>。每扫一轮，最大的元素就像气泡一样"浮"到末尾。</p><p>n 个元素需要 n-1 轮；第 k 轮只需比到倒数第 k 个（后面已排好）。两重循环：外层管轮数，内层管相邻比较。</p><p>它不快（O(n²)），但最好懂——是理解排序的绝佳起点。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5] = {5, 3, 9, 1, 7};\n    int n = 5;\n    for (int k = 0; k < n - 1; k++) {        // n-1 轮\n        for (int i = 0; i < n - 1 - k; i++) { // 相邻比较\n            if (a[i] > a[i + 1]) {\n                int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;\n            }\n        }\n    }\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;\n    return 0;\n}',
      points: ['相邻比较，逆序就交换', '每轮把当前最大值浮到末尾', 'n 个元素 n-1 轮，内层逐轮缩短', '交换用临时变量（第 2 章的老朋友）'] },
    { id: 'c11k2', title: '线性查找 vs 二分查找', html: '<p><strong>线性查找</strong>：从头到尾逐个看，O(n)。数据无序时只能这样。</p><p><strong>二分查找</strong>：数据<strong>有序</strong>时，每次看中间：太大→去左半找，太小→去右半找。每步排除一半，O(log n)——100 万个数最多查 20 次！</p><p>维护左右边界 left、right，mid = (left+right)/2，找不到时 left > right。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5] = {1, 3, 5, 7, 9};   // 必须有序！\n    int target;\n    cin >> target;\n    int left = 0, right = 4, ans = -1;\n    while (left <= right) {\n        int mid = (left + right) / 2;\n        if (a[mid] == target) { ans = mid; break; }\n        else if (a[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    cout << ans << endl;\n    return 0;\n}',
      points: ['线性查找：逐个看，适合无序数据', '二分查找前提：数据必须有序', '每次比较中间，排除一半', 'left > right 时说明不存在'] },
    { id: 'c11k3', title: '排序的威力：第 k 小', html: '<p>很多问题"先排序就简单了"：第 k 小的数？排好序取下标 k-1！中位数？取中间！</p><p>这就是算法思维：<strong>预处理（排序）让后续查询变简单</strong>。降序排序只需把比较号反过来。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[4] = {9, 4, 7, 1};\n    int n = 4;\n    // 降序冒泡：把 > 换成 <\n    for (int k = 0; k < n - 1; k++) {\n        for (int i = 0; i < n - 1 - k; i++) {\n            if (a[i] < a[i + 1]) {\n                int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;\n            }\n        }\n    }\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;   // 9 7 4 1\n    return 0;\n}',
      points: ['先排序，很多查询变简单', '第 k 小 = 升序排序后下标 k-1', '降序：把比较号反过来', '预处理思想是算法的重要套路'] }
  ],
  feynman: { id: 'c11f', prompt: '向朋友解释：冒泡排序是怎么把数据排好序的？二分查找为什么要求数据有序？它为什么比逐个查找快得多？用查字典或猜数字游戏举例。',
    groups: [['冒泡', '相邻', '交换', '比较'], ['排序', '顺序', '升序', '降序', '排好'], ['二分', '一半', '中间', '折半', 'mid'], ['有序', '前提', '快', 'log', '排除', '查找']],
    need: 3, minLen: 25, tip: '猜 1~100 的数字，每次问"比 50 大吗？"——7 次内必中，这就是二分。' },
  tasks: [
    { id: 'c11t1', title: '冒泡升序排序', story: '把乱序的能量块编号从小到大排好。',
      goal: '读入 n（1~100）和 n 个整数，用<strong>冒泡排序</strong>升序输出（空格分隔，一行）。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    // 双重循环冒泡排序\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;\n    return 0;\n}',
      tests: [{ input: '5\n5 3 9 1 7', expected: '1 3 5 7 9' }, { input: '3\n2 2 1', expected: '1 2 2' }, { input: '1\n4', expected: '4' }, { input: '6\n-3 5 0 -8 2 1', expected: '-8 -3 0 1 2 5' }],
      hints: ['外层 k 从 0 到 n-2，内层 i 从 0 到 n-2-k', 'if (a[i] > a[i+1]) 交换', '交换三步：t=a[i]; a[i]=a[i+1]; a[i+1]=t;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int k = 0; k < n - 1; k++) {\n        for (int i = 0; i < n - 1 - k; i++) {\n            if (a[i] > a[i + 1]) {\n                int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;\n            }\n        }\n    }\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c11t2', title: '二分雷达', story: '在有序星表里用二分查找定位目标星星。',
      goal: '读入 n，再读入 n 个<strong>升序</strong>整数，再读目标 target。用二分查找输出下标（从 0 开始），不存在输出 <code>-1</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int target;\n    cin >> target;\n    int left = 0, right = n - 1, ans = -1;\n    // while (left <= right) 二分\n    cout << ans << endl;\n    return 0;\n}',
      tests: [{ input: '5\n1 3 5 7 9\n7', expected: '3' }, { input: '5\n1 3 5 7 9\n4', expected: '-1' }, { input: '1\n8\n8', expected: '0' }, { input: '6\n2 4 6 8 10 12\n2', expected: '0' }, { input: '6\n2 4 6 8 10 12\n12', expected: '5' }],
      hints: ['mid = (left + right) / 2', 'a[mid] == target → 记录并 break；小了 left = mid+1；大了 right = mid-1', '循环条件 left <= right（等号别漏）'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int target;\n    cin >> target;\n    int left = 0, right = n - 1, ans = -1;\n    while (left <= right) {\n        int mid = (left + right) / 2;\n        if (a[mid] == target) { ans = mid; break; }\n        else if (a[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    cout << ans << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c11t3', title: '第 k 小的宝石', story: '宝石按价值排序后，找出第 k 便宜的那颗。',
      goal: '读入 n 和 n 个整数，再读 k（1~n），输出<strong>第 k 小</strong>的数。例如 9 4 7 1 3，k=2 → 3。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int k;\n    cin >> k;\n    // 先排序，再取 a[k-1]\n    return 0;\n}',
      tests: [{ input: '5\n9 4 7 1 3\n2', expected: '3' }, { input: '4\n5 5 1 2\n3', expected: '5' }, { input: '3\n10 20 30\n1', expected: '10' }, { input: '3\n10 20 30\n3', expected: '30' }],
      hints: ['升序排序后，第 k 小就是 a[k-1]', '注意下标从 0 开始，第 k 个是 k-1', '重复元素也算数：5 5 1 2 排序后 1 2 5 5，第 3 小是 5'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int k;\n    cin >> k;\n    for (int p = 0; p < n - 1; p++) {\n        for (int i = 0; i < n - 1 - p; i++) {\n            if (a[i] > a[i + 1]) {\n                int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;\n            }\n        }\n    }\n    cout << a[k - 1] << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c11c', title: '🎮 闯关：星际成绩排行榜', story: '期末成绩出炉！先把 n 个分数从高到低排好输出，然后转学生小星的分数 x 来了——不重新排序，你能算出 TA 排第几名吗？（名次 = 比 x 高的分数个数 + 1，并列同名次）',
    goal: '读入 n 和 n 个分数，<strong>降序</strong>输出（一行，空格分隔）；再读入 x，输出 x 的名次（一行）。例如 5 个分数 88 95 76 92 81，x=90 → 第一行 <code>95 92 88 81 76</code>，第二行 <code>3</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    // 降序冒泡（比较号反过来）\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;\n    int x;\n    cin >> x;\n    // 数一数有几个分数 > x\n    return 0;\n}',
    tests: [{ input: '5\n88 95 76 92 81\n90', expected: '95 92 88 81 76\n3' }, { input: '3\n70 70 70\n70', expected: '70 70 70\n1' }, { input: '4\n10 20 30 40\n50', expected: '40 30 20 10\n1' }, { input: '4\n10 20 30 40\n5', expected: '40 30 20 10\n5' }],
    hints: ['降序：if (a[i] < a[i+1]) 交换', '名次 = 严格大于 x 的个数 + 1', '遍历数组数 > x 的个数即可，不必再排序'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int k = 0; k < n - 1; k++) {\n        for (int i = 0; i < n - 1 - k; i++) {\n            if (a[i] < a[i + 1]) {\n                int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;\n            }\n        }\n    }\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;\n    int x;\n    cin >> x;\n    int rank = 1;\n    for (int i = 0; i < n; i++) {\n        if (a[i] > x) rank++;\n    }\n    cout << rank << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 12 章 ---------- */
CURRICULUM.push({
  id: 'c12', emoji: '🗂️', title: '结构体档案', subtitle: '把相关数据打包成一个整体',
  intro: '一颗星星有名字、亮度、坐标……用三个散变量管理太容易乱了。struct 把相关数据打包成"档案袋"——这是通往面向对象的第一级台阶。',
  concepts: [
    { id: 'c12k1', title: 'struct：自定义类型', html: '<p><code>struct Star { string name; int brightness; };</code> 定义了新类型 Star，每颗星星是一个整体，里面有两个<strong>成员</strong>。</p><p>用 <code>.</code> 访问成员：<code>s.name</code>、<code>s.brightness</code>。struct 的成员默认都是公开的（public）。</p><p>注意定义末尾的分号！这是 struct 特有的要求。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Star {\n    string name;\n    int brightness;\n};\n\nint main() {\n    Star s;\n    s.name = "天狼星";\n    s.brightness = 9;\n    cout << s.name << " 亮度 " << s.brightness << endl;\n    return 0;\n}',
      points: ['struct 把相关数据打包成新类型', '成员用 . 访问：s.name', 'struct 成员默认 public', '定义末尾别忘分号 };'] },
    { id: 'c12k2', title: '结构体数组：一批档案', html: '<p><code>Star team[3];</code> 是 3 份档案。配合循环批量处理：读入、比较、找最强……</p><p>结构体可以整体赋值：<code>a = b;</code> 会把所有成员复制过去（本网站按值复制，和 C++ 一致）。</p><p>"找最强战士"就是打擂台，只是比较的是成员的某个字段。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Warrior {\n    string name;\n    int power;\n};\n\nint main() {\n    Warrior team[3];\n    for (int i = 0; i < 3; i++) {\n        cin >> team[i].name >> team[i].power;\n    }\n    int best = 0;\n    for (int i = 1; i < 3; i++) {\n        if (team[i].power > team[best].power) best = i;\n    }\n    cout << team[best].name << endl;\n    return 0;\n}',
      points: ['Star arr[3] 是结构体数组', 'cin >> arr[i].name >> arr[i].power', '打擂台可以记录"最强者的下标"', '结构体整体赋值会复制所有成员'] },
    { id: 'c12k3', title: '结构体与函数', html: '<p>结构体可以作为函数参数和返回值，让"档案"在函数间传递。</p><p>曼哈顿距离：两点在网格上沿横竖走的最短路程 = |x1-x2| + |y1-y2|，用 abs 求绝对值。把 Point 传进函数，代码意图一目了然。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint manhattan(Point a, Point b) {\n    return abs(a.x - b.x) + abs(a.y - b.y);\n}\n\nint main() {\n    Point p, q;\n    cin >> p.x >> p.y >> q.x >> q.y;\n    cout << manhattan(p, q) << endl;\n    return 0;\n}',
      points: ['结构体可以当参数/返回值', 'abs() 求绝对值', '曼哈顿距离 = |dx| + |dy|', '传档案比传一堆散变量清晰'] }
  ],
  feynman: { id: 'c12f', prompt: '向朋友解释：为什么需要 struct？它和"一堆散变量"比有什么好处？怎么访问结构体的成员？结构体数组能用来做什么？',
    groups: [['struct', '结构体', '打包', '组合', '整体'], ['成员', '字段', '属性', '.', '里面'], ['不同类型', '多种', '名字', '相关', '一起'], ['数组', '一批', '多个', '批量']],
    need: 3, minLen: 20, tip: '想想学生档案袋：姓名、年龄、成绩装在一起，比三张散纸条好管理。' },
  tasks: [
    { id: 'c12t1', title: '星星档案', story: '为观测到的星星建立档案并播报。',
      goal: '定义 <code>struct Star { string name; int brightness; };</code>。读入名字和亮度，输出 <code>星星xxx的亮度是yyy</code>。例如 <code>天狼 9</code> → <code>星星天狼的亮度是9</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nstruct Star {\n    // 在这里写两个成员：string 名字 name; int 亮度 brightness;\n};\n\nint main() {\n    Star s;\n    cin >> s.name >> s.brightness;\n    // 按格式输出\n    return 0;\n}',
      tests: [{ input: '天狼 9', expected: '星星天狼的亮度是9' }, { input: '北极星 5', expected: '星星北极星的亮度是5' }, { input: '织女 7', expected: '星星织女的亮度是7' }],
      hints: ['struct Star { string name; int brightness; }; 写在 main 外面', 'cin >> s.name >> s.brightness;', 'cout << "星星" << s.name << "的亮度是" << s.brightness << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nstruct Star {\n    string name;\n    int brightness;\n};\n\nint main() {\n    Star s;\n    cin >> s.name >> s.brightness;\n    cout << "星星" << s.name << "的亮度是" << s.brightness << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c12t2', title: '网格导航员', story: '飞船在网格城市里只能横平竖直地飞，算出两点间的飞行距离。',
      goal: '定义 <code>struct Point { int x; int y; };</code>，读入两个点的坐标（x1 y1 x2 y2），输出曼哈顿距离 <code>|x1-x2| + |y1-y2|</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    Point p, q;\n    cin >> p.x >> p.y >> q.x >> q.y;\n    // 用 abs 计算曼哈顿距离\n    return 0;\n}',
      tests: [{ input: '1 2 4 6', expected: '7' }, { input: '0 0 -3 -4', expected: '7' }, { input: '2 3 2 3', expected: '0' }, { input: '-1 -1 1 1', expected: '4' }],
      hints: ['abs(p.x - q.x) 求横向距离', 'abs(p.y - q.y) 求纵向距离', '两者相加就是曼哈顿距离'],
      solution: '#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    Point p, q;\n    cin >> p.x >> p.y >> q.x >> q.y;\n    cout << abs(p.x - q.x) + abs(p.y - q.y) << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c12t3', title: '最强战士选拔', story: '三位战士报名星际护卫队，选出战斗力最强的。',
      goal: '定义 <code>struct Warrior { string name; int power; };</code>，读入 3 组名字和战斗力，输出最强者的名字（并列取先输入的）。',
      starter: '#include <iostream>\nusing namespace std;\n\nstruct Warrior {\n    string name;\n    int power;\n};\n\nint main() {\n    Warrior team[3];\n    for (int i = 0; i < 3; i++) {\n        cin >> team[i].name >> team[i].power;\n    }\n    // 打擂台：记录最强者的下标\n    return 0;\n}',
      tests: [{ input: '小星 10 小月 25 小岩 18', expected: '小月' }, { input: 'A 5 B 5 C 3', expected: 'A' }, { input: '甲 1 乙 2 丙 3', expected: '丙' }],
      hints: ['int best = 0; 先假设 0 号最强', 'if (team[i].power > team[best].power) best = i;', '严格大于才换擂主，并列时保留先输入的'],
      solution: '#include <iostream>\nusing namespace std;\n\nstruct Warrior {\n    string name;\n    int power;\n};\n\nint main() {\n    Warrior team[3];\n    for (int i = 0; i < 3; i++) {\n        cin >> team[i].name >> team[i].power;\n    }\n    int best = 0;\n    for (int i = 1; i < 3; i++) {\n        if (team[i].power > team[best].power) best = i;\n    }\n    cout << team[best].name << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c12c', title: '🎮 闯关：飞船货舱管理员', story: '货舱限重 W！货物按到达顺序装船：装得下就装（累加重量），装不下就跳过看下一件。用结构体管理每件货物的名字和重量，最后报告装了几件、总重多少。贪心策略：不回头、不重排！',
    goal: '读入 n（1~50），再读入 n 行货物（名字 重量），再读限重 W。按输入顺序贪心装载，输出 <code>件数 总重量</code>。例如货物 苹果5 铁块20 水8，W=15 → 装苹果和水，输出 <code>2 13</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nstruct Cargo {\n    string name;\n    int weight;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Cargo items[50];\n    for (int i = 0; i < n; i++) {\n        cin >> items[i].name >> items[i].weight;\n    }\n    int W;\n    cin >> W;\n    int count = 0, total = 0;\n    // 按顺序尝试装载：total + weight <= W 就装\n    cout << count << " " << total << endl;\n    return 0;\n}',
    tests: [{ input: '3\n苹果 5\n铁块 20\n水 8\n15', expected: '2 13' }, { input: '2\nA 10\nB 10\n5', expected: '0 0' }, { input: '4\na 3\nb 4\nc 5\nd 6\n12', expected: '3 12' }, { input: '1\n重锤 100\n100', expected: '1 100' }],
    hints: ['遍历每件货物，判断 total + items[i].weight <= W', '装得下：count++; total += weight;', '装不下直接跳过，继续看下一件（不是 break！）'],
    solution: '#include <iostream>\nusing namespace std;\n\nstruct Cargo {\n    string name;\n    int weight;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Cargo items[50];\n    for (int i = 0; i < n; i++) {\n        cin >> items[i].name >> items[i].weight;\n    }\n    int W;\n    cin >> W;\n    int count = 0, total = 0;\n    for (int i = 0; i < n; i++) {\n        if (total + items[i].weight <= W) {\n            count++;\n            total += items[i].weight;\n        }\n    }\n    cout << count << " " << total << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 13 章 ---------- */
CURRICULUM.push({
  id: 'c13', emoji: '🏰', title: '类与对象', subtitle: '封装：数据与行为的城堡',
  intro: 'struct 的档案谁都能翻改，太不安全！class 给数据筑起城墙：private 成员藏在城里，public 方法是城门——外界只能通过城门与数据打交道。这就是面向对象的核心：封装。',
  concepts: [
    { id: 'c13k1', title: 'class 与 public / private', html: '<p><code>class</code> 和 struct 很像，但成员<strong>默认 private</strong>（私有）：类外不能直接访问。</p><p><code>public:</code> 之后的成员公开；<code>private:</code> 之后的成员私有。把数据设成 private、把操作设成 public，外界就无法乱改数据——比如余额不能被直接改成负数！</p><p>这叫<strong>封装</strong>：隐藏细节，暴露安全的接口。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nclass Counter {\nprivate:\n    int count;          // 私有：外面碰不到\npublic:\n    void add() {        // 公开：安全的操作入口\n        count++;\n    }\n    int get() {\n        return count;\n    }\n};\n\nint main() {\n    Counter c;\n    c.add();\n    c.add();\n    cout << c.get() << endl;   // 2\n    // c.count = 999;  // 错误！私有成员\n    return 0;\n}',
      points: ['class 成员默认 private', 'public: / private: 切换访问权限', '数据私有 + 方法公开 = 封装', '类外访问私有成员会报错'] },
    { id: 'c13k2', title: '构造函数：出生仪式', html: '<p><strong>构造函数</strong>是与类同名、无返回类型的特殊方法，创建对象时自动执行，负责初始化。</p><p><code>Account a(100);</code> 创建对象并调用构造函数，把余额设为 100。不写构造函数时，成员自动取默认值（int 为 0）。</p><p>方法内部可以直接使用成员名（如 balance），因为方法"住在城里"，私有成员对它可见。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nclass Rect {\nprivate:\n    int w, h;\npublic:\n    Rect(int width, int height) {  // 构造函数\n        w = width;\n        h = height;\n    }\n    int area() { return w * h; }\n    int perimeter() { return 2 * (w + h); }\n};\n\nint main() {\n    Rect r(3, 4);\n    cout << r.area() << " " << r.perimeter() << endl;  // 12 14\n    return 0;\n}',
      points: ['构造函数与类同名、无返回类型', '创建对象时自动调用', 'Rect r(3, 4) 传参给构造函数', '方法内可直接访问私有成员'] },
    { id: 'c13k3', title: '对象的行为与状态', html: '<p>对象 = <strong>状态</strong>（成员变量）+ <strong>行为</strong>（方法）。方法可以改变状态：宠物玩耍掉能量、吃饭回能量。</p><p>方法还能返回 bool 表示操作成败：取钱时余额不足就返回 false 且不扣钱——把"规则"关在类里，使用者永远不会破坏规则。这是封装的威力！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nclass Pet {\nprivate:\n    string name;\n    int energy;\npublic:\n    Pet(string n) {\n        name = n;\n        energy = 50;\n    }\n    void play() { energy -= 10; }\n    void eat() { energy += 20; }\n    int getEnergy() { return energy; }\n};\n\nint main() {\n    Pet p("皮皮");\n    p.play();\n    p.eat();\n    cout << p.getEnergy() << endl;   // 60\n    return 0;\n}',
      points: ['对象 = 状态 + 行为', '方法可以修改成员变量', 'bool 返回值表示操作成败', '规则封装在类里，外界无法破坏'] }
  ],
  feynman: { id: 'c13f', prompt: '向朋友解释：class 和 struct 最大的区别是什么？为什么要用 private 把数据藏起来（封装）？构造函数什么时候执行、有什么用？举一个"只能通过按钮操作、不能直接拆机器"的例子。',
    groups: [['class', '类', '对象'], ['private', 'public', '私有', '公开', '封装', '保护', '藏'], ['方法', '函数', '行为', '操作', '按钮'], ['构造', '初始化', '创建', '同名', '自动']],
    need: 3, minLen: 25, tip: '自动售货机：钱箱是 private，投币口和按钮是 public——你不能直接伸手拿钱箱。' },
  tasks: [
    { id: 'c13t1', title: '安全计数器', story: '造一个只能按按钮加 1 的计数器，谁也不能直接改数字。',
      goal: '定义 <code>class Counter</code>：私有成员 count（初始 0），公开方法 <code>void add()</code>（加 1）和 <code>int get()</code>。main 读入 n，调用 n 次 add，输出 get()。',
      starter: '#include <iostream>\nusing namespace std;\n\nclass Counter {\nprivate:\n    int count;\npublic:\n    Counter() { count = 0; }\n    // 写 add() 和 get()\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Counter c;\n    for (int i = 0; i < n; i++) c.add();\n    cout << c.get() << endl;\n    return 0;\n}',
      tests: [{ input: '5', expected: '5' }, { input: '0', expected: '0' }, { input: '100', expected: '100' }],
      hints: ['void add() { count++; }', 'int get() { return count; }', '方法写在 public: 之后'],
      solution: '#include <iostream>\nusing namespace std;\n\nclass Counter {\nprivate:\n    int count;\npublic:\n    Counter() { count = 0; }\n    void add() { count++; }\n    int get() { return count; }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Counter c;\n    for (int i = 0; i < n; i++) c.add();\n    cout << c.get() << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c13t2', title: '矩形建筑师', story: '用类管理矩形：宽高私有，面积周长通过方法计算。',
      goal: '定义 <code>class Rect</code>：私有 w、h；构造函数 Rect(int, int)；方法 <code>int area()</code> 和 <code>int perimeter()</code>。读入 w h，输出 <code>面积 周长</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nclass Rect {\nprivate:\n    int w, h;\npublic:\n    // 构造函数 + area() + perimeter()\n};\n\nint main() {\n    int w, h;\n    cin >> w >> h;\n    Rect r(w, h);\n    cout << r.area() << " " << r.perimeter() << endl;\n    return 0;\n}',
      tests: [{ input: '3 4', expected: '12 14' }, { input: '5 5', expected: '25 20' }, { input: '1 10', expected: '10 22' }],
      hints: ['Rect(int width, int height) { w = width; h = height; }', 'area 返回 w*h', 'perimeter 返回 2*(w+h)'],
      solution: '#include <iostream>\nusing namespace std;\n\nclass Rect {\nprivate:\n    int w, h;\npublic:\n    Rect(int width, int height) {\n        w = width;\n        h = height;\n    }\n    int area() { return w * h; }\n    int perimeter() { return 2 * (w + h); }\n};\n\nint main() {\n    int w, h;\n    cin >> w >> h;\n    Rect r(w, h);\n    cout << r.area() << " " << r.perimeter() << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c13t3', title: '电子宠物', story: '养一只电子宠物：玩耍耗能量，吃饭补能量。',
      goal: '定义 <code>class Pet</code>：私有 name、energy；构造函数 Pet(string n) 设 energy=50；方法 <code>void play()</code>（-10）、<code>void eat()</code>（+20）、<code>int getEnergy()</code>。读入名字和操作数 m，再读 m 个操作（1=玩 2=吃），输出最终能量。',
      starter: '#include <iostream>\nusing namespace std;\n\nclass Pet {\nprivate:\n    string name;\n    int energy;\npublic:\n    // 构造函数 + play + eat + getEnergy\n};\n\nint main() {\n    string name;\n    int m;\n    cin >> name >> m;\n    Pet p(name);\n    for (int i = 0; i < m; i++) {\n        int op;\n        cin >> op;\n        if (op == 1) p.play();\n        else p.eat();\n    }\n    cout << p.getEnergy() << endl;\n    return 0;\n}',
      tests: [{ input: '皮皮 3\n1 2 1', expected: '50' }, { input: '豆豆 2\n2 2', expected: '90' }, { input: '球球 4\n1 1 1 1', expected: '10' }, { input: '小灰 0', expected: '50' }],
      hints: ['Pet(string n) { name = n; energy = 50; }', 'play: energy -= 10; eat: energy += 20;', 'getEnergy 返回 energy'],
      solution: '#include <iostream>\nusing namespace std;\n\nclass Pet {\nprivate:\n    string name;\n    int energy;\npublic:\n    Pet(string n) {\n        name = n;\n        energy = 50;\n    }\n    void play() { energy -= 10; }\n    void eat() { energy += 20; }\n    int getEnergy() { return energy; }\n};\n\nint main() {\n    string name;\n    int m;\n    cin >> name >> m;\n    Pet p(name);\n    for (int i = 0; i < m; i++) {\n        int op;\n        cin >> op;\n        if (op == 1) p.play();\n        else p.eat();\n    }\n    cout << p.getEnergy() << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c13c', title: '🎮 闯关：星际银行账户', story: '设计一个防篡改的银行账户！余额必须私有，外界只能存钱、取钱。取款时余额不足要拒绝（返回 false 且不扣钱），并播报"余额不足"。最后报告余额。试试在类外直接改余额——解释器会无情拒绝你，这就是封装！',
    goal: '定义 <code>class Account</code>：私有 balance；构造函数 Account(int b)；方法 <code>void deposit(int x)</code>、<code>bool withdraw(int x)</code>（余额不足返回 false 不扣钱）、<code>int get()</code>。读入初始余额和操作数 m，再读 m 条操作（<code>1 x</code> 存 / <code>2 x</code> 取）。取款失败输出一行 <code>余额不足</code>；最后输出一行余额。',
    starter: '#include <iostream>\nusing namespace std;\n\nclass Account {\nprivate:\n    int balance;\npublic:\n    // 构造函数 + deposit + withdraw + get\n};\n\nint main() {\n    int b, m;\n    cin >> b >> m;\n    Account acc(b);\n    for (int i = 0; i < m; i++) {\n        int op, x;\n        cin >> op >> x;\n        if (op == 1) {\n            acc.deposit(x);\n        } else {\n            if (!acc.withdraw(x)) cout << "余额不足" << endl;\n        }\n    }\n    cout << acc.get() << endl;\n    return 0;\n}',
    tests: [{ input: '100 3\n2 200\n1 50\n2 100', expected: '余额不足\n50' }, { input: '50 2\n2 50\n2 1', expected: '余额不足\n0' }, { input: '0 1\n1 30', expected: '30' }, { input: '10 4\n2 5\n2 5\n2 1\n1 7', expected: '余额不足\n7' }],
    hints: ['withdraw: if (x > balance) return false; 否则 balance -= x; return true;', '先判断再扣钱，顺序不能反', 'deposit: balance += x; get: return balance;'],
    solution: '#include <iostream>\nusing namespace std;\n\nclass Account {\nprivate:\n    int balance;\npublic:\n    Account(int b) { balance = b; }\n    void deposit(int x) { balance += x; }\n    bool withdraw(int x) {\n        if (x > balance) return false;\n        balance -= x;\n        return true;\n    }\n    int get() { return balance; }\n};\n\nint main() {\n    int b, m;\n    cin >> b >> m;\n    Account acc(b);\n    for (int i = 0; i < m; i++) {\n        int op, x;\n        cin >> op >> x;\n        if (op == 1) {\n            acc.deposit(x);\n        } else {\n            if (!acc.withdraw(x)) cout << "余额不足" << endl;\n        }\n    }\n    cout << acc.get() << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 14 章 ---------- */
CURRICULUM.push({
  id: 'c14', emoji: '🧰', title: '引用与向量', subtitle: '现代 C++ 工具箱 · 毕业季',
  intro: '最后一章！引用让函数能真正修改外部变量，vector 是会自己长大的数组——它们是 C++ 标准库（STL）的入门钥匙。完成毕业挑战，你就是合格的星际程序员了！',
  concepts: [
    { id: 'c14k1', title: '引用：变量的别名', html: '<p>普通参数是<strong>复印件</strong>：函数里改参数，外面的原变量不动。想真正修改原变量？用<strong>引用</strong> <code>&amp;</code>——参数的别名，指向同一个盒子。</p><p><code>void swap2(int &amp;a, int &amp;b)</code> 里交换 a、b，外面的变量真的交换了！引用定义时必须绑定：<code>int &amp;r = x;</code> 之后 r 就是 x 的另一个名字。</p><p>内置的 <code>swap(x, y)</code> 就是用引用实现的。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nvoid swap2(int &a, int &b) {\n    int t = a;\n    a = b;\n    b = t;\n}\n\nint main() {\n    int x = 3, y = 5;\n    swap2(x, y);\n    cout << x << " " << y << endl;   // 5 3\n    int &r = x;   // r 是 x 的别名\n    r = 100;\n    cout << x << endl;               // 100\n    return 0;\n}',
      points: ['普通参数是复印件，引用是本体', '类型后加 & 声明引用参数', '引用让函数能修改外部变量', '引用定义时必须绑定一个变量'] },
    { id: 'c14k2', title: 'vector：会长大的数组', html: '<p>普通数组长度固定，vector 是<strong>动态数组</strong>：随时 <code>push_back(x)</code> 追加元素，<code>size()</code> 查当前长度。</p><p><code>vector&lt;int&gt; v;</code> 定义空向量；<code>v[i]</code> 像数组一样访问；还有 <code>pop_back()</code> 删末尾、<code>empty()</code> 判空、<code>back()</code> 取末尾。</p><p>不知道数据有多少？用 vector 边读边装，再也不用猜数组开多大！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    int x;\n    while (true) {\n        cin >> x;\n        if (x == -1) break;\n        v.push_back(x);      // 追加\n    }\n    cout << v.size() << endl;      // 个数\n    int sum = 0;\n    for (int i = 0; i < (int)v.size(); i++) {\n        sum += v[i];\n    }\n    cout << sum << endl;\n    return 0;\n}',
      points: ['vector<int> v 定义动态数组', 'push_back 追加，size() 查长度', 'v[i] 下标访问，和数组一样', '长度自动增长，不用预先猜测'] },
    { id: 'c14k3', title: '范围 for 与 STL 之门', html: '<p><strong>范围 for</strong> 是遍历容器的现代写法：<code>for (int x : v)</code> 逐个取出元素，不用写下标，更简洁更安全。加 <code>&amp;</code> 还能修改原元素：<code>for (int &amp;x : v) x *= 2;</code></p><p>vector 只是 STL（标准模板库）的冰山一角：还有 sort 排序、map 映射、queue 队列……你已经掌握了自学它们的钥匙：<strong>查文档 → 写小例子 → 讲给别人听</strong>。费曼学习法会一直陪着你！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    for (int x : v) {          // 范围 for\n        cout << x << " ";\n    }\n    cout << endl;\n    for (int &x : v) {         // 引用遍历：修改原元素\n        x = x * 2;\n    }\n    cout << v[0] << " " << v[4] << endl;  // 2 10\n    return 0;\n}',
      points: ['for (int x : v) 逐个取出元素', 'for (int &x : v) 可修改原元素', 'vector 是 STL 的入门容器', '进阶：sort、map、queue、算法竞赛…'] }
  ],
  feynman: { id: 'c14f', prompt: '向朋友解释：引用参数和普通参数有什么不同？为什么交换函数需要引用？vector 比普通数组强在哪里？范围 for 怎么写、有什么好处？',
    groups: [['引用', '&', '别名', '本体', '同一个'], ['swap', '交换', '修改', '外面'], ['vector', '动态', '长大', 'push_back', '追加'], ['范围', 'for', '遍历', '简洁', '自动']],
    need: 3, minLen: 25, tip: '复印件 vs 原件：普通参数是复印件，引用是把原件直接递给函数。' },
  tasks: [
    { id: 'c14t1', title: '真正的交换', story: '不用内置 swap，自己写一个能真正交换外部变量的函数。',
      goal: '定义 <code>void swap2(int &a, int &b)</code>（必须用引用）。读入 x y，调用 swap2 后输出 <code>x y</code>。例如 3 5 → <code>5 3</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nvoid swap2(int &a, int &b) {\n    // 三步交换\n}\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    swap2(x, y);\n    cout << x << " " << y << endl;\n    return 0;\n}',
      tests: [{ input: '3 5', expected: '5 3' }, { input: '-1 1', expected: '1 -1' }, { input: '7 7', expected: '7 7' }],
      hints: ['参数类型是 int &a（引用）', '函数体：int t = a; a = b; b = t;', '去掉 & 就只是交换复印件，外面不会变'],
      solution: '#include <iostream>\nusing namespace std;\n\nvoid swap2(int &a, int &b) {\n    int t = a;\n    a = b;\n    b = t;\n}\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    swap2(x, y);\n    cout << x << " " << y << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c14t2', title: '无底洞仓库', story: '传感器读数不知道有多少个，用 vector 边读边装，直到 -1。',
      goal: '不断读入整数直到 <code>-1</code>（-1 不计入），用 <code>vector&lt;int&gt;</code> 存储，输出 <code>个数 总和</code>。例如 3 5 7 -1 → <code>3 15</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    // while(true) 读入，-1 就 break，否则 push_back\n    cout << v.size() << " ";\n    int sum = 0;\n    for (int i = 0; i < (int)v.size(); i++) sum += v[i];\n    cout << sum << endl;\n    return 0;\n}',
      tests: [{ input: '3 5 7 -1', expected: '3 15' }, { input: '-1', expected: '0 0' }, { input: '10 -2 -1', expected: '2 8' }],
      hints: ['cin >> x; if (x == -1) break;', 'v.push_back(x);', 'v.size() 就是个数'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    int x;\n    while (true) {\n        cin >> x;\n        if (x == -1) break;\n        v.push_back(x);\n    }\n    cout << v.size() << " ";\n    int sum = 0;\n    for (int i = 0; i < (int)v.size(); i++) sum += v[i];\n    cout << sum << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c14t3', title: '奇数过滤器', story: '把一批数里的奇数挑出来，装进新 vector。',
      goal: '读入 n 和 n 个整数，把所有<strong>奇数</strong>按原顺序输出（空格分隔，一行）。用 vector + 范围 for。没有奇数就输出空行。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        v.push_back(x);\n    }\n    vector<int> odds;\n    // 用范围 for 遍历 v，奇数放进 odds\n    for (int x : odds) cout << x << " ";\n    cout << endl;\n    return 0;\n}',
      tests: [{ input: '5\n1 2 3 4 5', expected: '1 3 5' }, { input: '3\n2 4 6', expected: '' }, { input: '4\n7 7 2 9', expected: '7 7 9' }, { input: '3\n-3 -2 -1', expected: '-3 -1' }],
      hints: ['for (int x : v) 遍历', '奇数判断：x % 2 != 0（负奇数 % 2 是 -1，不是 1！）', 'odds.push_back(x);'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        v.push_back(x);\n    }\n    vector<int> odds;\n    for (int x : v) {\n        if (x % 2 != 0) odds.push_back(x);\n    }\n    for (int x : odds) cout << x << " ";\n    cout << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c14c', title: '🎮 毕业大闯关：星际仓库查询系统', story: '毕业考核！管理一个动态仓库：先入库 n 件货物（重量），然后处理若干查询（直到 -1）：每个查询 x 问"比 x 重的货物有几件？"。要求：必须写一个函数 countHeavier(vector<int> v, int x) 来完成统计，main 只负责输入输出。综合运用 vector、循环、条件、函数——这就是真正的程序！',
    goal: '读入 n 和 n 个重量存入 vector；再不断读入查询 x 直到 -1，每个查询输出一行：仓库中<strong>严格大于</strong> x 的货物件数。例如重量 10 20 30 40 50，查询 25 → 3（30/40/50）。',
    starter: '#include <iostream>\nusing namespace std;\n\nint countHeavier(vector<int> v, int x) {\n    int count = 0;\n    // 遍历 v，统计 > x 的个数（试试范围 for）\n    return count;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> weights;\n    for (int i = 0; i < n; i++) {\n        int w;\n        cin >> w;\n        weights.push_back(w);\n    }\n    // 不断读查询直到 -1，每个输出一行\n    return 0;\n}',
    tests: [{ input: '5\n10 20 30 40 50\n25 -1', expected: '3' }, { input: '3\n5 5 5\n5 -1', expected: '0' }, { input: '4\n1 2 3 4\n0 3 -1', expected: '4\n1' }, { input: '2\n100 1\n50 100 -1', expected: '1\n0' }],
    hints: ['countHeavier 里用 for (int w : v) if (w > x) count++;', 'main 里 while(true) 读 x，-1 就 break', '每个查询 cout << countHeavier(weights, x) << endl;'],
    solution: '#include <iostream>\nusing namespace std;\n\nint countHeavier(vector<int> v, int x) {\n    int count = 0;\n    for (int w : v) {\n        if (w > x) count++;\n    }\n    return count;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> weights;\n    for (int i = 0; i < n; i++) {\n        int w;\n        cin >> w;\n        weights.push_back(w);\n    }\n    int x;\n    while (true) {\n        cin >> x;\n        if (x == -1) break;\n        cout << countHeavier(weights, x) << endl;\n    }\n    return 0;\n}', xp: 50 }
});


/* ---------- 第 15 章 ---------- */
CURRICULUM.push({
  id: 'c15', emoji: '🧭', title: '指针罗盘', subtitle: '地址、解引用与内存导航',
  intro: '变量住在内存里，每个变量都有一个"门牌号"——地址。指针就是存地址的罗盘：拿着它，你能找到并修改任何变量，还能在数组里自由行走。这是 C++ 最强大也最需要小心的工具！',
  concepts: [
    { id: 'c15k1', title: '& 取地址，* 解引用', html: '<p>内存像一排储物柜，每个柜子有编号（<strong>地址</strong>）。<code>&amp;x</code> 取出变量 x 的地址；<code>int *p = &amp;x;</code> 让指针 p 记住这个地址。</p><p><code>*p</code>（<strong>解引用</strong>）= "顺着地址找到柜子里的东西"。所以 <code>*p = 99;</code> 会真的改掉 x！</p><p>记住口诀：<strong>&amp; 是"问地址"，* 是"按地址取货"</strong>。声明里的 * 表示"这是个指针"，表达式里的 * 表示"解引用"。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 5;\n    int *p = &x;      // p 记住 x 的地址\n    cout << *p << endl;   // 5（顺地址取货）\n    *p = 99;          // 通过指针修改 x\n    cout << x << endl;    // 99\n    return 0;\n}',
      points: ['&x 取变量地址，int *p 定义指针', '*p 解引用：访问指针指向的值', '*p = 值 会修改原变量', '声明的 * 与运算的 * 含义不同'] },
    { id: 'c15k2', title: '指针参数：另一种"改原件"', html: '<p>第 14 章的引用能改原件，指针也可以：把地址传进函数，函数里用 * 修改。</p><p><code>void swap3(int *a, int *b)</code> 调用时传 <code>swap3(&amp;x, &amp;y)</code>。对比引用版：引用是"别名"，指针是"拿着地址的遥控器"——指针还能换指向、可以为空，更灵活也更危险。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nvoid swap3(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint main() {\n    int x = 3, y = 5;\n    swap3(&x, &y);    // 传地址\n    cout << x << " " << y << endl;   // 5 3\n    return 0;\n}',
      points: ['指针参数接收地址：swap3(&x, &y)', '函数内用 *a 修改原变量', '引用是别名，指针是地址遥控器', '传指针时别忘了 &'] },
    { id: 'c15k3', title: '指针与数组：行走的罗盘', html: '<p>数组名就是<strong>首元素地址</strong>：<code>int *p = a;</code> 等价于 <code>p = &amp;a[0]</code>。</p><p><code>p++</code> 让指针走到下一个元素；<code>a + i</code> 是第 i 个元素的地址；<code>*(p+i)</code> 就是 <code>a[i]</code>。从尾往前走（p--）可以逆序遍历！</p><p>⚠️ 安全绳：<code>nullptr</code> 表示"空指针"。解引用空指针或走出数组范围都会出错——用 <code>if (p != nullptr)</code> 检查，用边界控制步数。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[4] = {1, 2, 3, 4};\n    int *p = a;          // 指向首元素\n    int sum = 0;\n    for (int i = 0; i < 4; i++) {\n        sum += *p;       // 取当前元素\n        p++;             // 走向下一个\n    }\n    cout << sum << endl;     // 10\n    int *q = a + 3;      // 指向最后一个\n    cout << *q << endl;      // 4\n    return 0;\n}',
      points: ['数组名 = 首元素地址', 'p++ / p-- 在数组中行走', '*(p+i) 等价于 a[i]', 'nullptr 是空指针，解引用前先检查'] }
  ],
  feynman: { id: 'c15f', prompt: '向朋友解释：什么是变量的地址？& 和 * 各做什么？指针参数为什么能修改外面的变量？指针在数组里怎么"行走"？为什么空指针危险？',
    groups: [['地址', '门牌', '内存', '&'], ['指针', '解引用', '*', '指向'], ['数组', '首元素', 'p++', '行走', '移动'], ['nullptr', '空指针', '检查', '安全', '越界']],
    need: 3, minLen: 25, tip: '把内存想成快递柜：& 是查柜号，* 是凭柜号开柜取件。' },
  tasks: [
    { id: 'c15t1', title: '遥控翻倍器', story: '不许直接写 x = x * 2！只能通过指针遥控器把 x 翻倍。',
      goal: '读入整数 x，定义 <code>int *p = &amp;x;</code>，通过 <code>*p</code> 把 x 变成 2 倍，输出 x。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    cin >> x;\n    int *p = &x;\n    // 通过 *p 把 x 翻倍\n    cout << x << endl;\n    return 0;\n}',
      tests: [{ input: '5', expected: '10' }, { input: '-3', expected: '-6' }, { input: '0', expected: '0' }, { input: '12', expected: '24' }],
      hints: ['*p 就是 x 本人（的遥控器）', '*p = *p * 2;', '输出 x 或 *p 都一样'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    cin >> x;\n    int *p = &x;\n    *p = *p * 2;\n    cout << x << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c15t2', title: '指针交换术', story: '第 2 章用临时变量交换、第 14 章用引用交换，这次用指针！',
      goal: '定义 <code>void swap3(int *a, int *b)</code> 用解引用交换。main 读入 x y，调用 <code>swap3(&amp;x, &amp;y)</code> 后输出 <code>x y</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nvoid swap3(int *a, int *b) {\n    // 用 *a、*b 三步交换\n}\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    swap3(&x, &y);\n    cout << x << " " << y << endl;\n    return 0;\n}',
      tests: [{ input: '3 5', expected: '5 3' }, { input: '-1 1', expected: '1 -1' }, { input: '7 7', expected: '7 7' }],
      hints: ['int t = *a; 先取出 a 指向的值', '*a = *b; *b = t;', '调用时传 &x、&y（地址）'],
      solution: '#include <iostream>\nusing namespace std;\n\nvoid swap3(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    swap3(&x, &y);\n    cout << x << " " << y << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c15t3', title: '罗盘巡宝', story: '不用下标 a[i]！让指针在数组里行走，累加所有宝藏。',
      goal: '读入 n 和 n 个整数存入数组，用指针 <code>p</code> 从首元素走到尾（p++），累加 <code>*p</code>，输出总和。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int *p = a;\n    int sum = 0;\n    // 走 n 步：sum += *p; p++;\n    cout << sum << endl;\n    return 0;\n}',
      tests: [{ input: '4\n1 2 3 4', expected: '10' }, { input: '3\n-5 5 10', expected: '10' }, { input: '1\n42', expected: '42' }],
      hints: ['int *p = a; 数组名就是首地址', '循环 n 次：sum += *p; p++;', '也可以用 while (p < a + n) 作为条件'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int *p = a;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        sum += *p;\n        p++;\n    }\n    cout << sum << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c15c', title: '🎮 闯关：倒读藏宝图', story: '海盗的藏宝图要倒着读！把 n 个坐标存进数组，然后让指针站在最后一个元素（a + n - 1），一步步往回走（p--），逆序输出所有坐标。不许用下标逆序循环，必须用指针行走！',
    goal: '读入 n 和 n 个整数，用指针从尾到头逆序输出（空格分隔，一行）。例如 <code>1 2 3 4 5</code> → <code>5 4 3 2 1</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int *p = a + n - 1;   // 站在最后一个\n    // 走 n 步：输出 *p，然后 p--\n    cout << endl;\n    return 0;\n}',
    tests: [{ input: '5\n1 2 3 4 5', expected: '5 4 3 2 1' }, { input: '3\n9 8 7', expected: '7 8 9' }, { input: '1\n6', expected: '6' }],
    hints: ['起点 p = a + n - 1（最后一个元素的地址）', '循环 n 次：cout << *p << " "; p--;', 'a + n - 1 先算 a+n 再减 1，指针算术支持'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int *p = a + n - 1;\n    for (int i = 0; i < n; i++) {\n        cout << *p << " ";\n        p--;\n    }\n    cout << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 第 16 章 ---------- */
CURRICULUM.push({
  id: 'c16', emoji: '⚔️', title: 'STL 军火库', subtitle: 'sort / reverse / binary_search',
  intro: '第 11 章你亲手写了冒泡排序和二分查找。现在领取标准库的"制式武器"：一行 sort 顶替双重循环，而且快得多（O(n log n)）。学会站在巨人的肩膀上，是专业程序员的第一步。',
  concepts: [
    { id: 'c16k1', title: 'sort：一行排序', html: '<p><code>sort(起点, 终点)</code> 把区间排成升序。对数组：<code>sort(a, a + n)</code>——正是第 15 章的指针算术！终点是"最后一个的下一个"（左闭右开）。</p><p>对比冒泡 O(n²)：sort 用 introsort，O(n log n)。100 万个数据：冒泡约 10¹² 次比较，sort 约 2×10⁷ 次——差五万倍！</p><p>自己写排序练思维，用 sort 做项目——两者都要会。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5] = {5, 3, 9, 1, 7};\n    sort(a, a + 5);      // 一行升序\n    for (int i = 0; i < 5; i++) cout << a[i] << " ";\n    cout << endl;        // 1 3 5 7 9\n    return 0;\n}',
      points: ['sort(起, 止) 升序排序，左闭右开', '数组用 sort(a, a+n)', 'O(n log n) 远快于冒泡 O(n²)', '手写排序练思维，库排序做项目'] },
    { id: 'c16k2', title: '迭代器：vector 的智能指针', html: '<p>vector 没有"名字即地址"，但它提供<strong>迭代器</strong>：<code>v.begin()</code> 指向首元素，<code>v.end()</code> 指向末尾的下一个。它们就是"智能指针"。</p><p><code>sort(v.begin(), v.end())</code> 给整个 vector 排序。配合范围 for 输出，三行搞定"读入-排序-输出"。</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v = {4, 2, 5, 1};\n    sort(v.begin(), v.end());\n    for (int x : v) cout << x << " ";\n    cout << endl;        // 1 2 4 5\n    return 0;\n}',
      points: ['begin()/end() 是 vector 的迭代器', 'sort(v.begin(), v.end()) 全排序', 'end() 指向末尾的下一个（左闭右开）', '迭代器 = 容器的通用指针'] },
    { id: 'c16k3', title: 'reverse 与 binary_search', html: '<p><code>reverse(起, 止)</code> 反转区间。<strong>降序 = sort + reverse</strong> 两步组合。</p><p><code>binary_search(起, 止, x)</code> 在<strong>已排序</strong>区间里二分查找，返回 bool（存在与否）。第 11 章你手写的 while 二分，现在一行调用。</p><p>组合技：sort → binary_search 查询；sort → reverse → 取前 k 名。STL 武器可以拼装！</p>',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v = {4, 2, 5, 1};\n    sort(v.begin(), v.end());\n    cout << binary_search(v.begin(), v.end(), 5) << endl;  // 1\n    reverse(v.begin(), v.end());   // 降序\n    for (int x : v) cout << x << " ";\n    cout << endl;        // 5 4 2 1\n    return 0;\n}',
      points: ['reverse 反转区间', '降序 = sort + reverse', 'binary_search 返回 bool，要求已排序', 'STL 算法可以自由组合'] }
  ],
  feynman: { id: 'c16f', prompt: '向朋友解释：sort(a, a+n) 的两个参数是什么含义（为什么是 a+n 不是 a+n-1）？迭代器 begin/end 是什么？怎么得到降序？binary_search 的前提条件是什么？为什么库排序比自己写的冒泡快？',
    groups: [['sort', '排序', '一行'], ['begin', 'end', '迭代器', '左闭右开', 'a+n'], ['reverse', '降序', '反转'], ['binary_search', '二分', '已排序', 'log', '快']],
    need: 3, minLen: 25, tip: '左闭右开像排队：从第 a 个人开始，到第 a+n 个人之前停下。' },
  tasks: [
    { id: 'c16t1', title: '一行排序术', story: '扔掉双重循环！用 sort 给数组升序。',
      goal: '读入 n 和 n 个整数，用 <code>sort(a, a+n)</code> 升序输出（空格分隔，一行）。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    // 一行 sort\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;\n    return 0;\n}',
      tests: [{ input: '5\n5 3 9 1 7', expected: '1 3 5 7 9' }, { input: '3\n2 2 1', expected: '1 2 2' }, { input: '4\n-3 5 0 -8', expected: '-8 -3 0 5' }],
      hints: ['sort(a, a + n);', '终点是 a+n（最后一个的下一个）', '排序后正常循环输出'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a, a + n);\n    for (int i = 0; i < n; i++) cout << a[i] << " ";\n    cout << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c16t2', title: 'vector 排序流水线', story: '边读边装、一行排序、范围 for 输出——现代 C++ 三连。',
      goal: '不断读入整数直到 -1，存入 vector，用 <code>sort(v.begin(), v.end())</code> 升序输出（空格分隔，一行）。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    int x;\n    while (true) {\n        cin >> x;\n        if (x == -1) break;\n        v.push_back(x);\n    }\n    // sort + 范围 for 输出\n    cout << endl;\n    return 0;\n}',
      tests: [{ input: '3 5 7 -1', expected: '3 5 7' }, { input: '9 2 8 -1', expected: '2 8 9' }, { input: '-1', expected: '' }],
      hints: ['sort(v.begin(), v.end());', 'for (int y : v) cout << y << " ";', '空 vector 排序也不报错，输出空行'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    int x;\n    while (true) {\n        cin >> x;\n        if (x == -1) break;\n        v.push_back(x);\n    }\n    sort(v.begin(), v.end());\n    for (int y : v) cout << y << " ";\n    cout << endl;\n    return 0;\n}', xp: 20 },
    { id: 'c16t3', title: '秒查是否存在', story: '先 sort 再 binary_search，体验 O(log n) 的查询。',
      goal: '读入 n 和 n 个整数，排序后读入 x，用 <code>binary_search</code> 判断：存在输出 <code>找到</code>，否则 <code>没找到</code>。',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a, a + n);\n    int x;\n    cin >> x;\n    // if (binary_search(...)) ...\n    return 0;\n}',
      tests: [{ input: '5\n1 3 5 7 9\n7', expected: '找到' }, { input: '5\n1 3 5 7 9\n4', expected: '没找到' }, { input: '1\n8\n8', expected: '找到' }],
      hints: ['binary_search(a, a+n, x) 返回 bool', '必须先 sort，否则二分无效', 'if (binary_search(a, a + n, x)) cout << "找到" << endl;'],
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a, a + n);\n    int x;\n    cin >> x;\n    if (binary_search(a, a + n, x)) cout << "找到" << endl;\n    else cout << "没找到" << endl;\n    return 0;\n}', xp: 20 }
  ],
  challenge: { id: 'c16c', title: '🎮 终极闯关：星际排行榜 PRO', story: '毕业前的最后一战！用 STL 重做第 11 章的排行榜：n 个分数降序输出（sort + reverse 组合技），再读入 k，输出第 k 名的分数。全程不许手写排序循环——用武器库！',
    goal: '读入 n 和 n 个分数存入 vector，降序输出（一行，空格分隔）；再读入 k（1~n），输出第 k 高的分数（一行）。例如 88 95 76 92 81，k=2 → 第一行 <code>95 92 88 81 76</code>，第二行 <code>92</code>。',
    starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        v.push_back(x);\n    }\n    // sort + reverse 得到降序\n    for (int x : v) cout << x << " ";\n    cout << endl;\n    int k;\n    cin >> k;\n    // 第 k 高 = v[k-1]\n    return 0;\n}',
    tests: [{ input: '5\n88 95 76 92 81\n2', expected: '95 92 88 81 76\n92' }, { input: '3\n70 70 70\n3', expected: '70 70 70\n70' }, { input: '4\n10 20 30 40\n1', expected: '40 30 20 10\n40' }],
    hints: ['sort(v.begin(), v.end()); 再 reverse(v.begin(), v.end());', '降序后第 k 高就是 v[k-1]', '两步组合技：先升序再反转'],
    solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        v.push_back(x);\n    }\n    sort(v.begin(), v.end());\n    reverse(v.begin(), v.end());\n    for (int x : v) cout << x << " ";\n    cout << endl;\n    int k;\n    cin >> k;\n    cout << v[k - 1] << endl;\n    return 0;\n}', xp: 50 }
});

/* ---------- 毕业寄语 ---------- */
var EPILOGUE = {
  title: '🎓 毕业之后：更广阔的星辰大海',
  html: '<p>恭喜你完成了全部 16 章！你已经掌握了：程序结构、变量与类型、输入输出、分支、循环、数组、函数、字符串、嵌套循环、递归、排序查找、结构体、类与对象、引用与 vector、指针、STL 算法。</p><p><strong>进阶路线建议：</strong></p><p>① <strong>深入指针与内存</strong>：多级指针、new/delete 动态内存、智能指针<br>② <strong>更多 STL</strong>：map、set、queue、stack、priority_queue，算法竞赛的利器<br>③ <strong>数据结构与算法</strong>：链表、栈、队列、树、图，动态规划、贪心<br>④ <strong>项目实战</strong>：控制台小游戏（贪吃蛇、2048）、图形库（SFML）、信息学奥赛（CSP-J/S、NOIP）</p><p><strong>别忘了费曼学习法</strong>：每学一个新概念，先用自己的话讲出来，再写代码验证，最后教给别人。本网站的"小老师"模式会一直为你敞开。</p><p>真正的 C++ 世界比教学子集大得多（指针、模板、异常、智能指针……），但学习的方法完全一样：<strong>小步前进、动手验证、讲给别人听</strong>。星辰大海，等你探索！🚀</p>'
};


/* 概念卡示例的演示输入（点击"运行看看"时自动喂入） */
var DEMO_INPUTS = {
  c3k1: '3 4', c3k3: '125', c7k1: '7', c7k2: '7',
  c4k1: '7', c4k2: '95', c4k3: '2024',
  c5k2: '10', c5k3: '3 5 7 0',
  c6k2: '5\n1 2 3 4 5',
  c8k1: 'hello', c8k3: 'level',
  c9k2: '3', c10k2: '10', c11k2: '7',
  c12k2: '小星 10 小月 25 小岩 18', c12k3: '1 2 4 6',
  c14k2: '3 5 7 -1',
  c15k1: '', c15k2: '', c15k3: '',
  c16k1: '', c16k2: '', c16k3: ''
};
CURRICULUM.forEach(function (ch) {
  ch.concepts.forEach(function (k) {
    if (DEMO_INPUTS[k.id]) k.demoInput = DEMO_INPUTS[k.id];
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULUM: CURRICULUM, EPILOGUE: EPILOGUE };
}
