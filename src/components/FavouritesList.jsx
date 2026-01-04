import { useDrop, useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/searchUtils'
import './FavouritesList.css'

/**
 * FavouriteItem Component - Individual favourite property item with drag functionality
 */
const FavouriteItem = ({ property, onRemove }) => {
  // Setup drag functionality for removing
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FAVOURITE',
    item: property,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`favourite-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Link to={`/property/${property.id}`} className="favourite-link">
        <img src={property.picture} alt={property.location} />
        <div className="favourite-info">
          <p className="favourite-price">{formatPrice(property.price)}</p>
          <p className="favourite-location">{property.location}</p>
        </div>
      </Link>
      <button
        onClick={() => onRemove(property.id)}
        className="btn-remove"
        title="Remove from favourites"
      >
        ✕
      </button>
    </div>
  )
}

/**
 * RemoveDropZone Component - Drop zone for removing favourites
 */
const RemoveDropZone = () => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FAVOURITE',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      className={`remove-drop-zone ${isOver ? 'active' : ''}`}
    >
      🗑️ Drag here to remove
    </div>
  )
}

/**
 * FavouritesList Component - Displays and manages favourite properties
 * Accepts drag-and-drop for adding and removing properties
 */
const FavouritesList = ({ favourites, onRemove, onClear, onAddToFavourites }) => {
  // Setup drop functionality for adding favourites
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => onAddToFavourites(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      className={`favourites-list ${isOver ? 'drag-over' : ''}`}
    >
      <h2>Favourite Properties</h2>
      {favourites.length === 0 ? (
        <p className="empty-message">
          No favourites yet. Drag properties here or click the favourite button!
        </p>
      ) : (
        <>
          <div className="favourites-items">
            {favourites.map((property) => (
              <FavouriteItem
                key={property.id}
                property={property}
                onRemove={onRemove}
              />
            ))}
          </div>
          <RemoveDropZone />
          <button onClick={onClear} className="btn btn-danger btn-block">
            Clear All Favourites
          </button>
        </>
      )}
    </div>
  )
}

export default FavouritesList