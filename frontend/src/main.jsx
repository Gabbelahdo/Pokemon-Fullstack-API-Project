import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles.css";
import './index.css'
import App from './App.jsx'
console.log("MAIN.JSX KÖRS");


const root = createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
