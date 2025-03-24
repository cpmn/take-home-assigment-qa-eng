import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('User Story 2: Creating a New Query', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage();

  beforeEach(() => {
    cy.visit('/'); 
  });
  
  
  it('should display modal dialog when click add query icon', () => {
     const rowIndex = 2;
     queryManagerPage.clickAddQueryIcon(rowIndex);
     queryModalPage.verifyModalIsVisible();
     queryModalPage.clickCloseButton();  
   });

   it('should display modal dialog with title Pre-filled based on the question', () => {
    const rowIndex = 2;
    const text = queryManagerPage.getQuestionText(rowIndex);
    queryManagerPage.clickAddQueryIcon(rowIndex);
    queryModalPage.verifyModalIsVisible();
    text.then((questionText) => {
      queryModalPage.verifyModalTitleContains(questionText);
      queryModalPage.clickCloseButton();
    });  
  });

  it('should add new query and change status to open', () => {
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
});