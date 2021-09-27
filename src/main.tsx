// Imports
// ========================================================
import React from 'react'
import ReactDOM from 'react-dom'
import RootProviders from './providers'
import Routes from './routes'

// Render
// ========================================================
ReactDOM.render(
  <React.StrictMode>
    <RootProviders>
      <Routes />
    </RootProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
