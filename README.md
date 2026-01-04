# Estate Agent Web Application


**📁 GitHub Repository**: https://github.com/Pasandul-pro/estate-agent-app

---

A modern, responsive single-page application (SPA) for searching and browsing property listings, built with React and Vite.

## Features

- **Advanced Property Search**: Filter by type, price, bedrooms, postcode, and date added
- **Interactive UI**: Enhanced form elements with React components
- **Property Details**: View comprehensive property information with image gallery
- **Favourites Management**: Add/remove properties using drag-and-drop or buttons
- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile devices
- **Client-Side Security**: CSP headers and HTML encoding implementation
- **Image Gallery**: View multiple property images with thumbnail navigation
- **Tabbed Interface**: Organized property details with React Tabs

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **React DnD** - Drag and drop functionality
- **React Tabs** - Tabbed interface
- **Jest** - Testing framework
- **CSS3** - Styling with Flexbox and Grid

## Installation

1. Install dependencies:
```bash
npm install
```

2. Add property images to `public/images/` folder:
   - prop1pic1.jpg through prop1pic8.jpg
   - prop1floorplan.jpg
   - (Repeat for prop2 through prop7)

## Running the Application

### Development Mode
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Running Tests

```bash
npm test
```

The test suite includes 10 comprehensive tests covering:
- Property filtering by type, price, bedrooms, postcode
- Multiple criteria filtering
- Price formatting
- Postcode extraction
- Edge cases


## Project Structure

```
estate-agent-app/
├── public/
│   └── images/              # Property images
├── src/
│   ├── components/          # React components
│   │   ├── SearchForm.jsx
│   │   ├── PropertyList.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyDetails.jsx
│   │   ├── FavouritesList.jsx
│   │   └── ImageGallery.jsx
│   ├── data/
│   │   └── properties.json  # Property data
│   ├── utils/
│   │   └── searchUtils.js   # Search utility functions
│   ├── __tests__/           # Test files
│   ├── App.jsx              # Main App component
│   ├── App.css              # Global styles
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## Key Features Implementation

### Search Functionality
- Supports searching by 1-5 criteria simultaneously
- Real-time filtering of properties
- Case-insensitive postcode matching

### Favourites System
- Drag and drop properties to favourites list
- Click favourite button on property cards
- Prevent duplicate entries
- Remove by dragging to drop zone or clicking delete button
- Clear all favourites option

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px (mobile) and 1024px (tablet)
- Flexbox and Grid layouts
- Hand-written media queries

### Security
- Content Security Policy (CSP) headers in Vite config
- HTML encoding for user inputs
- No inline scripts or styles

### Code Quality
- Clean, well-commented code
- Consistent formatting and indentation
- Modular component structure
- Reusable utility functions

## Assessment Criteria Coverage

1. JSON Data (7 properties with variety)  
2. React UI Widgets (Enhanced form elements)  
3. Search Functionality (Multi-criteria search)  
4. Results Display (Attractive property cards)  
5. Property Page Gallery (6-8 images with navigation)  
6. Property Page Tabs (Description, floor plan, map)  
7. Add to Favourites (Drag & drop + button)  
8. Remove/Clear Favourites (Multiple methods)  
9. Display Favourites (Sidebar on search page)  
10. Responsive Design (Two layouts with media queries)  
11. Aesthetics (Professional, cohesive design)  
12. Security (CSP + HTML encoding)  
13. Code Quality (Well-structured and documented)  
14. GitHub & Commits (Version control ready)  
15. Deployment (Vite build for static hosting)  
16. JEST Testing (10 meaningful tests)  

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes as part of the 5COSC026W Advanced Client-Side Web Development coursework.

## Author

[Omisha Pasandul Wickramaarachchi] 
w2153411 
Undergraduate
University of Westminster  


## Submission Checklist

- [ ] All 7 properties added to JSON with images
- [ ] Search functionality working for all criteria
- [ ] Favourites system fully functional
- [ ] Responsive design implemented
- [ ] Tests passing (minimum 5)
- [ ] Code pushed to GitHub with commit history
- [ ] Application deployed to live URL
- [ ] README updated with deployment URL
- [ ] node_modules removed from zip
- [ ] Viva preparation completed