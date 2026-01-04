import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/searchUtils'
import './PropertyCard.css'

/**
 * PropertyCard Component - Displays individual property information
 * Supports drag-and-drop functionality
 */
const PropertyCard = ({ property, onAddToFavourites }) => {
  // Setup drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: property,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Link to={`/property/${property.id}`} className="property-link">
        <div className="property-image">
          <img src={property.picture} alt={property.location} />
          <div className="property-type-badge">{property.type}</div>
        </div>
      </Link>
      
      <div className="property-info">
        <h3 className="property-price">{formatPrice(property.price)}</h3>
        <p className="property-location">{property.location}</p>
        <p className="property-details">
          {property.bedrooms} bedroom {property.type} • {property.tenure}
        </p>
        <p className="property-description">
          {property.description.substring(0, 100)}...
        </p>
        
        <div className="property-actions">
          <Link to={`/property/${property.id}`} className="btn btn-outline">
            View Details
          </Link>
          <button
            onClick={() => onAddToFavourites(property)}
            className="btn btn-favourite"
            title="Add to favourites"
          >
            ★ Favourite
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard