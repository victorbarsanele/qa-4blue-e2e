const { defineConfig } = require('cypress');

module.exports = defineConfig({
    allowCypressEnv: false,

    reporter: 'cypress-mochawesome-reporter',

    reporterOptions: {
        reportDir: 'cypress/reports',
        charts: true,
        reportPageTitle: 'QA Automation Report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
    },

    video: true,
    screenshotOnRunFailure: true,

    e2e: {
        baseUrl: 'https://qa-play-sim.lovable.app/',

        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
    },
});
