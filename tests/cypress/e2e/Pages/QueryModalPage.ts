class QueryModalPage {
    // Selectors
    modalContent = '[data-modal-content="true"]';
    modalTitle = '[id^="mantine-"][id$="-title"]';
    queryStatus = '[data-testid="query-status-txt"]'
    closeButton = '.mantine-Modal-close';
    queryTextarea = '[data-testid="query-textarea"]';    
    queryCreatedAt= '[data-testid="query-created-at"]';
    queryUpdatedAt= '[data-testid="query-updated-at-txt"]';
    createQueryButton = '[data-testid="create-query-button"]';
    resolveQueryButton = '[data-testid="resolve-query-button"]';
    queryDescription =  '[data-testid="query-description-txt"]';

  
    // Elements
    getModalContent() {
      return cy.get(this.modalContent);
    }
  
    getModalTitle() {
      return cy.get(this.modalTitle);
    }
  
    getCloseButton() {
      return cy.get(this.closeButton);
    }
  
    getQueryTextarea() {
      return cy.get(this.queryTextarea);
    }
  
    getCreateQueryButton() {
      return cy.get(this.createQueryButton);
    }

    getResolveQueryButton() {
        return cy.get(this.resolveQueryButton);
      }
    
    getQueryStatus(){
        return cy.get(this.queryStatus);
    }
    getQueryDescriptionText(){
        return cy.get(this.queryDescription);
    }
    getQueryCreatedAt(){
        return cy.get(this.queryCreatedAt);
    }
  
    // Methods
    typeQueryText(text: string) {
      return this.getQueryTextarea().type(text);
    }
  
    clickCreateQueryButton() {
      return this.getCreateQueryButton().click();
    }
    
    clickResolveQueryButton() {
        return this.getResolveQueryButton().click();
      }
  
    clickCloseButton() {
      return this.getCloseButton().click();
    }
    verifyModalQueryStatusHaveText(text: string){
        return this.getQueryStatus().should('have.text', text);
    }
  
    verifyModalTitleContains(text: string) {
        return this.getModalTitle().should('contain.text', text);
    }
  
    verifyModalIsVisible() {
        return this.getModalContent().should('be.visible');
    }
  
    verifyModalIsNotVisible(){
        return this.getModalContent().should('not.exist');
    }
  
    verifyCreateQueryButtonIsVisible(){
        return this.getCreateQueryButton().should('be.visible');
    }
    
    verifyResolveQueryButtonIsVisible(){
        return this.getResolveQueryButton().should('be.visible');
    }
    verifyCloseButtonIsVisible(){
        return this.getCloseButton().should('be.visible');
    }
  
    verifyQueryTextAreaIsVisible() {
        return this.getQueryTextarea().should('be.visible');
    }
  
    clearQueryTextarea() {
        return this.getQueryTextarea().clear();
    }
  
    getQueryTextareaValue() {
        return this.getQueryTextarea().invoke('val');
    }
  
    verifyQueryTextareaValue(expectedValue: string) {
        return this.getQueryTextareaValue().should('eq', expectedValue);
    }
    verifyQueryTextareaEmpty() {
      return this.getQueryTextareaValue().should('eq', '');
  }

    verifyQueryDescriptionValue(expectedValue: string) {
        return this.getQueryDescriptionText().should('have.text', expectedValue);
    }
    verifyQueryApdatedAt(date : string){
        return this.getQueryCreatedAt()
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.eq(date);
        });
        //this.getQueryCreatedAt().should('eq', date);
    }
  }
  
  export default QueryModalPage;