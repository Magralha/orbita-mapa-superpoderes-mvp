import { agentStartNode, expandedNodes } from '../src/game/data/expandedTree.js';

const specialTargets = new Set(['inventory', 'tradeoff', 'mission']);
const errors = [];

for (const [key, node] of Object.entries(expandedNodes)) {
  if (node.id !== key) {
    errors.push(`Node key/id mismatch: ${key} -> ${node.id}`);
  }

  const targets = [];

  if (node.next) targets.push(node.next);
  for (const choice of node.choices || []) {
    if (choice.next) targets.push(choice.next);
  }

  for (const target of targets) {
    if (target === key) {
      errors.push(`Self-loop detected: ${key} -> ${target}`);
    }

    if (!specialTargets.has(target) && !expandedNodes[target]) {
      errors.push(`Missing target: ${key} -> ${target}`);
    }
  }
}

for (const [agentId, start] of Object.entries(agentStartNode)) {
  if (!expandedNodes[start]) {
    errors.push(`Invalid start node for ${agentId}: ${start}`);
  }
}

if (errors.length) {
  console.error('\nÓrbita route validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Órbita routes OK: ${Object.keys(expandedNodes).length} nodes, ${Object.keys(agentStartNode).length} agent starts.`,
);
