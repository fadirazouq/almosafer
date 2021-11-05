export default {
  searchPage: {
    checkInInput: '[data-testid=HotelsSearchBox__FromDateButton]',
    firstLocationOption:'[data-testid=AutoCompleteResultItem0]',
    getLabel: (value) => `[aria-label="${value}"]`,
    getValue: (value) => `[value*="${value}"]`,
    landingPageHeader: '.HeaderHeroHomestyled__Title-n8lfyg-2',
    locationInput: '[data-testid=AutoCompleteInput]',
    logo: '[data-testid=Header__Logo]',
    lowestPriceSort:'[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]',
    numberOfPeople:'[data-testid="HotelSearchBox__ReservationSelect_Select"]',
    searchButton:'[data-testid=HotelSearchBox__SearchButton]',
    switchLanguageButton: '[data-testid=Header__LanguageSwitch]',
  },
  resultPage: {
    // I was forced to use this selector here, i hate it, what i would do is ask for a data-testid for active starts
    activeStars:'[id^="hotelCard"]> div > div >  div > div > div > div  > svg[role="presentation"][size="16"]',
    allPriceTags:'[data-testid$="PriceLabel"] > .Price__Value',
    freeCancellationCheck:'[data-testid="HotelSearchResult__filters__popularFilters__0"]',
    freeCancellationLabel:'[data-testid$="freeCancellationLabel"]',
    goodForShoppersLabels:'[src$="good_shoppers.png"]',
    hotelAddress:'[data-testid$="address"]',
    hotelCard:'[id^="hotelCard"]',
    lowestPriceSort:'[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]',
    luxuryStayLabels:'[src$="luxury_stay.png"]',
    starRatingFilter: (value) => `[for=star-rating-${value}]`,
  },
};
