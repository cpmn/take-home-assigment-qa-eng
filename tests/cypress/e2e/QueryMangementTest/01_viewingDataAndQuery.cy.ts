/// <reference types="cypress-real-events" />

import QueryManagerPage from '../Pages/QueryManagerPage';

describe('User Story 1: Viewing Data and Queries', () => {
  const queryManagerPage = new QueryManagerPage();
  const idsToDelete: string[] = [];
  before(() => {
    //Initial Data Condition to run this test suite
    // First record to add a query and turn to OPEN state
    cy.addQueryWithFixture('createQueryData.json').then((responseBody) => {
      expect(responseBody.data).to.have.property('id');
      idsToDelete.push(responseBody.data.id);
    });    
    //Second record to RESOLVE the query   
    cy.addQueryWithFixture('createQueryToResolveData.json').then((responseBody) => {      
      expect(responseBody.data).to.have.property('id');
      idsToDelete.push(responseBody.data.id);
      cy.resolveQueryWithFixture(responseBody.data.id, 'ResolveQueryData.json');
    });    
  });

  beforeEach(() => {
    cy.visit('/'); 
  });

  after(() => {
    cy.deleteAllQueriesCreated(idsToDelete);
  });

  it('Verify display the table with correct headers', () => {
    queryManagerPage.getTable().should('be.visible');
    queryManagerPage.getTableHeaderQuestion().should('have.text', 'Question');
    queryManagerPage.getTableHeaderAnswer().should('have.text', 'Answer');
    queryManagerPage.getTableHeaderQueries().should('have.text', 'Queries');
  });

  it('Verify all data is displayed in query table', () => {
    const rowIndex = 0;
    queryManagerPage.verifyRowExists(rowIndex);
    queryManagerPage.verifyQuestionText(
      rowIndex,
      'Do you have any history of chronic diseases, such as diabetes, hypertension, or cardiovascular diseases?'
    );
    queryManagerPage.verifyAnswerText(rowIndex, 'No');
  });

  it('Verify add query icon exists', () => {
    const rowIndex = 2;
    queryManagerPage.verifyAddQueryIconExists(rowIndex);
    queryManagerPage.verifyQueryIconTitle(rowIndex, 'Create Query');
  });

   it('Verify open query icon exists', () => {
     const rowIndex = 0;
     queryManagerPage.verifyOpenQueryIconExists(rowIndex);
     queryManagerPage.verifyQueryIconTitle(rowIndex, 'Open Query');
   });

  it('Verify resolved query icon exists', () => {
    const rowIndex = 1;
    queryManagerPage.verifyResolvedQueryIconExists(rowIndex);
    queryManagerPage.verifyQueryIconTitle(rowIndex, 'Resolved Query');
  });

  it('Verify UI display the correct tooltip on hover of add query', () => {
    const rowIndex = 2;
    queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Add Query');
  });

  it('Verify UI display the correct tooltip on hover of resolved query', () => {
     const rowIndex = 1;
     queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Resolved Query');
  });

   it('Verify UI display the correct tooltip on hover of open query', () => {
      const rowIndex = 0;
      queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Open Query');
   });   
});