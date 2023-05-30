import React from 'react'

import DonateTable from '../../components/DonateTable'

export default function Thanks() {

  return (
    <>
      <h1>Contribua com o projeto! ❤️</h1>
      <h2>{'Ajude o Calengrade a continuar organizando a grade de estudantes como você ;)'}</h2>
      
      <DonateTable/>
      
      <button onClick={() => window.open('https://link.calengrade.com/fazer-doacao', '_blank')}>Fazer doação</button>
      <button onClick={() => window.open('https://link.calengrade.com/compartilhar', '_blank')}>Compartilhar</button>

    </>
  )
}