module.exports = {
    preset: "ts-jest",

    rootDir: './',

    testMatch: [
        "**/?(*)+(test).ts"
    ],
    testEnvironment: "node",
    resetMocks: true,
    clearMocks: true,
}