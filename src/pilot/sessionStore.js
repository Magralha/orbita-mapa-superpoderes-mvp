import { getPilotAccount } from './pilotData';

const SESSION_KEY = 'orbita-pilot-session';

export function getPilotSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const account = getPilotAccount(parsed.accountId);
    return account ? { ...parsed, account } : null;
  } catch {
    return null;
  }
}

export function createPilotSession(accountId) {
  const account = getPilotAccount(accountId);
  if (!account) return null;

  const session = {
    accountId,
    signedInAt: new Date().toISOString(),
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ...session, account };
}

export function clearPilotSession() {
  localStorage.removeItem(SESSION_KEY);
}
