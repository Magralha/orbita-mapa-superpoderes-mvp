const ANALYTICS_KEY = 'orbita-local-analytics';

export function trackEvent(name, properties = {}) {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    const current = raw ? JSON.parse(raw) : [];
    const next = [
      ...current,
      {
        id: name + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
        name,
        properties: { ...properties },
        createdAt: new Date().toISOString(),
      },
    ].slice(-500);

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(next));
    return next[next.length - 1];
  } catch {
    return null;
  }
}

export function listLocalAnalytics() {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function analyticsSummary() {
  const events = listLocalAnalytics();
  const byName = events.reduce((acc, event) => {
    acc[event.name] = (acc[event.name] || 0) + 1;
    return acc;
  }, {});

  return {
    total: events.length,
    byName,
    recent: [...events].slice(-12).reverse(),
  };
}

export function clearLocalAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
}
