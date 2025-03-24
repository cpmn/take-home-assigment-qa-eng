// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './utils'
import 'cypress-real-events/support'
import queryApiService from './QueryApiService';

//mochawesome reporting
import 'cypress-mochawesome-reporter/register'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });

  declare global {
    namespace Cypress {
      interface Chainable<Subject = any> {
        addQueryWithFixture(dataFixture: string): Chainable<any>;
        resolveQueryWithFixture(requestFixture: string, dataFixture: string): Chainable<any>;
        deleteAllQueriesCreated(queryIds: string[]): Chainable<any>;
        getIdInQueryResponse(formDataId: string): Chainable<any>;
        deleteAllQueriesInTable(): Chainable<any>;
      }
    }

  }

  Cypress.Commands.add('addQueryWithFixture', (dataFixture: string) => {
    cy.fixture(dataFixture).then((queryData) => {
      queryApiService.createQuery(queryData).then((response) => {
        expect(response.status).to.eq(200); 
        cy.wrap(response.body); // Wrap the response body for further chaining if needed.
      });
    });
  });  

  Cypress.Commands.add('resolveQueryWithFixture', (queryId: string, dataFixture: string) => {
    cy.fixture(dataFixture).then((updateData) => {
      return queryApiService.resolveQuery(queryId, updateData).then((response) => {
        expect(response.status).to.eq(200); // Or whatever status you expect
        return cy.wrap(response.body); // Wrap the body for further chaining
      });
    });    
  });

  Cypress.Commands.add('deleteAllQueriesCreated', (queryIds: string[]) => {    
      return queryApiService.deleteQueries(queryIds);
  }); 

  Cypress.Commands.add('getIdInQueryResponse', (formDataId: string) => {    
    return queryApiService.findQueryByQueryId(formDataId);
  }); 

  Cypress.Commands.add('deleteAllQueriesInTable', () => {    
    queryApiService.extractAllQueryIds().then((queryIds) => {   
      return queryApiService.deleteQueries(queryIds);
    });
  }); 

  