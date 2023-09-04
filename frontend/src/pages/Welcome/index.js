import React, { useEffect } from 'react'

import welcomeImage from '../../assets/welcome.svg'

import useNavigateKeepingSearchParams from '../../utils/useNavigateKeepingSearchParams'

export default function Welcome() {
  
  const navigateKeepParams = useNavigateKeepingSearchParams()


  useEffect(() => {
    window.dataLayer.push({
      event: 'pageview'
    });
  }, []) // eslint-disable-line

  return (
    <>
      <div>
        <h1>Adicione sua grade de matérias da UFABC ao seu calendário</h1>
        <h2>Gratuito e compatível com os principais aplicativos de celular e computador</h2>
      </div>

      <img src={welcomeImage} alt="Calendário acadêmico"/>

      <button
        className=''
        onClick={ () => {
          navigateKeepParams('/resumo')

          window.dataLayer.push({
            event: 'btn_click_start'
          });
         } }>
          Começar
      </button>
    </>
  )
}