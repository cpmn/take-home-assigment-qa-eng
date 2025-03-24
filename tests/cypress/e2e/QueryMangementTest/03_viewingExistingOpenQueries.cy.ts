import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';
import { formatDate } from '../../support/utils';

describe('User Story 3: Viewing Existing Queries (Open Status)', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage();  
  const idsToDelete: string[] = [];
  before(() => {
    //Initial Data Condition to run this test suite
    // add a query to the first element in the table index = 0
    cy.addQueryWithFixture('createQueryData.json').then((responseBody) => {
      expect(responseBody.data).to.have.property('id');
      idsToDelete.push(responseBody.data.id);
    });        
  });

  beforeEach(() => {
    cy.visit('/'); 
  }); 

  after(() => {
    cy.deleteAllQueriesCreated(idsToDelete);
  }); 
  
  it('should display query status as OPEN', () => {
    const rowIndex = 0;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyModalQueryStatusHaveText("OPEN");    
    queryModalPage.clickCloseButton();
    queryManagerPage.verifyRowExists(rowIndex);    
  });

  it('should display modal dialog with title Pre-filled based on the question', () => {
    const rowIndex = 0;
    const text = queryManagerPage.getQuestionText(rowIndex);
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyModalIsVisible();
    text.then((questionText) => {
      queryModalPage.verifyModalTitleContains(questionText);
      queryModalPage.clickCloseButton();
    });  
  });

  it('should display description same as User-inputted text from query creation', () => {
    const rowIndex = 0;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyQueryDescriptionValue("Test Query to Review");    
    queryModalPage.clickCloseButton();
    queryManagerPage.verifyRowExists(rowIndex);    
  });

  it('should display createdAt (date/time) capture from api', () => {
    const rowIndex = 0;
    queryManagerPage.clickOpenQueryIcon(rowIndex);  

    cy.getIdInQueryResponse(idsToDelete[0]).then((responseBody) => {
      expect(responseBody).to.have.property('createdAt');
      const dateTimeCreation: string = formatDate(responseBody.createdAt);
      queryModalPage.verifyQueryApdatedAt(dateTimeCreation);      
    });
    queryModalPage.clickCloseButton();
    queryManagerPage.verifyRowExists(rowIndex);    
  });

  it('should display RESOLVED button', () => {
    const rowIndex = 0;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyResolveQueryButtonIsVisible();
    queryModalPage.clickCloseButton();
    queryModalPage.verifyModalIsNotVisible();
    queryManagerPage.verifyRowExists(rowIndex);
  });
});