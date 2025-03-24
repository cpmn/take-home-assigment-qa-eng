
interface Query {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  formDataId: string;
}

interface FormDataItem {
  id: string;
  question: string;
  answer: string;
  query: Query | null;
}

export class QueryApiService {
    // Base URL (if applicable)
    baseUrl = 'http://localhost:8080'; // Adjust to your API base URL
  
    // Method to get all query data
    getQueries() {
      return cy.request({
        method: 'GET',
        url: `${this.baseUrl}/form-data`,
      });
    }
    // Method to create a query
    createQuery(queryData: any) {
      return cy.request({
        method: 'POST',
        url: `${this.baseUrl}/queries`,
        body: queryData,
      });
    }
    // Method to update a query
    resolveQuery(queryId: string, queryData: any) {
      return cy.request({
        method: 'PUT',
        url: `${this.baseUrl}/queries/${queryId}`,
        body: queryData,
      });
    }
    // Method to delete a query
    deleteQuery(queryId: string) {
      return cy.request({
        method: 'DELETE',
        url: `${this.baseUrl}/queries/${queryId}`,
      });
    }
    // Delete an array of queries
    deleteQueries(queryIds: string[]) {
      return cy.wrap(null).then(() => { // Use cy.wrap to start a chain
        const deletePromises = queryIds.map((queryId) => {
          return this.deleteQuery(queryId).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
  
        return Cypress.Promise.all(deletePromises); // Wait for all deletions to complete
      });
    }


    findQueryByQueryId(queryId: string, attribute: string): Cypress.Chainable<any> {
      return this.getQueries().then((response) => {
        expect(response.status).to.eq(200);
  
        if (!response.body.data.formData) {
          throw new Error('API response does not contain the expected data.formData');
        }
  
        const formDataArray: FormDataItem[] = response.body.data.formData;
  
        for (const item of formDataArray) {
          if (item.query && item.query.id === queryId) {
            return cy.wrap(item.query);
            //return item.query[attribute];
          }
        }
  
        //return cy.wrap(null); // Query not found
      });
    }
  }
  
  export default new QueryApiService();