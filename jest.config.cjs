module.exports = {
  projects: [
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      roots: ['<rootDir>/apps/frontend'],
      testMatch: ['**/__tests__/**/*.test.ts(x)?'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/apps/frontend/src/$1',
        '^@/components/(.*)$': '<rootDir>/apps/frontend/src/components/$1',
        '^@/hooks/(.*)$': '<rootDir>/apps/frontend/src/hooks/$1',
        '^@/lib/(.*)$': '<rootDir>/apps/frontend/src/lib/$1',
        '^@/utils/(.*)$': '<rootDir>/apps/frontend/src/utils/$1',
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['@swc/jest', {
          jsc: {
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        }],
      },
      collectCoverageFrom: [
        'apps/frontend/src/**/*.{ts,tsx}',
        '!apps/frontend/src/**/*.d.ts',
        '!apps/frontend/src/**/__tests__/**',
        '!apps/frontend/src/**/index.ts',
        '!**/node_modules/**',
      ],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 75,
          lines: 80,
          statements: 80,
        },
        './apps/frontend/src/components/': {
          branches: 80,
          functions: 80,
          lines: 85,
          statements: 85,
        },
      },
      testPathIgnorePatterns: ['/node_modules/', '/.next/'],
      transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
      ],
    },
    {
      displayName: 'backend',
      testEnvironment: 'node',
      roots: ['<rootDir>/apps/backend'],
      testMatch: ['**/*.spec.ts'],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/apps/backend/src/$1',
      },
      collectCoverageFrom: [
        'apps/backend/src/**/*.ts',
        '!apps/backend/src/**/*.spec.ts',
        '!**/node_modules/**',
      ],
    },
  ],
};
