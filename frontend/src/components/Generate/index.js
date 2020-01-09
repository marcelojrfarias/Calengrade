import React from 'react'
import { useAlert } from 'react-alert'

import './styles.css'

export default function Generate(props) {

  const alert = useAlert()
  
  function nextStep(event) {
    event.preventDefault()
    
    if (props.summary.startDate === '') {  
      alert.show('Opa! Informe quando começa o quadri!')
      return
    }

    if (props.summary.endDate === '') {
      alert.show('Opa! Informe quando acaba o quadri!')
      return
    }

    if (props.summary.summary === '') {
      alert.show('Opa! Cole seu resumo!')
      return
    }

    props.generateCalengrade()
  }
  
  function prevStep(event) {
    event.preventDefault()
    props.prevStep()
  }

  

  return (
    <>
      <p className="slogan">
        Insira aqui as informações do seu <strong>quadrimestre</strong> e gere seu <strong>calengrade</strong>
      </p>
      <form>

        <div className="dates">

          <div className="date">
            <label htmlFor="startDate">INICIO DO QUADRI:*</label>
            <input 
              id="startDate"
              type="date"
              className="startDate"
              placeholder="Data do início do quadrimestre"
              value={props.summary.startDate}
              onChange = {props.handleChange('startDate')}
            />
          </div>

          <div className="date">
            <label htmlFor="endDate">FIM DO QUADRI:*</label>
            <input 
              id="endDate"
              type="date"
              className="endDate"
              placeholder="Data do final do quadrimestre"
              value={props.summary.endDate}
              onChange = {props.handleChange('endDate')}
            />
          </div>

        </div>
        
        <p className="hint">Acesse o calendário acadêmico no <a className="hint" rel="noopener noreferrer" target="_blank" href="http://prograd.ufabc.edu.br/calendarios">Site da Prograd</a></p>
      
        <label htmlFor="summary">RESUMO*</label>
        <textarea 
          id="summary"
          type=""
          placeholder="Cole aqui o resumo das disciplinas que você conseguiu pegar"
          value={props.summary.summary}
          onChange = {props.handleChange('summary')}
        />

        <p className="hint">Copie o seu resumo no <a className="hint" rel="noopener noreferrer" target="_blank" href="https://matricula.ufabc.edu.br/matricula/resumo">Portal de Matrículas</a></p>

      </form>

      {
        props.nextStep &&
        <form onSubmit={nextStep}>
          <button type="submit">Gerar Calengrade</button>
        </form>
      }
      { 
        props.prevStep &&
        <form onSubmit={prevStep}>
          <button type="submit">Voltar</button>
        </form>
      }
    </>
  )
}