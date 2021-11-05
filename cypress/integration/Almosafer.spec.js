import { searchPage, resultPage } from "../locators/index";
import { utils } from "../src/Utils";
import pages from "../fixtures/pages.json";

describe("Checking the functionality of search and filtering on almosafer website", () => {
  beforeEach(() => {
    cy.intercept(pages.searchPage.listEndpoint).as("list");
    cy.visit("/");
    utils.waitForSuccessStatus("@list", 200);
    cy.get(searchPage.logo).should("be.visible");
  });
  it("Should be able to navigate to Almosafer landing page and make sure the language is arabic by default @ID: 01", () => {
    cy.url().should("include", "/ar");
    cy.get(searchPage.landingPageHeader).should(
      "have.text",
      pages.searchPage.headerInArabic
    );
  });

  it("Should be able to change the language and to check the header in English, @ID: 02", () => {
    cy.get(searchPage.switchLanguageButton).click();
    cy.url().should("include", "/en");
    cy.get(searchPage.landingPageHeader).should(
      "have.text",
      pages.searchPage.headerInEnglish
    );
  });

  it("Should be able to select a random location and pick the first option then search, @ID: 03", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate();
    utils.searchForHotels(randomLocation, dates);
    cy.contains(`properties found in ${randomLocation}`);
  });

  it("Should be able to check the loading bar text, @ID: 04", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate();
    utils.searchForHotels(randomLocation, dates);
    cy.contains("Getting the best prices and availability").should(
      "be.visible"
    );
    cy.contains("Looking for cheaper rates").should("be.visible");
    cy.contains(`properties found in ${randomLocation}`);
  });

  it("Should be able to check the url that it includes our search criteria @ID: 05", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate();
    utils.searchForHotels(randomLocation, dates);
    cy.url().should("include", randomLocation);
    cy.url().should("include", "1_adult");
  });

  it("Should be able to sort by lowest price and check the sort functionally , @ID: 06", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate();
    utils.searchForHotels(randomLocation, dates);
    cy.get(resultPage.lowestPriceSort).click();
    cy.get(resultPage.allPriceTags).then((price) => {
      for (let i = 0; i < price.length - 1; i++) {
        expect(Number(price[i].innerHTML.split(",").join(""))).to.be.lte(
          Number(price[i + 1].innerHTML.split(",").join(""))
        );
      }
    });
  });

  it("Should be able to check the functionally of free cancellation filter, @ID: 07", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate(6, 8);
    utils.searchForHotels(randomLocation, dates);
    cy.get(resultPage.freeCancellationCheck).click({ force: true });
    cy.get(resultPage.freeCancellationLabel).then((label) => {
      cy.wrap(label).as("AllFreeCancellationLabels");
    });
    cy.get("@AllFreeCancellationLabels").then((AllFreeCancellationLabels) => {
      cy.get(resultPage.hotelCard).then((allHotelsCards) => {
        expect(allHotelsCards.length).to.equal(AllFreeCancellationLabels.length);
      });
    });
  });

  it("Should be able to check the functionally of total stay price is equal to individual day price, @ID: 08", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate(6, 8);
    utils.searchForHotels(randomLocation, dates);
    cy.get(resultPage.allPriceTags).eq(0).invoke('text').then((price) => {
      cy.wrap(price).as("totalPrice");
    })
    cy.get('#pernight').click({ force: true});
    cy.get('@totalPrice').then((totalPrice) => {
      cy.get(resultPage.allPriceTags).eq(0).invoke('text').then((pricePerNight) => {
        expect(Number(pricePerNight)*2).to.be.closeTo(Number(totalPrice), 1);
      })
    })
  });

  it.only("Should be able to check the that all the locations in the result are related to the search criteria @ID: 09", () => {
    const randomLocation = utils.getRandomLocation(0);
    const dates = utils.randomDate();
    utils.searchForHotels(randomLocation, dates);
    cy.get(resultPage.hotelAddress).then((els) => {
      [...els].forEach((el) => cy.get(el).should('contain',randomLocation));
    });
  });


  it("Should be able to check the functionally of star rating, @ID: 10", () => {
    const randomLocation = utils.getRandomLocation(0);
    const dates = utils.randomDate();
    utils.searchForHotels(randomLocation, dates);
    cy.get(resultPage.starRatingFilter('2')).click()
    cy.get(resultPage.activeStars).should('have.length', 120)
    cy.url().should("include", "STAR_RATING=3");
    cy.contains('Reset').click()
    cy.get(resultPage.starRatingFilter('1')).click()
    cy.get(resultPage.activeStars).should('have.length', 160)
    cy.url().should("include", "STAR_RATING=4");
    cy.contains('Reset').click()
    cy.get(resultPage.starRatingFilter('0')).click()
    cy.url().should("include", "STAR_RATING=5");
    cy.get(resultPage.activeStars).should('have.length', 200)
  });

  it("Should be able to check the 'Good for shoppers' label shows in every hotel card, @ID: 11", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate(6, 8);
    utils.searchForHotels(randomLocation, dates);
    cy.contains('Good for shoppers').click({ force: true})
    cy.url().should("include", "TOP_PICK=Good%20for%20shoppers");
    cy.get(resultPage.goodForShoppersLabels).then((label) => {
      cy.wrap(label).as("AllGoodForShoppersLabels");
    });
    cy.get("@AllGoodForShoppersLabels").then((AllGoodForShoppersLabels) => {
      cy.get(resultPage.hotelCard).should('have.length', AllGoodForShoppersLabels.length)
    });
  });

  it("Should be able to check the 'Luxury stay' label shows in every hotel card, @ID: 12", () => {
    const randomLocation = utils.getRandomLocation();
    const dates = utils.randomDate(6, 8);
    utils.searchForHotels(randomLocation, dates);
    cy.contains('Luxury stay').click({ force: true})
    cy.url().should("include", "TOP_PICK=Luxury%20stay");
    cy.get(resultPage.luxuryStayLabels).then((label) => {
      cy.wrap(label).as("luxuryStayLabelsLabels");
    });
    cy.get("@luxuryStayLabelsLabels").then((luxuryStayLabelsLabels) => {
      cy.get(resultPage.hotelCard).should('have.length', luxuryStayLabelsLabels.length)
    });
  });
});

