import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('UX/UI: Application should be responsive up to 560px', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage(); 

  beforeEach(() => {
    cy.visit('/'); 
  });  
  
  it('Verify UI displays query table responsive with mobile viewport(320px)', () => {
    cy.viewport(320, 568); // Mobile viewport
    cy.reload(); // Reload the page after changing viewport.
    queryManagerPage.getTable().should('be.visible'); 
    queryManagerPage.getTableHeaderQuestion().should('have.text', 'Question');
    queryManagerPage.getTableHeaderAnswer().should('have.text', 'Answer');
    queryManagerPage.getTableHeaderQueries().should('have.text', 'Queries');
  });
  it('Verify UI displays query table options responsive with mobile viewport(560px)', () => {
    cy.viewport(560, 750); // Mobile viewport
    cy.reload(); // Reload the page after changing viewport.    
    const rowIndex = 0;
    queryManagerPage.verifyAddQueryIconExists(rowIndex);
    queryManagerPage.verifyQueryIconTitle(rowIndex, 'Add Query');  
  });
  
});