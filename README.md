# Accessible Enterprise Dashboard & Product Explorer

A production-ready responsive web application that combines an accessible enterprise dashboard with a dynamic product explorer powered by a public REST API.

## Project Overview

This project demonstrates a modern front-end architecture using semantic HTML, responsive CSS, and modular JavaScript. The application provides an accessible dashboard, interactive product catalog, client-side filtering and sorting, simulated cart state, and persistent browser storage.

## Live Demo

https://sonampatel7307-eng.github.io/Accessibility-Audit-Submission/

## Features

* Responsive mobile-first dashboard
* Accessible semantic HTML structure
* CSS design tokens using custom properties
* CSS Grid and Flexbox layouts
* Responsive breakpoints for 320px, 768px, 1024px, and 1440px
* Live product data from Fake Store API
* Dynamic product search
* Category filtering
* Price sorting
* Add to Cart interaction
* Persistent cart state using localStorage
* Loading and error states
* Keyboard-friendly focus indicators
* Glassmorphism-inspired visual styling
* Modular JavaScript architecture

## Technology Stack

* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* Fake Store API
* localStorage
* GitHub Pages

## Architecture

```text
User Interface
      |
      v
Semantic HTML
      |
      v
Responsive CSS
      |
      v
JavaScript Application
   /          \
  v            v
API Client   Client State
(api.js)    (localStorage)
  |
  v
Fake Store API
```

## Project Structure

```text
Accessibility-Audit-Submission/
│
├── css/
│   └── style.css
│
├── js/
│   ├── api.js
│   └── app.js
│
├── index.html
├── README.md
└── accessibility-audit-template (1).csv
```

## API Integration

The application retrieves product information asynchronously from the Fake Store API using the Fetch API and async/await.

```text
https://fakestoreapi.com/products
```

## Client-Side State

Product data and cart information are managed on the client side.

The application uses:

* JavaScript state
* localStorage caching
* Persistent cart item IDs
* Dynamic DOM updates without full page reloads

## Responsive Design

The application follows a mobile-first strategy and adapts to multiple viewport sizes:

| Viewport | Layout                           |
| -------- | -------------------------------- |
| 320px    | Single-column mobile layout      |
| 768px    | Two-column tablet layout         |
| 1024px   | Three-column desktop layout      |
| 1440px   | Four-column large desktop layout |

## Accessibility

Accessibility features include:

* Semantic HTML elements
* Skip-to-main-content link
* Descriptive navigation labels
* Accessible form labels
* Keyboard focus indicators
* Appropriate table headings and captions
* Responsive layouts
* No intentional horizontal scrolling on mobile

## Setup Instructions

1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in a browser.
4. Ensure an internet connection is available for API product data.
5. Test search, category filters, sorting, and cart interactions.

## Development Workflow

The project uses GitHub for source control and GitHub Pages for live deployment.

```text
Code Changes
     |
     v
GitHub Repository
     |
     v
GitHub Pages
     |
     v
Live Web Application
```

## Future Improvements

* Real user authentication
* Backend database integration
* Full shopping cart and checkout workflow
* Product detail pages
* User profile management
* Server-side CRUD operations
* Automated testing and CI/CD

## Author

Sonam Patel
