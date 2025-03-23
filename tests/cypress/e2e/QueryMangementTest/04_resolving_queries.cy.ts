import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('User Story 2: Creating a New Query', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage();

  beforeEach(() => {
    cy.visit('/'); 
  });
  
  
  
//   it('should click resolved query icon', () => {
//     const rowIndex = 0;
//     queryManagerPage.clickResolvedQueryIcon(rowIndex);
//     // Add assertions to check that the action was performed correctly
//     // For example, check if the icon changes or if a message is displayed.
//   });

//   it('should display the correct tooltip on hover', () => {
//     const rowIndex = 1;
//     queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Add Query');
//   });

//   it('should display the correct tooltip on hover of resolved query', () => {
//     const rowIndex = 0;
//     queryManagerPage.verifyQueryStatusCellTooltip(rowIndex, 'Resolved Query');
//   });

//   it('should test responsive behavior', () => {
//     cy.viewport(320, 568); // Mobile viewport
//     cy.reload(); // Reload the page after changing viewport.
//     queryManagerPage.getTable().should('be.visible');

//     // Add assertions for mobile layout, if any.
//     // For example, check if the table is still visible or if elements are rearranged.
//   });

//   it('should test tablet behavior', () => {
//     cy.viewport(768, 1024); // Tablet viewport
//     cy.reload();
//     queryManagerPage.getTable().should('be.visible');
//     //Add tablet specific assertions.
//   });
});