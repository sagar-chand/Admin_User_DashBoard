
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { VideoTutorialHome } from './video-tutorial-home.jsx';
import { VideoTutorialIndex } from './video-tutorial-index.jsx';
import { CookiesProvider } from 'react-cookie';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
  <VideoTutorialIndex/>
  </CookiesProvider>
  </StrictMode>
)
