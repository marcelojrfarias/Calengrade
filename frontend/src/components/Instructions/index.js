import React from 'react'
import './styles.css'

export default function Instructions(props) {
  
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
        Adicione sua <strong>grade</strong> ao seu <strong>calendário</strong> e centralize seus eventos
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