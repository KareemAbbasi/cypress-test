/// <reference types="cypress" />

describe("Products Page Test Suite", () => {
    it("Login to products page test", () => {
        const username = "lumigo@test.com";
        const password = "123456";

        cy.visit("https://akita.surge.sh")
        cy.contains("Email").click()
        cy.get("[formcontrolname=email]").type(username)

        cy.contains("Password").click()
        cy.get("[formcontrolname=password]").type(password)

        cy.contains("Submit").click()

        cy.contains("Products").should('contain.text', 'Products')
    })

    it("Search for \"angular\" test", () => {
        const numAngularProducts = 1;
        cy.get("input").type("angular")
        cy.get("app-product").should('have.length', numAngularProducts)
    })

    it("Clear search test", () => {
        const numProducts = 3;
        cy.get("input").clear()
        cy.get("app-product").should('have.length', numProducts)
    })

    it("Sort by price test", () => {
        cy.get("select").select("Price")
        cy.get("app-product").first().contains("JavaScript")
    })

    it("Add to cart test", () => {
        cy.get("app-product").should('have.length', 3)
        
        cy.get("[routerlink=cart]").contains("0")
        cy.get("app-product").each(($el) => {
            cy.wrap($el).contains("exposure_plus_1").click()
        })

        cy.get("[routerlink=cart]").contains("3")
    })
})