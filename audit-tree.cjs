const fs = require('fs');

const text = fs.readFileSync('src/game/data/expandedTree.js', 'utf8');

function extractObject(name) {
  const start = text.indexOf(`export const ${name} =`);
  if (start === -1) throw new Error(`${name} não encontrado`);

  const open = text.indexOf('{', start);
  let depth = 0;
  let body = '';
  let started = false;

  for (let i = open; i < text.length; i++) {
    const ch = text[i];

    if (ch === '{') {
      depth++;
      started = true;
    }

    if (started) body += ch;

    if (ch === '}') {
      depth--;
      if (started && depth === 0) break;
    }
  }

  return body;
}

function extractNodeBody(nodesBody, node) {
  const nodeStart = nodesBody.indexOf(`  ${node}: {`);
  if (nodeStart === -1) return '';

  let i = nodesBody.indexOf('{', nodeStart);
  let depth = 0;
  let body = '';
  let started = false;

  for (; i < nodesBody.length; i++) {
    const ch = nodesBody[i];

    if (ch === '{') {
      depth++;
      started = true;
    }

    if (started) body += ch;

    if (ch === '}') {
      depth--;
      if (started && depth === 0) break;
    }
  }

  return body;
}

const nodesBody = extractObject('expandedNodes');
const startsBody = extractObject('agentStartNode');

const nodeNames = [...nodesBody.matchAll(/\n\s{2}([a-zA-Z0-9_]+):\s*\{/g)].map((m) => m[1]);
const starts = [...startsBody.matchAll(/([a-zA-Z0-9_]+):\s*'([^']+)'/g)].map((m) => [m[1], m[2]]);

const edges = {};

for (const node of nodeNames) {
  const body = extractNodeBody(nodesBody, node);
  edges[node] = [...body.matchAll(/next:\s*'([^']+)'/g)].map((m) => m[1]);
}

function explore(start) {
  const paths = [];

  function dfs(node, path) {
    if (!node || path.includes(node) || path.length > 90) {
      paths.push(path);
      return;
    }

    const nexts = edges[node] || [];

    if (node === 'mission' || nexts.length === 0) {
      paths.push([...path, node]);
      return;
    }

    for (const next of nexts) {
      dfs(next, [...path, node]);
    }
  }

  dfs(start, []);

  const lengths = paths.map((p) => p.length);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const shortest = paths.find((p) => p.length === min);
  const longest = paths.find((p) => p.length === max);

  return { min, max, shortest, longest };
}

console.log('Total real de nós cadastrados:', nodeNames.length);
console.log('');

for (const [agent, start] of starts) {
  const result = explore(start);

  console.log(`${agent}: início=${start} | menor=${result.min} telas | maior=${result.max} telas`);
  console.log('menor caminho:', result.shortest.join(' -> '));
  console.log('maior caminho:', result.longest.join(' -> '));
  console.log('');
}
