import { useState } from 'react'
import './SearchForm.css'

/**
 * SearchForm Component - Allows users to search properties by various criteria
 * Uses HTML5 form inputs with enhanced styling
 */
const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAdded: '',
    dateFrom: '',
    dateTo: '',
  })

  const [dateSearchType, setDateSearchType] = useState('after') // 'after' or 'between'

  // Handle input changes with HTML encoding for security
  const handleChange = (e) => {
    const { name, value } = e.target
    // HTML encode the value to prevent XSS
    const encodedValue = encodeHTML(value)
    setFormData((prev) => ({
      ...prev,
      [name]: encodedValue,
    }))
  }

  // HTML encoding function for security
  const encodeHTML = (str) => {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Prepare search criteria based on date search type
    const criteria = { ...formData }
    if (dateSearchType === 'after') {
      delete criteria.dateFrom
      delete criteria.dateTo
    } else {
      delete criteria.dateAdded
    }
    
    onSearch(criteria)
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateAdded: '',
      dateFrom: '',
      dateTo: '',
    })
    setDateSearchType('after')
    onSearch({})
  }

  return (
    <div className="search-form-container">
      <h2>Search Properties</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minPrice">Min Price (£)</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
              min="0"
              step="1000"
              placeholder="No min"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (£)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              min="0"
              step="1000"
              placeholder="No max"
              className="form-control"
            />
          </div>
        </div>

        {/* Bedrooms Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms</label>
            <input
              type="number"
              id="minBedrooms"
              name="minBedrooms"
              value={formData.minBedrooms}
              onChange={handleChange}
              min="0"
              max="10"
              placeholder="No min"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms</label>
            <input
              type="number"
              id="maxBedrooms"
              name="maxBedrooms"
              value={formData.maxBedrooms}
              onChange={handleChange}
              min="0"
              max="10"
              placeholder="No max"
              className="form-control"
            />
          </div>
        </div>

        {/* Postcode */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="e.g. BR1, NW1"
            className="form-control"
            pattern="[A-Za-z]{1,2}\d{1,2}"
            title="Enter postcode area (e.g., BR1, NW1)"
          />
        </div>

        {/* Date Search Type Selection */}
        <div className="form-group">
          <label>Date Added</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="dateSearchType"
                value="after"
                checked={dateSearchType === 'after'}
                onChange={(e) => setDateSearchType(e.target.value)}
              />
              After specified date
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="dateSearchType"
                value="between"
                checked={dateSearchType === 'between'}
                onChange={(e) => setDateSearchType(e.target.value)}
              />
              Between two dates
            </label>
          </div>
        </div>

        {/* Date Inputs based on selection */}
        {dateSearchType === 'after' ? (
          <div className="form-group">
            <label htmlFor="dateAdded">Date Added After</label>
            <input
              type="date"
              id="dateAdded"
              name="dateAdded"
              value={formData.dateAdded}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ) : (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateFrom">From Date</label>
              <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateTo">To Date</label>
              <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Search Properties
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm;