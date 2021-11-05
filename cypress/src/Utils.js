import { searchPage } from "../locators/index";

export class Utils {
  /**
   * @description Checks the status code for the given API call and ensures it's 2xx
   * @param alias alias for the intercepted API call, so we can wait refer it with "@alias"
   * @param {number} statusCode the status code for the intercepted API call
   */

  waitForSuccessStatus = (alias, statusCode) => {
    cy.wait(alias).then(({ response }) => {
      expect(response.statusCode).to.eq(statusCode);
    });
  };

  /**
   * @description Generate a random check-in and check-out dates by default.
   *
   * @param {number} checkIn the number of days to be added to todays date for the check in date(default value is random between 1 and 10).
   * @param {number} checkOut the number of days to be added to todays date for the check out date(default value is random between 1 and 7).
   *
   */

  randomCheckInDate = Math.floor(Math.random() * 10) + 1;
  randomCheckOutDate =
    this.randomCheckInDate + Math.floor(Math.random() * 7) + 1;
  randomDate = (
    checkIn = this.randomCheckInDate,
    checkOut = this.randomCheckOutDate
  ) => {
    const today = new Date();
    if (checkOut - checkIn > 7) {
      Cypress.log({
        name: "Error",
        message:
          "The days difference between check-in and check-out should be more than 7 days",
      });
    } else if (checkIn > checkOut) {
      Cypress.log({
        name: "Error",
        message: "Check-in date can not be greater than check-out date",
      });
    }
    const checkInDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + checkIn
    );
    const checkOutDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + checkOut
    );
    const dates = {
      checkIn: checkInDate.toDateString(),
      checkOut: checkOutDate.toDateString(),
    };
    return dates;
  };

  /**
   * @description Selects a random location from a predefined array of locations.
   */
  location = ["Duba", "Jedda", "Makkah", "Riyadh"];
  randomLocation = Math.floor(Math.random() * this.location.length);
  getRandomLocation = (index = this.randomLocation) => {
    return this.location[index];
  };

  /**
   * @description Selects a location and date and clicks search.
   * @param {number} location a location from a predefined array of locations.
   * @param {number} dates check-in and check-out dates.
   */

  searchForHotels = (location, dates) => {
    cy.get(searchPage.switchLanguageButton).click();
    cy.get(searchPage.locationInput).type(location);
    cy.get(searchPage.firstLocationOption).click();
    cy.get(searchPage.getValue(location)).should("be.visible");
    cy.get(searchPage.checkInInput).click();
    cy.get(searchPage.getLabel(dates.checkIn)).should(
      "have.attr",
      "aria-disabled",
      "false"
    );
    cy.get(searchPage.getLabel(dates.checkIn)).click();
    cy.get(searchPage.getLabel(dates.checkOut)).should(
      "have.attr",
      "aria-disabled",
      "false"
    );
    cy.get(searchPage.getLabel(dates.checkOut)).click();
    cy.get(searchPage.numberOfPeople).select("1 Room, 1 Adult, 0 Children");
    cy.get(searchPage.searchButton).click();
  };
}

export const utils = new Utils();
