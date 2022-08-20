export default {
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  transform: {
    '^.+.(t|j)sx?$': ['@swc/jest']
  },
  clearMocks: true,
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.ts']
};
