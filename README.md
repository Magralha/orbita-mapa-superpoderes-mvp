# Orbita Mapa de Superpoderes MVP

MVP do spin-off municipal do Projeto Orbita para alunos ate o 9 ano.

## Conceito

O app usa escolhas criativas e analogias para mapear superpoderes em desenvolvimento, sem parecer prova, teste vocacional ou avaliacao psicologica.

## O que o MVP faz

- Jornada visual com perguntas por metaforas.
- Pontuacao invisivel por superpoder.
- Resultado positivo e nao determinista.
- Sem backend.
- Sem login.
- Sem coleta real de dados pessoais.

## Rodar localmente

```bash
npm install
npm run devcat > package.json <<'EOF'
{
  "name": "orbita-mapa-superpoderes-mvp",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {}
}
