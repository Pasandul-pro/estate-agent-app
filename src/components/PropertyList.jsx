import PropertyCard from './PropertyCard'
import './PropertyList.css'

/**
 * PropertyList Component - Displays a list of property cards
 */
const PropertyList = ({ properties, onAddToFavourites }) => {
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria to see more results.</p>
      </div>
    )
  }

  return (
    <div className="property-list">
      <h2 className="results-heading">
        {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
      </h2>
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onAddToFavourites={onAddToFavourites}
          />
        ))}
      </div>
    </div>
  )
}

export default PropertyList;