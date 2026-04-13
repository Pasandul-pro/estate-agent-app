import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ImageGallery from './ImageGallery'
import { formatPrice, getPostcodeArea } from '../utils/searchUtils'
import './PropertyDetails.css'

/**
 * PropertyDetails Component - Displays full details of a property
 * Includes image gallery, tabs for description/floorplan/map
 */
const PropertyDetails = ({ properties, favourites, onAddToFavourites }) => {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)
  const isFavourite = favourites.some((fav) => fav.id === id)

  if (!property) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Property Not Found</h2>
          <Link to="/" className="btn btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  const handleFavouriteClick = () => {
    onAddToFavourites(property)
  }

  // Generate Google Maps URL
  const postcodeArea = getPostcodeArea(property.location)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
    property.location
  )}`
  const mapFallbackUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    property.location
  )}&output=embed`

  return (
    <div className="property-details">
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to Search
        </Link>

        <div className="property-header">
          <div className="property-header-info">
            <h1>{property.location}</h1>
            <p className="property-price-large">{formatPrice(property.price)}</p>
            <p className="property-meta">
              {property.bedrooms} bedroom {property.type} • {property.tenure}
            </p>
          </div>
          <button
            onClick={handleFavouriteClick}
            className={`btn ${isFavourite ? 'btn-favourite-active' : 'btn-favourite'}`}
          >
            {isFavourite ? '★ Favourited' : '☆ Add to Favourites'}
          </button>
        </div>

        <ImageGallery images={property.images} />

        <div className="property-tabs">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Location Map</Tab>
            </TabList>

            <TabPanel>
              <div className="tab-content">
                <h2>Property Description</h2>
                <p>{property.description}</p>
                <div className="property-details-grid">
                  <div className="detail-item">
                    <strong>Property Type:</strong> {property.type}
                  </div>
                  <div className="detail-item">
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </div>
                  <div className="detail-item">
                    <strong>Price:</strong> {formatPrice(property.price)}
                  </div>
                  <div className="detail-item">
                    <strong>Tenure:</strong> {property.tenure}
                  </div>
                  <div className="detail-item">
                    <strong>Location:</strong> {property.location}
                  </div>
                  <div className="detail-item">
                    <strong>Date Added:</strong> {property.added.day}{' '}
                    {property.added.month} {property.added.year}
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="tab-content">
                <h2>Floor Plan</h2>
                <div className="floorplan-container">
                  <img
                    src={property.floorplan}
                    alt="Property Floor Plan"
                    className="floorplan-image"
                  />
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="tab-content">
                <h2>Location</h2>
                <div className="map-container">
                  <iframe
                    src={mapFallbackUrl}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location Map"
                  ></iframe>
                </div>
                <p className="map-note">
                  <strong>Location:</strong> {property.location}
                </p>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails;