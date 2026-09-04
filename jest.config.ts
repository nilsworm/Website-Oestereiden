import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // ponytail: Worktrees sind eigene Checkouts mit eigenen Tests — die gehören
  // nicht in den Lauf des Hauptbaums.
  testPathIgnorePatterns: ['/node_modules/', '/.worktrees/'],
}

export default createJestConfig(config)
