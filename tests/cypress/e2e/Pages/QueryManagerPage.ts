class QueryManagerPage {
  // Selectors
  table = '[data-testid="query-table"]';
  tableHeaderQuestion = '[data-testid="table-header-question"]';
  tableHeaderAnswer = '[data-testid="table-header-answer"]';
  tableHeaderQueries = '[data-testid="table-header-queries"]';
  tableRows = '[data-testid^="table-row-"]';
  questionCells = '[data-testid^="question-"]';
  answerCells = '[data-testid^="answer-"]';
  queryStatusCells = '[data-testid^="query-status-"]';
  resolvedQueryIcon = '[data-testid="resolved-query-icon"]';
  addQueryIcon = '[data-testid="add-query-icon"]';
  openQueryIcon = '[data-testid="open-query-icon"]';

  // Elements
  getTable() {
    return cy.get(this.table);
  }

  getTableHeaderQuestion() {
    return cy.get(this.tableHeaderQuestion);
  }

  getTableHeaderAnswer() {
    return cy.get(this.tableHeaderAnswer);
  }

  getTableHeaderQueries() {
    return cy.get(this.tableHeaderQueries);
  }

  getTableRows() {
    return cy.get(this.tableRows);
  }

  getQuestionCells() {
    return cy.get(this.questionCells);
  }

  getAnswerCells() {
    return cy.get(this.answerCells);
  }

  getQueryStatusCells() {
    return cy.get(this.queryStatusCells);
  }

  getResolvedQueryIcon() {
    return cy.get(this.resolvedQueryIcon);
  }

  getAddQueryIcon() {
    return cy.get(this.addQueryIcon);
  }
  getOpenQueryIcon() {
    return cy.get(this.openQueryIcon);
  }

  // Methods
  getTableRow(rowIndex: number) {
    return cy.get(`[data-testid="table-row-${rowIndex}"]`);
  }

  getQuestionCell(rowIndex: number) {
    return cy.get(`[data-testid="question-${rowIndex}"]`);
  }

  getAnswerCell(rowIndex: number) {
    return cy.get(`[data-testid="answer-${rowIndex}"]`);
  }

  getQueryStatusCell(rowIndex: number) {
    return cy.get(`[data-testid="query-status-${rowIndex}"]`).should('be.visible');
  }

  getQuestionText(rowIndex: number) {
    return this.getQuestionCell(rowIndex).invoke('text');
  }

  getAnswerText(rowIndex: number) {
    return this.getAnswerCell(rowIndex).invoke('text');
  }
  
  clickAddQueryIcon(rowIndex: number) {
    return this.getQueryStatusCell(rowIndex).find(this.addQueryIcon).click();
  }
  clickOpenQueryIcon(rowIndex:number) {
    return this.getQueryStatusCell(rowIndex).find(this.openQueryIcon).click();
  }

  clickResolvedQueryIcon(rowIndex:number) {
    return this.getQueryStatusCell(rowIndex).find(this.resolvedQueryIcon).click();
  }

  //Verify elements

  verifyRowExists(rowIndex: number) {
      return this.getTableRow(rowIndex).should('exist')
  }

  verifyQuestionText(rowIndex: number, expectedText: string) {
    return this.getQuestionText(rowIndex).should('eq', expectedText);
  }

  verifyAnswerText(rowIndex: number, expectedText: string) {
      return this.getAnswerText(rowIndex).should('eq', expectedText);
  }

  verifyAddQueryIconExists(rowIndex: number) {
    return this.getQueryStatusCell(rowIndex).find(this.addQueryIcon).should('exist');
  }
  verifyOpenQueryIconExists(rowIndex: number) {
    return this.getQueryStatusCell(rowIndex).find(this.openQueryIcon).should('exist');
  }

  verifyResolvedQueryIconExists(rowIndex: number) {
    return this.getQueryStatusCell(rowIndex).find(this.resolvedQueryIcon).should('exist');
  }
  // Method to get the query status icon in a specific row
  getQueryIcon(rowIndex: number) {
    return this.getQueryStatusCell(rowIndex).find('svg'); // Selects the SVG icon within the query status cell
  }

  //Method to get the query icon test id in a specific row
  getQueryIconTestId(rowIndex: number) {
    return this.getQueryIcon(rowIndex).invoke('attr', 'data-testid');
  }

  // Method to get the title of the query icon in a specific row
  getQueryIconTitle(rowIndex: number) {
    return this.getQueryIcon(rowIndex).find('title').invoke('text');
  }

  // Method to check if a specific query icon exists in a row.
  checkQueryIconExists(rowIndex: number, iconTestId: string) {
    return this.getQueryIconTestId(rowIndex).should('eq', iconTestId);
  }

  //Method to check the query icon title
  verifyQueryIconTitle(rowIndex: number, expectedTitle: string) {
      return this.getQueryIconTitle(rowIndex).should('eq', expectedTitle);
  }

  // Method to mouse over the query status cell and get the tooltip text
  mouseOverQueryStatusCellAndGetTooltip(rowIndex: number) {
    return this.getQueryStatusCell(rowIndex)
      .realHover() // Use realHover from cypress-real-events plugin
      .find('svg title')
      .invoke('text');
  }

  //Method to verify tooltip text
  verifyQueryStatusCellTooltip(rowIndex: number, expectedTooltip: string) {
    this.mouseOverQueryStatusCellAndGetTooltip(rowIndex).should('eq', expectedTooltip)
  }

}

export default QueryManagerPage;