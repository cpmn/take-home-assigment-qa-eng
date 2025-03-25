# Cypress Test Automation Framework

Welcome to my Cypress test automation framework repository, it is built with typeScript (TS) and follows the Page Object Model (POM) design pattern to implement the UI tests for Query management project

## Setup 🛠️

### Pre-requisites
* Install NodeJS and NPM pakcage manager.
* Code Editor of your choice e.g. Visual Studio Code
* GIT Client (for remote tracking)
* GIT Bash terminal (for Windows)
* Clone git repo: https://github.com/cpmn/take-home-assigment-qa-eng
* Follow step to set up the application: https://github.com/cpmn/take-home-assigment-qa-eng/blob/main/README.md
* Navigate to tests folder and open terminal
* Run `npm install` to install the framework dependencies* 

#### Optional
* Install [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=CliffSu.cypress-snippets) VS Code Extension that includes the most common cypress snippets.

## Running tests ⚡

* If you want to run cypress test to generate report run the following command:
   ```sh
   npx cypress run --browser chrome --headed --spec "cypress\e2e\QueryMangementTest\*.cy.ts"
   ```
* `npm run start` or `npm run cypress:open` will open the cypress test runner so you can run the tests from it
* `npx cypress run` will run all the test spec files located within `cypress/e2e` folder. By default test are run in headless mode on electron browser.

### Setup from Scratch

* `npm init` to setup node project with package.json
* `npm install --save-dev cypress` to install cypress as dev dependency
* `npx cypress open` to open the cypress test runner and choose `E2E Testing` which will create cypress config, support and fixture folders.
* Choose browser of your choice, and scaffold examples which will create boilerplate specs within e2e folder.
* Remove the default boilerplate specs from `cypress/e2e` folder
* Add `.gitignore` to exclude files and folders from GIT
* Add `README.md` to document
* Start with writing tests under `cypress/e2e` directory.