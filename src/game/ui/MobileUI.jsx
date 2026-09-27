export const scenarioOptions = [
  { id: 'escola', label: 'Escola', icon: '🎓', startNode: 'schoolyard_entry' },
  { id: 'casa', label: 'Casa', icon: '⌂', startNode: 'forest_entry' },
  { id: 'amigos', label: 'Amigos', icon: '●●', startNode: 'bridge_entry' },
  { id: 'games', label: 'Games', icon: '✦', startNode: 'ai_safety_entry' },
  { id: 'esporte', label: 'Esporte', icon: '★', startNode: 'arena_pressure_vote' },
];

export function OrbitaWordmark({ compact = false }) {
  return (
    <div className={`orbitaWordmark ${compact ? 'compact' : ''}`} aria-label="Órbita">
      <span className="orbitaWordmarkStar">✦</span>
      <strong>Órbita</strong>
      <i />
    </div>
  );
}

export function MobileBottomNav({ active = 'inicio', onProfile, onSave }) {
  const items = [
    { id: 'inicio', icon: '⌂', label: 'Início' },
    { id: 'missao', icon: '◎', label: 'Missão' },
    { id: 'mochila', icon: '▣', label: 'Mochila' },
    { id: 'perfil', icon: '●', label: 'Perfil' },
  ];

  return (
    <nav className="mobileGameNav" aria-label="Navegação do jogo">
      {items.map((item) => {
        const clickable = item.id === 'perfil' ? onProfile : item.id === 'mochila' ? onSave : null;

        return (
          <button
            type="button"
            key={item.id}
            className={active === item.id ? 'active' : ''}
            onClick={clickable || undefined}
            disabled={!clickable && item.id !== active}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </button>
        );
      })}
    </nav>
  );
}
