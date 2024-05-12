beforeEach(() => {
  cy.visit("http://localhost:4173/");
  cy.get("button.flex:nth-child(1)").contains("Algorithm").click();
});

describe("graph tests", () => {
  it("create and delete euclidean graph", () => {
    const name = "Cypress test euclidean graph " + Date.now();
    createEuclideanGraph(name);
    deleteGraph(name);
  });

  it("create and delete map graph, list variant", () => {
    const name = "Cypress test map graph " + Date.now();
    cy.get("button.flex:nth-child(3)").contains("Graph").realHover();
    cy.get("div.relative:nth-child(2)").contains("Add map graph").click();
    cy.get("button.transition-all:nth-child(2)")
      .contains("Add manually")
      .click();
    cy.get("input.flex").type(name);
    cy.get("textarea.flex").type("0 0");
    cy.get(".bg-primary").contains("Add").click();
    deleteGraph(name);
  });

  it("create and delete map graph, map variant", () => {
    const name = "Cypress test map graph " + Date.now();
    createMapGraph(name);
    deleteGraph(name);
  });
});

describe("package tests", () => {
  it("create and delete package", () => {
    const name = "Cypress test package " + Date.now();
    createPackage(name);
    deletePackage(name);
  });
});

describe("run test", () => {
  it("select algorithm and package and run test", () => {
    const name = "Cypress test algorithm " + Date.now();
    const packageName = "Cypress test package " + Date.now();
    cy.get("button.flex:nth-child(1)").contains("Algorithm").realHover();
    cy.get("div.cursor-default:nth-child(1)")
      .contains("Select algorithm")
      .click();
    cy.get("div.space-y-2:nth-child(1) > input:nth-child(2)").type(name);
    cy.get("div.space-y-2:nth-child(2) > input:nth-child(2)").selectFile(
      "cypress/fixtures/run.zip"
    );
    cy.get(".bg-primary").contains("Select").click();
    cy.get(".bg-primary").should("not.exist");
    createPackage(packageName);
    selectPackage(packageName);
    deletePackage(packageName);
    cy.get("button.justify-center:nth-child(7)").click();
    cy.get(".\\[\\&_tr\\:last-child\\]\\:border-0 > tr:nth-child(1)").contains(name);
    cy.get(".\\[\\&_tr\\:last-child\\]\\:border-0 > tr:nth-child(1)").contains(packageName);
    cy.get(".lucide-check");
  });
});

function createPackage(name) {
  const euclideanGraph = "Cypress test euclidean graph " + Date.now();
  const mapGraph = "Cypress test map graph " + Date.now();
  createEuclideanGraph(euclideanGraph);
  createMapGraph(mapGraph);

  cy.get("button.flex:nth-child(2)").contains("Package").realHover();
  cy.get("div.cursor-default:nth-child(1)").contains("Add package").click();
  cy.get("input.flex").type(name);
  selectGraph(euclideanGraph);
  selectGraph(mapGraph);
  cy.get(".bg-primary").contains("Add").click();
  cy.get(".bg-primary").should("not.exist");

  deleteGraph(euclideanGraph);
  deleteGraphIn(mapGraph);
  cy.get(".absolute").click();
}

function deletePackage(name) {
  cy.get("button.flex:nth-child(2)").contains("Package").realHover();
  cy.get("div.relative:nth-child(2)").contains("Select packages").click();
  cy.get(
    ".h-full > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2)"
  )
    .contains(name)
    .parent()
    .find("td:nth-child(4) > button:nth-child(1)")
    .click();
  cy.get(name).should("not.exist");
  cy.get(".absolute").click();
}

function selectPackage(name) {
  cy.get("button.flex:nth-child(2)").contains("Package").realHover();
  cy.get("div.relative:nth-child(2)").contains("Select packages").click();
  cy.get(
    ".h-full > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2)"
  )
    .contains(name)
    .parent()
    .find("td:nth-child(1) > button:nth-child(1)")
    .click();
  cy.get(".bg-primary").click();
}

function createEuclideanGraph(name) {
  cy.get("button.flex:nth-child(3)").contains("Graph").realHover();
  cy.get("div.cursor-default:nth-child(1)")
    .contains("Add euclidean graph")
    .click();
  cy.get("input.flex").type(name);
  cy.get("textarea.flex").type("0 0");
  cy.get(".bg-primary").contains("Add").click();
  cy.get(".bg-primary").should("not.exist");
}

function createMapGraph(name) {
  cy.get("button.flex:nth-child(3)").contains("Graph").realHover();
  cy.get("div.relative:nth-child(2)").contains("Add map graph").click();
  cy.get("input.flex").type(name);
  cy.get(".h-\\[40vh\\]").click();
  cy.get("div.flex:nth-child(3) > button:nth-child(2)").contains("Add").click();
  cy.get("div.flex:nth-child(3) > button:nth-child(2)").should("not.exist");
}

function deleteGraph(name) {
  cy.get("button.flex:nth-child(2)").contains("Package").realHover();
  cy.get("div.cursor-default:nth-child(1)").contains("Add package").click();
  deleteGraphIn(name);
}

function deleteGraphIn(name) {
  getGraph(name).find("td:nth-child(5) > button:nth-child(1)").click();
  cy.contains(name).should("not.exist");
}

function getGraph(name) {
  return cy
    .get(
      "div.rounded-md:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2)"
    )
    .contains(name)
    .parent()
    .parent();
}

function selectGraph(name) {
  getGraph(name).find("td:nth-child(1) > button:nth-child(1)").click();
}
