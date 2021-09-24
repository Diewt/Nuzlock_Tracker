module.exports = {
    "testEnvironment": "jsdom",
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    moduleNameMapper: {
        "^@/components(.*)$": "<rootDir>/components/$1",
        "^@/context(.*)$": "<rootDir>/context/$1",
        "^@/lib(.*)$": "<rootDir>/lib/$1",
        "^@/pages(.*)$": "<rootDir>/pages/$1",
        "^@/public(.*)$": "<rootDir>/public/$1",
        "^@fontsource(.*)": "identity-obj-proxy",

        '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
};
