import { filterProperties, formatPrice, getPostcodeArea } from '../utils/searchUtils';

// Test data
const mockProperties = [
  {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    location: 'Petts Wood Road, Petts Wood, Orpington BR5',
    added: { month: 'October', day: 12, year: 2022 }
  },
  {
    id: 'prop2',
    type: 'Flat',
    bedrooms: 2,
    price: 399995,
    location: 'Crofton Road Orpington BR6',
    added: { month: 'September', day: 14, year: 2022 }
  },
  {
    id: 'prop3',
    type: 'House',
    bedrooms: 4,
    price: 925000,
    location: 'Chislehurst Road, Chislehurst BR7',
    added: { month: 'November', day: 5, year: 2022 }
  }
];

describe('searchUtils Tests', () => {
  /**
   * Test 1: Filter by property type
   */
  test('should filter properties by type', () => {
    const criteria = { type: 'house' };
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(2);
    expect(result.every(p => p.type.toLowerCase() === 'house')).toBe(true);
  });

  /**
   * Test 2: Filter by price range
   */
  test('should filter properties by price range', () => {
    const criteria = { minPrice: '400000', maxPrice: '800000' };
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prop1');
    expect(result[0].price).toBeGreaterThanOrEqual(400000);
    expect(result[0].price).toBeLessThanOrEqual(800000);
  });

  /**
   * Test 3: Filter by number of bedrooms
   */
  test('should filter properties by bedroom count', () => {
    const criteria = { minBedrooms: '3', maxBedrooms: '4' };
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(2);
    expect(result.every(p => p.bedrooms >= 3 && p.bedrooms <= 4)).toBe(true);
  });

  /**
   * Test 4: Filter by postcode area
   */
  test('should filter properties by postcode area', () => {
    const criteria = { postcode: 'BR5' };
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(1);
    expect(result[0].location).toContain('BR5');
  });

  /**
   * Test 5: Filter by multiple criteria (type and price)
   */
  test('should filter properties by multiple criteria', () => {
    const criteria = { 
      type: 'house',
      minPrice: '700000',
      maxPrice: '800000'
    };
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('House');
    expect(result[0].price).toBe(750000);
  });

  /**
   * Test 6: Format price correctly
   */
  test('should format price with currency symbol and thousands separator', () => {
    expect(formatPrice(750000)).toBe('£750,000');
    expect(formatPrice(399995)).toBe('£399,995');
    expect(formatPrice(1250000)).toBe('£1,250,000');
  });

  /**
   * Test 7: Extract postcode area from location
   */
  test('should extract postcode area from location string', () => {
    expect(getPostcodeArea('Petts Wood Road, Petts Wood, Orpington BR5')).toBe('BR5');
    expect(getPostcodeArea('Crofton Road Orpington BR6')).toBe('BR6');
    expect(getPostcodeArea('Station Approach, Bromley BR1')).toBe('BR1');
  });

  /**
   * Test 8: Return all properties when no criteria provided
   */
  test('should return all properties when no criteria provided', () => {
    const criteria = {};
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(3);
  });

  /**
   * Test 9: Return empty array when no properties match criteria
   */
  test('should return empty array when no properties match', () => {
    const criteria = { minPrice: '2000000' };
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(0);
  });

  /**
   * Test 10: Filter with 'any' type should include all types
   */
  test('should include all property types when type is "any"', () => {
    const criteria = { type: 'any' };
    const result = filterProperties(mockProperties, criteria);
    
    expect(result).toHaveLength(3);
  });
});