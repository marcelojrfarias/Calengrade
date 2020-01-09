import React from 'react'
import './styles.css'

export default function Import(props) {
  
  function nextStep(event) {
    event.preventDefault()
    props.nextStep()
  }
  
  function prevStep(event) {
    event.preventDefault()
    props.prevStep()
  }

  return (
    <>
      <p className="slogan">
      <strong>Calengrade gerado com sucesso</strong>!<br></br> Agora é só importá-lo no seu aplicativo favorito
      </p>
      {
        props.nextStep &&
        <form onSubmit={nextStep}>
          <button type="submit">Próximo passo</button>
        </form>
      }
      { 
        props.prevStep &&
        <form onSubmit={prevStep}>
          <button type="submit">Passo Anterior</button>
        </form>
      }
    </>
  )
}