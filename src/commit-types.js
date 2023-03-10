export const COMMIT_TYPES = {
  feat: {
    emoji: 'โจ',
    description: 'A new feature',
    release: true
  },
  fix: {
    emoji: '๐',
    description: 'A bug fix',
    release: true
  },
  docs: {
    emoji: '๐',
    description: 'Documentation only changes',
    release: false
  },
  style: {
    emoji: '๐',
    description: 'Changes that do not affect the meaning of the code',
    release: false
  },
  refactor: {
    emoji: 'โป๏ธ',
    description: 'A code change that neither fixes a bug nor adds a feature',
    release: true
  },
  perf: {
    emoji: 'โก๏ธ',
    description: 'A code change that improves performance',
    release: true
  },
  test: {
    emoji: '๐งช',
    description: 'Add or update tests',
    release: false
  },
  build: {
    emoji: '๐๏ธ',
    description: 'Changes that affect the build system or external dependencies',
    release: false
  },
  ci: {
    emoji: '๐ท',
    description: 'Changes to our CI configuration files and scripts',
    release: false
  },
  chore: {
    emoji: '๐ค',
    description: 'Other changes that don\'t modify src or test files',
    release: false
  },
  revert: {
    emoji: 'โช๏ธ',
    description: 'Reverts a previous commit',
    release: true
  },
};
