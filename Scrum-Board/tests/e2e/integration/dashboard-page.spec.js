/// <reference types="Cypress" />



describe('Dashboard Page', () => {
    it('should create a project', () => {
      let projectName = "project Avans";
      let projectDescription = "eerste project avans";
      cy.visit('/dashboard'); 
  
        cy.get('#addProject').click();
        cy.get('#projectName').type(projectName);
        cy.get('#projectDescription').type(projectDescription);
        cy.wait(500);
        cy.get('#createProject').click();
        cy.get('#activeProjects').find('tr').its('length').should('be.gte', 1)
    });
  });

 