//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'todomvc-app-css/index.css'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <App />
  //</StrictMode>, para que no haga la solicitud dos veces
)