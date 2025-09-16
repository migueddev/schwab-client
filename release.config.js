export default {
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'docs', section: '📝 Documentation' },
    { type: 'style', section: '🎨 Styles' },
    { type: 'refactor', section: '🔨 Refactors' },
    { type: 'test', section: '✅ Tests' },
    { type: 'chore', section: '🧹 Chores' },
    { type: 'ci', section: '⚙️ CI/CD' },
    { type: 'build', section: '📦 Build' },
  ],
  bumpFiles: ['package.json'],
  header: '# 📦 Changelog\n',
};
