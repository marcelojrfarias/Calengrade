import React, { useState } from 'react'
import api from './services/api'
import './App.css'

import logo from './assets/logo-yellow.svg'

import FileDownload from 'js-file-download'

function App() {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [summary, setSummary] = useState('')

  async function handleSummary(form) {
    const response = await api.post('/summary', form)
    if (response.status === 200)
      handleCalendar(response.data)
    else
      console.log(response)
  }

  async function handleCalendar(summary) {
    const response = await api.post('/calendar', summary, {responseType: 'text'})
    if (response.status === 200) {
      FileDownload(response.data, 'MyCalengrade.ics')
    }
    else
      console.log('ERROR', response)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    handleSummary({
      university: 'UFABC',
      summary,
      quarterStartDate: startDate,
      quarterEndDate: endDate
    })
  }

  return (
    <div className="container">
      <img src={logo} alt="Calengrade"/>
      <div className="content">
        <p>
          Adicione sua <strong>grade</strong> ao seu <strong>calendário</strong> facilmente
        </p>

        <form onSubmit={handleSubmit}>
          
          <div className="dates">

            <div className="date">
              <label htmlFor="startDate">INICIO DO QUADRI:*</label>
              <input 
                id="startDate"
                type="date"
                placeholder="Data do início do quadrimestre"
                value={startDate}
                onChange = {event => setStartDate(event.target.value)}
              />
            </div>

            <div className="date">
              <label htmlFor="endDate">FINAL DO QUADRI:*</label>
              <input 
                id="endDate"
                type="date"
                placeholder="Data do final do quadrimestre"
                value={endDate}
                onChange = {event => setEndDate(event.target.value)}
              />
            </div>

          </div>
          
          <p className="hint">Você pode acessar o calendário acadêmico no <a className="hint" href="http://prograd.ufabc.edu.br/calendarios">Site da Prograd</a></p>
        
          <label htmlFor="summary">RESUMO*</label>
          <textarea 
            id="summary"
            type=""
            placeholder="Resumo das disciplina que você conseguiu pegar"
            value={summary}
            onChange = {event => setSummary(event.target.value)}
          />

          <p className="hint">Você pode acessar o seu resumo no <a className="hint" href="https://matricula.ufabc.edu.br/matricula/resumo">Portal de Matrículas</a></p>

          <button type="submit">Gerar Calengrade</button>
        </form>
      </div>
    </div>
  );
}

export default App;
