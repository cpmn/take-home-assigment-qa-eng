import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('User Story 3: Viewing Existing Queries (Open Status)', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage();

  beforeEach(() => {
    cy.visit('/'); 
  });  
  
  it('should display query status as OPEN', () => {
    const rowIndex = 1;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyModalQueryStatusHaveText("OPEN");    
    queryModalPage.clickCloseButton();
    queryManagerPage.verifyRowExists(rowIndex);    
  });

  it('should display modal dialog with title Pre-filled based on the question', () => {
    const rowIndex = 1;
    const text = queryManagerPage.getQuestionText(rowIndex);
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyModalIsVisible();
    text.then((questionText) => {
      queryModalPage.verifyModalTitleContains(questionText);
      queryModalPage.clickCloseButton();
    });  
  });

  it('should display description same as User-inputted text from query creation', () => {
    const rowIndex = 1;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyQueryDescriptionValue("test");    
    queryModalPage.clickCloseButton();
    queryManagerPage.verifyRowExists(rowIndex);    
  });

  it.only('should display date/time capture from api', () => {
    const rowIndex = 1;
    // queryManagerPage.clickOpenQueryIcon(rowIndex);
    // queryModalPage.verifyQueryDescriptionValue("test");    
    // queryModalPage.clickCloseButton();
    // queryManagerPage.verifyRowExists(rowIndex);    
    // TO DO 
  });

  it('should display RESOLVED button', () => {
    const rowIndex = 1;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyResolveQueryButtonIsVisible();
    queryModalPage.clickCloseButton();
    queryModalPage.verifyModalIsNotVisible();
    queryManagerPage.verifyRowExists(rowIndex);
  });


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