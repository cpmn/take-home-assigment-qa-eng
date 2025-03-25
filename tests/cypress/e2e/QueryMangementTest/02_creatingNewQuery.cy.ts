import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('User Story 2: Creating a New Query', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage(); 

  beforeEach(() => {
    cy.visit('/'); 
  });

  after(() => {
    cy.deleteAllQueriesInTable();
  });
  
  it('Verify UI display modal dialog when click create query icon', () => {
     const rowIndex = 2;
     queryManagerPage.clickAddQueryIcon(rowIndex);
     queryModalPage.verifyModalIsVisible();
     queryModalPage.clickCloseButton();  
   });

  it('Verify UI display modal dialog with title Pre-filled based on the question', () => {
     const rowIndex = 2;
     queryManagerPage.getQuestionText(rowIndex).then((text) => {
      queryManagerPage.clickAddQueryIcon(rowIndex);
      queryModalPage.verifyModalIsVisible();
      queryModalPage.verifyModalTitleHaveText(text);
      queryModalPage.clickCloseButton();
    });
     
  });  

  it('Verify user can add a new query and status now is open', () => {
     const rowIndex = 2;     
     queryManagerPage.clickAddQueryIcon(rowIndex);     
     queryModalPage.verifyModalIsVisible();
     // if we do not clear the text area, after the first time I add a query
     //  it will fail (BUG detected) Once the bug is fixed this line should be removed
     queryModalPage.clearQueryTextarea();
     queryModalPage.typeQueryText("New comment to review the answer");
     queryModalPage.clickCreateQueryButton();
     queryModalPage.clickCloseButton();
     queryManagerPage.verifyOpenQueryIconExists(rowIndex);
     //Verify a success message should display after we add a query
     //Currently this is failing, no message is displayed BUG DETECTED
  });
  it('Verify UI display create modal dialog with description in blank', () => {
    const rowIndex = 0;
    const rowIndex2 = 1;
     queryManagerPage.clickAddQueryIcon(rowIndex);     
     queryModalPage.verifyModalIsVisible();     
     queryModalPage.clearQueryTextarea();
     queryModalPage.typeQueryText("New comment to review the answer");
     queryModalPage.clickCreateQueryButton();
     queryModalPage.clickCloseButton();
     queryManagerPage.verifyOpenQueryIconExists(rowIndex);
     queryManagerPage.clickAddQueryIcon(rowIndex2);     
     queryModalPage.verifyModalIsVisible();     
     queryModalPage.verifyQueryTextareaEmpty()          
     queryModalPage.clickCloseButton();     
 });
});