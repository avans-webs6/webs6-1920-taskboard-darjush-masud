/// <reference types="Cypress" />




describe('Home Page', () => {
    it('should login', () => {
      let username = "redhood@gmail.com";
      let password = "hallo123";
      cy.visit('/sign-in'); 
  
  
      cy.get('.title')
        .should('contain.text', 'Sign In');
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('#login').click();
        cy.url().should('contain', '/dashboard');

    });
  });