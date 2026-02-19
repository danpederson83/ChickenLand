const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const LEADERBOARD_FILE = path.join(__dirname, 'leaderboard.json');

function readLeaderboard() {
  try {
    return JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf8'));
  } catch { return []; }
}

function saveLeaderboard(board) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(board, null, 2));
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  if (req.method === 'GET' && req.url === '/api/leaderboard') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(readLeaderboard()));
    return;
  }

  if (req.method === 'POST' && req.url === '/api/leaderboard') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, time } = JSON.parse(body);
        if (typeof name !== 'string' || typeof time !== 'number') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid data' }));
          return;
        }
        const safeName = name.slice(0, 12).replace(/[<>&"'/]/g, '');
        const board = readLeaderboard();
        board.push({ name: safeName, time });
        board.sort((a, b) => a.time - b.time);
        if (board.length > 5) board.length = 5;
        saveLeaderboard(board);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(board));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad request' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`ChickenLand server running at http://localhost:${PORT}`);
});
