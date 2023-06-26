import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// createRoot lets you create a root to display React components inside a browser DOM node.
// const root = createRoot(domNode, options?)
// Call createRoot to create a React root for displaying content inside a browser DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode> lets you find common bugs in your components early during development.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
