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
  
  it('Verify user can Resolve query from Resolve Model dialog and status change to "RESOLVED', () => {
    const rowIndex = 0;
    queryManagerPage.clickOpenQueryIcon(rowIndex);
    queryModalPage.verifyResolveQueryButtonIsVisible();
    queryModalPage.clickResolveQueryButton();
    queryManagerPage.verifyQueryIconTitle(rowIndex, 'Resolved Query');
    // Here implement the message confirmation that query succesfully change to RESOLVED
    // NO implemented, BUG DETECTED.
    
  });  
  it('Verify once the user Resolve the query a confirmation should be displayed in main page', () => {    
    // Here implement the message confirmation that query succesfully change to RESOLVED
    // NO implemented, BUG DETECTED.
    // Make the test case to fail since the message was not implemented.
    expect("Confirmation: Query status succesfully change to RESOLVED").to.equal("");    
  }); 
  
});