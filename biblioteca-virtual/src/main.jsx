import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Cadastro from './cadastro/Cadastro.jsx'
import Listar from './listar/Listar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cadastro />
    <App />
   <Listar />
  </StrictMode>,
)
