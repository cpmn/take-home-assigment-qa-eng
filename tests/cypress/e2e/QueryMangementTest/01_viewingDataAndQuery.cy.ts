/// <reference types="cypress-real-events" />

import QueryManagerPage from '../Pages/QueryManagerPage';

describe('User Story 1: Viewing Data and Queries', () => {
  const queryManagerPage = new QueryManagerPage();

  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should display the table with correct headers', () => {
    queryManagerPage.getTable().should('be.visible');
    queryManagerPage.getTableHeaderQuestion().should('have.text', 'Question New');
    queryManagerPage.getTableHeaderAnswer().should('have.text', 'Answer');
    queryManagerPage.getTableHeaderQueries().should('have.text', 'Queries');
  });

  it('should verify row data', () => {
    const rowIndex = 0;
    queryManagerPage.verifyRowExists(rowIndex);
    queryManagerPage.verifyQuestionText(
      rowIndex,
      'Do you have any history of chronic diseases, such as diabetes, hypertension, or cardiovascular diseases?'
    );
    queryManagerPage.verifyAnswerText(rowIndex, 'No');
  });

  it('should verify add query icon exists', () => {
    const rowIndex = 2;
    queryManagerPage.verifyAddQueryIconExists(rowIndex);
    queryManagerPage.checkQueryIconTitle(rowIndex, 'Add Query');
  });

   it('should verify open query icon exists', () => {
     const rowIndex = 1;
     queryManagerPage.verifyOpenQueryIconExists(rowIndex);
     queryManagerPage.checkQueryIconTitle(rowIndex, 'Open Query');
   });

  it('should verify resolved query icon exists', () => {
    const rowIndex = 0;
    queryManagerPage.verifyResolvedQueryIconExists(rowIndex);
    queryManagerPage.checkQueryIconTitle(rowIndex, 'Resolved Query');
  });

  it('should display the correct tooltip on hover of add query', () => {
    const rowIndex = 2;
    queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Add Query');
  });

  it('should display the correct tooltip on hover of resolved query', () => {
     const rowIndex = 0;
     queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Resolved Query');
  });

   it('should display the correct tooltip on hover of open query', () => {
      const rowIndex = 1;
      queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Open Query');
   });

});