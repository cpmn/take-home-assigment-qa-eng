import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('User Story 4: Resolving Queries', () => {
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
  
  it('should click Resolve button and sets the query status to "RESOLVED', () => {
    const rowIndex = 0;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyResolveQueryButtonIsVisible();
    queryModalPage.clickResolveQueryButton();
    queryManagerPage.verifyQueryIconTitle(rowIndex, 'Resolved Query');
    // Here implement the message confirmation that query succesfully change to RESOLVED
    // NO implemented, BUG DETECTED.
    
  });  
  it('should display confirmation that query succesfully change to RESOLVED', () => {    
    // Here implement the message confirmation that query succesfully change to RESOLVED
    // NO implemented, BUG DETECTED.
    // Make the test case to fail since the message was not implemented.
    expect(1).to.equal(2);    
  }); 
  
});