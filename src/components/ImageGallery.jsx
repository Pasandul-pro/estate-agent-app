import { useState } from 'react'
import './ImageGallery.css'

/**
 * ImageGallery Component - Displays property images with thumbnails
 * Allows navigation between images
 */
const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="image-gallery">
      <div className="main-image-container">
        <img
          src={images[currentImageIndex]}
          alt={`Property view ${currentImageIndex + 1}`}
          className="main-image"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="gallery-nav gallery-nav-prev"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="gallery-nav gallery-nav-next"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery;