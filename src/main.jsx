import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=" bg-gradient-to-br from-white to-blue-300">
      <App />
    </div>
  </StrictMode>,
)
