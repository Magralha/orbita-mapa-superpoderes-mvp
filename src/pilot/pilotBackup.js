const PILOT_KEYS = [
  'orbita-superpoderes-save',
  'orbita-v4-state',
  'orbita-assignment-state',
  'orbita-pilot-session',
  'orbita-local-analytics',
];

export function exportPilotSnapshot() {
  const data = {};
  PILOT_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) data[key] = value;
  });

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadPilotSnapshot() {
  const snapshot = exportPilotSnapshot();
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'orbita-pilot-snapshot.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function importPilotSnapshotText(text) {
  const parsed = JSON.parse(text);
  if (parsed?.version !== 1 || !parsed?.data || typeof parsed.data !== 'object') {
    throw new Error('Snapshot inválido.');
  }

  PILOT_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(parsed.data, key)) {
      localStorage.setItem(key, String(parsed.data[key]));
    }
  });

  return true;
}

export function resetPilotLocalData() {
  PILOT_KEYS.forEach((key) => localStorage.removeItem(key));
}
