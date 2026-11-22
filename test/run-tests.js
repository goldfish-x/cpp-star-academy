/* 课程数据自检：所有参考答案必须通过全部测试点 */
const { CURRICULUM, EPILOGUE } = require('../js/curriculum.js');
const interp = require('../js/interpreter.js');

let total = 0, pass = 0, fail = 0;
const failures = [];

function checkTask(chId, task) {
  for (let ti = 0; ti < task.tests.length; ti++) {
    const t = task.tests[ti];
    total++;
    const r = interp.run(task.solution, t.input);
    if (r.ok && interp.normalize(r.output) === interp.normalize(t.expected)) {
      pass++;
    } else {
      fail++;
      failures.push(chId + '/' + task.id + ' test#' + (ti + 1) + ': ' +
        (r.ok ? 'got ' + JSON.stringify(r.output) : 'ERROR ' + r.error) +
        ' expected ' + JSON.stringify(t.expected));
    }
  }
  // starter 必须能通过语法解析（运行可能失败，那是学生要补全的）
  const rs = interp.run(task.starter, task.tests[0].input);
  if (!rs.ok && /这里应该|看不懂|意外的|没有结束|不是可用的类型|大括号/.test(rs.error)) {
    failures.push('[STARTER语法] ' + chId + '/' + task.id + ': ' + rs.error);
    fail++;
  }
}

for (const ch of CURRICULUM) {
  for (const task of ch.tasks) checkTask(ch.id, task);
  checkTask(ch.id, ch.challenge);
  // 概念示例代码应能运行（给足输入）
  for (const k of ch.concepts) {
    const r = interp.run(k.code, k.demoInput || '');
    if (!r.ok) failures.push('[CONCEPT] ' + k.id + ': ' + r.error);
  }
}

console.log('测试点: ' + total + '  通过: ' + pass + '  失败: ' + fail);
if (failures.length) {
  console.log('--- 问题清单 ---');
  failures.forEach(f => console.log(f));
  process.exitCode = 1;
} else {
  console.log('全部通过 ✔');
}
