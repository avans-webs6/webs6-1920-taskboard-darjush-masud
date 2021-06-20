// /// <reference types="Cypress" />



describe('Project Page', () => {
    it('should assign member to project', () => {
        cy.visit('/project/QX3Y8G4Ysa862AUbOS5i');
        cy.wait(7500);

        cy.get('#addMemberButton').click();
        cy.get('.selectMember').select('7masudr')
        cy.get("#addMember").click();
        cy.get('#membersTable').find('tr').its('length').should('be.gte', 1)

    });
});


describe('Project Page', () => {
    it('should create user story', () => {
        let storyName = "story 88";
        let storyDescription = "new story";
        let storyPoints = 24;

        cy.visit('/project/QX3Y8G4Ysa862AUbOS5i');
        cy.wait(3500); 

        cy.get('#addUserStoryButton').click();
        cy.get('#userstoryName').type(storyName);
        cy.get('#userstoryDescription').type(storyDescription);
        cy.get('#storyPoints').type(storyPoints);
        cy.get('.selectMemberSelect').select('7masudr')
        cy.get("#createUserStoryButton").click();
        cy.get('#userstoryTable').find('tr').its('length').should('be.gte', 1)

    });
});


describe('Project Page', () => {
    it('should create sprint', () => {
        let sprintName = "sprint awesome";
        let sprintDescription = "awesome description";
        let startdate = "6/24/2021";
        let enddate = "6/27/2021";
        cy.visit('/project/QX3Y8G4Ysa862AUbOS5i');
        cy.wait(3500);

        cy.get('#addSprintButton').click();
        cy.get('#sprintName').type(sprintName);
        cy.get('#sprintDescription').type(sprintDescription);
        cy.get('#startdateValue').type(startdate);
        cy.get('#enddateValue').type(enddate);
        cy.get("#createSprintButton").click();
        cy.get('#sprintTable').find('tr').its('length').should('be.gte', 1)

    });
});

