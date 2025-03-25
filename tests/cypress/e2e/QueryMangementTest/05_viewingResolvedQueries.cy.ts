/// <reference types="cypress-real-events" />

import QueryManagerPage from '../Pages/QueryManagerPage';
import QueryModalPage from '../Pages/QueryModalPage';

describe('User Story 5: Viewing Resolved Queries', () => {
  const queryManagerPage = new QueryManagerPage();
  const queryModalPage = new QueryModalPage();  
  const idsToDelete: string[] = [];
  before(() => {
    //Initial Data Condition to run this test suite    
    //Second record to RESOLVE the query   
    cy.addQueryWithFixture('createQueryToResolveData.json').then((responseBody) => {      
      expect(responseBody.data).to.have.property('id');
      idsToDelete.push(responseBody.data.id);
      cy.resolveQueryWithFixture(responseBody.data.id, 'ResolveQueryData.json');
    });    
  });

  beforeEach(() => {
    cy.visit('/'); 
  });

  after(() => {
    cy.deleteAllQueriesCreated(idsToDelete);
  });
  it('Verify Resolved modal dialog display status "RESOLVED" status in green', () => {    
    // Here implement to verify RESOLVED status in green
    // STATUS is black, need to investigate how to get the text color
    // Make the test case to fail.
    expect("RESOLVED in Green").to.equal("RESOLVED in Black");    
  }); 

  it('Verify Resolved modal dialog display title Pre-filled based on the question', () => {
    const rowIndex = 1;
    const text = queryManagerPage.getQuestionText(rowIndex);
    queryManagerPage.clickResolvedQueryIcon(rowIndex);
    queryModalPage.verifyModalIsVisible();
    text.then((questionText) => {
      queryModalPage.verifyModalTitleHaveText(questionText);
      queryModalPage.clickCloseButton();
    });  
  });

  it('Verify Resolved modal dialog display the correct description', () => {
      const rowIndex = 1;
      queryManagerPage.clickResolvedQueryIcon(rowIndex);  
  
      cy.getIdInQueryResponse(idsToDelete[0]).then((responseBody) => {
        expect(responseBody).to.have.property('description');
        const description: string = responseBody.description;
        queryModalPage.verifyQueryDescriptionValue(description);      
      });
      queryModalPage.clickCloseButton();
      queryManagerPage.verifyRowExists(rowIndex);    
    });
    it('Verify Resolved modal dialog display the correct resolution date', () => {
      // Here implement to verify resolution date
      // There is no Resolution Date on the UI, maybe UpdatedAt but this acceptance is ambiguous 
      // Make the test case to fail.
      expect("Resolution date is visible").to.equal("There is no resolution date");   
    });
    it('Verify UI should not display option/button to re-open or change the resolved status directly', () => {
        // Here implement to verify there is no UI option or button to re-epen or chnge the resolved status
        // Currently UI displays de Delete Button that re-open the status. BUG DETECTED
        // Make the test case to fail.
        expect("Button re-open is not displayed").to.equal("Button Delete is present and reset the status");   
      });
});