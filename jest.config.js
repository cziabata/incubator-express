/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: "esnext",
        target: "esnext",
        esModuleInterop: true
      }
    }]
  },
  
  testMatch: ['**/__tests__/**/*.test.ts'],
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))'
  ],

};