export const COMMIT_TYPES = {
  build: {
    emoji: '🏗️',
    description: 'Changes that affect the build system or external dependencies',
    release: false
  },
  chore: {
    emoji: '🤖',
    description: 'Other changes that don\'t modify src or test files',
    release: false
  },
  ci: {
    emoji: '👷',
    description: 'Changes to our CI configuration files and scripts',
    release: false
  },
  docs: {
    emoji: '📝',
    description: 'Documentation only changes',
    release: false
  },
  feat: {
    emoji: '✨',
    description: 'A new feature',
    release: true
  },
  fix: {
    emoji: '🐛',
    description: 'A bug fix',
    release: true
  },
  perf: {
    emoji: '⚡️',
    description: 'A code change that improves performance',
    release: true
  },
  refactor: {
    emoji: '♻️',
    description: 'A code change that neither fixes a bug nor adds a feature',
    release: true
  },
  revert: {
    emoji: '⏪️',
    description: 'Reverts a previous commit',
    release: true
  },
  style: {
    emoji: '💄',
    description: 'Changes that do not affect the meaning of the code',
    release: false
  },
  test: {
    emoji: '🧪',
    description: 'Add or update tests',
    release: false
  }
};
