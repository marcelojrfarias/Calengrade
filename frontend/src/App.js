import React, { useEffect, useState } from 'react'
import './App.css'

import Routes from './routes'

import logo from './assets/logo.svg'

// import FooterMenu from './components/FooterMenu'
import CalengradeContext from './context/CalengradeContext'

function App() {

  const [calengrade, setCalengrade] = useState({ classes: [], quarter: {}, summary:'' });
  const contextValue = { calengrade, setCalengrade };

  useEffect( () => {
    console.log('CalengradeContext', calengrade)
  }, [calengrade])

  return (
    <div className="app">

      <img src={logo} alt="Calengrade" className="logo"/>
      
      <CalengradeContext.Provider value={contextValue}>
        <div className="content">
          <Routes />
          {/* 💿 Hey developer 👋
          You can provide a way better UX than this when your
          app throws errors by providing your own ErrorBoundary
          or errorElement prop on your route. */}
        </div>
      </CalengradeContext.Provider>
{/*       
      <FooterMenu
        menuItems={[
          {
            title: 'Bugs e Sugestões',
            link: 'https://link.cariri.tech/calengrade-bugs'
          },
          {
            title: 'Código Fonte',
            link: 'https://link.cariri.tech/calengrade-codigo-fonte'
          },
          {
            title: 'WhatsApp',
            link: 'https://link.marcelofarias.com/calengrade-contato'
          }
        ]}
      /> */}
      
      <div className="footerMessage">
        <span>Feito com <span role="img" aria-label="Heart">💚</span> e <span role="img" aria-label="Beer">🍺</span> por <a rel="noopener noreferrer" target="_blank" href="https://link.cariri.tech/calengrade-linkedin"><u>Marcelo Farias</u></a></span>
      </div>

    </div>
  )
}

export default App
