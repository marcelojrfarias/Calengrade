import React from 'react'

import welcomeImage from '../../assets/welcome.svg'

import useNavigateKeepingSearchParams from '../../utils/useNavigateKeepingSearchParams'

export default function Welcome() {
  
  const navigateKeepParams = useNavigateKeepingSearchParams()

  return (
    <>
      <div>
        <h1>Adicione sua grade de matérias da UFABC ao seu calendário</h1>
        <h2>Gratuito e compatível com os principais aplicativos de celular e computador</h2>
      </div>

      <img src={welcomeImage} alt="Calendário acadêmico"/>

      <button
        className=''
        onClick={ () => navigateKeepParams('/resumo') }>
          Começar
      </button>
    </>
  )
}