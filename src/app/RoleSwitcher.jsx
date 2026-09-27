export default function RoleSwitcher({ mode, onChange }) {
  const options = [
    { id: 'student', label: 'Aluno' },
    { id: 'family', label: 'Responsável' },
    { id: 'municipality', label: 'Escola / Município' },
  ];

  return (
    <nav className="roleSwitcher" aria-label="Visões do protótipo">
      <span>Visão da demo</span>
      <div>
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            className={mode === option.id ? 'active' : ''}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
