import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home.tsx'
import Landing from './landing.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing/>
    {/* <Home /> */}
  </StrictMode>,
)
