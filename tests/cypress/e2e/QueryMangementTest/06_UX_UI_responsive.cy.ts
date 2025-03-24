import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('UX/UI: Application should be responsive up to 560px', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage(); 

  beforeEach(() => {
    cy.visit('/'); 
  });  
  
  it('should query table is responsive with mobile viewport', () => {
    cy.viewport(320, 568); // Mobile viewport
    cy.reload(); // Reload the page after changing viewport.
    queryManagerPage.getTable().should('be.visible'); 
    queryManagerPage.getTableHeaderQuestion().should('have.text', 'Question');
    queryManagerPage.getTableHeaderAnswer().should('have.text', 'Answer');
    queryManagerPage.getTableHeaderQueries().should('have.text', 'Queries');
  });
  it('should verify add query icon exists with mobile viewport', () => {
    cy.viewport(560, 750); // Mobile viewport
    cy.reload(); // Reload the page after changing viewport.    
    const rowIndex = 0;
    queryManagerPage.verifyAddQueryIconExists(rowIndex);
    queryManagerPage.verifyQueryIconTitle(rowIndex, 'Add Query');  
  });
  
});