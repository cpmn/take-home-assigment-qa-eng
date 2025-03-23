export class QueryApiService {
    // Base URL (if applicable)
    baseUrl = '/api/queries'; // Adjust to your API base URL
  
    // Method to get query data
    getQueries() {
      return cy.request({
        method: 'GET',
        url: `${this.baseUrl}`,
      });
    } 
    
  }
  
  export default new QueryApiService();