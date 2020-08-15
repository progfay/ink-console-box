module.exports = {
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: ['**/tests/**/*.test.(ts|tsx)']
}
