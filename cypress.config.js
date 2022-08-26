const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({

  projectId: "ekxbi9",
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config)
    },
    baseUrl: 'https://conexaoqa.herokuapp.com'
  },
});
