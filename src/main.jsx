import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <div className=" bg-gradient-to-br from-white to-blue-300">
        <App />
      </div>
    </Router>
  </StrictMode>,
)
