/* 通过 GitHub Git Data API 发布（当 git push 通道不可用时的等价方案）
 * 用法: node test/publish-api.js   （依赖 gh CLI 已登录） */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OWNER = 'goldfish-x', REPO = 'cpp-star-academy';
const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
const API = 'https://api.github.com';
async function gh(method, p, body) {
  const res = await fetch(API + p, {
    method: method,
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'cpp-academy-publish',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(method + ' ' + p + ' -> ' + res.status + ' ' + (await res.text()));
  return res.json();
}
(async function () {
  const files = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' }).trim().split(/\r?\n/);
  console.log('files: ' + files.length);
  const tree = [];
  for (const f of files) {
    const buf = fs.readFileSync(path.join(ROOT, f));
    const blob = await gh('POST', '/repos/' + OWNER + '/' + REPO + '/git/blobs', {
      content: buf.toString('base64'), encoding: 'base64'
    });
    tree.push({ path: f, mode: '100644', type: 'blob', sha: blob.sha });
    console.log('blob ok: ' + f);
  }
  const t = await gh('POST', '/repos/' + OWNER + '/' + REPO + '/git/trees', { tree: tree });
  let parents = [];
  try {
    const ref = await gh('GET', '/repos/' + OWNER + '/' + REPO + '/git/ref/heads/main');
    parents = [ref.object.sha];
  } catch (e) { /* 空仓库 */ }
  const commit = await gh('POST', '/repos/' + OWNER + '/' + REPO + '/git/commits', {
    message: 'feat: C++ 星际编程学院 v2 — 16 章课程 / 指针与 STL / 直达闯关 / 回溯学习 / 分享',
    tree: t.sha, parents: parents
  });
  if (parents.length) {
    await gh('PATCH', '/repos/' + OWNER + '/' + REPO + '/git/refs/heads/main', { sha: commit.sha, force: false });
  } else {
    await gh('POST', '/repos/' + OWNER + '/' + REPO + '/git/refs', { ref: 'refs/heads/main', sha: commit.sha });
  }
  console.log('published commit: ' + commit.sha);
})().catch(function (e) { console.error(e.message); process.exit(1); });
