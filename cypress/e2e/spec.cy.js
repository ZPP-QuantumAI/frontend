beforeEach(() => {
  cy.visit("http://localhost:5173/");
});

describe.skip("graph tests", () => {
  it("create and delete euclidean graph", () => {
    const name = "Cypress test euclidean graph " + Date.now();
    createEuclideanGraph(name);
    deleteGraph(name);
  });

  it("create and delete map graph, list variant", () => {
    const name = "Cypress test map graph " + Date.now();
    cy.get("#radix-\\:rk\\:").contains("Graph").click();
    cy.get("div.relative:nth-child(2)")
      .contains("Add map graph")
      .click();
    cy.get("#radix-\\:r19\\:-trigger-list").contains("Add manually").click();
    cy.get("#\\:r1j\\:-form-item").type(name);
    cy.get("#\\:r1l\\:-form-item").type("0 0");
    cy.get(".bg-primary").contains("Add").click();
    deleteGraph(name);
  });

  it("create and delete map graph, list variant", () => {
    const name = "Cypress test map graph " + Date.now();
    createMapGraph(name);
    deleteGraph(name);
  });
});

describe.skip("package tests", () => {
  it("create and delete package", () => {
    const euclideanGraph = "Cypress test euclidean graph " + Date.now();
    const mapGraph = "Cypress test map graph " + Date.now();
  });
});

function createEuclideanGraph(name) {
  cy.get("#radix-\\:rk\\:").contains("Graph").click();
  cy.get("div.cursor-default:nth-child(1)")
    .contains("Add euclidean graph")
    .click();
  cy.get("#\\:r19\\:-form-item").type(name);
  cy.get("#\\:r1b\\:-form-item").type("0 0");
  cy.get(".bg-primary").contains("Add").click();
}

function createMapGraph(name) {
  cy.get("#radix-\\:rk\\:").contains("Graph").click();
    cy.get("div.relative:nth-child(2)")
      .contains("Add map graph")
      .click();
    cy.get("#\\:r1f\\:-form-item").type(name);
    cy.get('.h-\\[40vh\\]').click();
    cy.get('div.flex:nth-child(3) > button:nth-child(2)').contains("Add").click();
}

function deleteGraph(name) {
  cy.wait(1000);
  cy.get("body").click();
  cy.get("#radix-\\:rc\\:").contains("Package").click();
  cy.get("div.cursor-default:nth-child(1)").contains("Add package").click();
  cy.get(
    "div.rounded-md:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2)"
  )
    .contains(name)
    .parent()
    .parent()
    .find("td:nth-child(5) > button:nth-child(1)")
    .click();
  cy.contains(name).should("not.exist");
}
