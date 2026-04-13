/**
 * Search utility functions for property filtering
 */

/**
 * Filters properties based on search criteria
 * @param {Array} properties - Array of property objects
 * @param {Object} criteria - Search criteria object
 * @returns {Array} Filtered properties
 */
export const filterProperties = (properties, criteria) => {
  return properties.filter((property) => {
    // Filter by type
    if (criteria.type && criteria.type !== 'any' && property.type.toLowerCase() !== criteria.type.toLowerCase()) {
      return false;
    }

    // Filter by price
    if (criteria.minPrice && property.price < parseFloat(criteria.minPrice)) {
      return false;
    }
    if (criteria.maxPrice && property.price > parseFloat(criteria.maxPrice)) {
      return false;
    }

    // Filter by bedrooms
    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
      return false;
    }
    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
      return false;
    }

    // Filter by postcode (first part only, e.g., BR1, BR5)
    if (criteria.postcode) {
      const postcodePattern = criteria.postcode.toUpperCase().trim();
      const propertyPostcode = property.location.match(/([A-Z]{1,2}\d{1,2})/i);
      if (!propertyPostcode || !propertyPostcode[0].toUpperCase().includes(postcodePattern)) {
        return false;
      }
    }

    // Filter by date added
    if (criteria.dateAdded || (criteria.dateFrom && criteria.dateTo)) {
      const propertyDate = new Date(
        property.added.year,
        getMonthNumber(property.added.month),
        property.added.day
      );

      if (criteria.dateAdded) {
        const searchDate = new Date(criteria.dateAdded);
        if (propertyDate < searchDate) {
          return false;
        }
      }

      if (criteria.dateFrom && criteria.dateTo) {
        const fromDate = new Date(criteria.dateFrom);
        const toDate = new Date(criteria.dateTo);
        if (propertyDate < fromDate || propertyDate > toDate) {
          return false;
        }
      }
    }

    return true;
  });
};

/**
 * Converts month name to number (0-11)
 * @param {string} monthName - Name of the month
 * @returns {number} Month number
 */
const getMonthNumber = (monthName) => {
  const months = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };
  return months[monthName.toLowerCase()];
};

/**
 * Formats price with currency symbol and thousands separator
 * @param {number} price - Price value
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return `£${price.toLocaleString()}`;
};

/**
 * Gets postcode area from full location string
 * @param {string} location - Full location string
 * @returns {string} Postcode area
 */
export const getPostcodeArea = (location) => {
  const match = location.match(/([A-Z]{1,2}\d{1,2})/i);
  return match ? match[0] : '';
};