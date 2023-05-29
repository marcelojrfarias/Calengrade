import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'

import SummaryController from '../../services/SummaryController'
import CalendarController from '../../services/CalendarController'

import './styles.css'

export default function Main() {

  const alert = useAlert()

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [summary, setSummary] = useState('')

  useEffect(() => {

    // Get the period dates

    setStartDate('2023-05-29')
    setEndDate('2023-08-23')

  }, [])

  async function localHandleSummary(form) {
    try {
      const summary = SummaryController(form)
      localHandleCalendar(summary)
    } catch (e) {
      console.log('ERROR', e)
      alert.error(e)
    }
  }

  async function localHandleCalendar(summary) {
    try {
      const calendar = CalendarController(summary)

      const blob = new Blob([calendar], { type: "text/calendar" })
      const downloadURL = URL.createObjectURL(blob)
      const downloadLink = document.createElement('a')
      downloadLink.href = downloadURL
      downloadLink.download = `Meu Calengrade - Quadrimestre 2 - 2023.ics`
      downloadLink.href = downloadURL;
      downloadLink.click();
      URL.revokeObjectURL(downloadURL);

      alert.success('Calengrade gerado com sucesso! :)')
      alert.success('Agora é só abrir no aplicativo de sua preferência! ;)')
      setSummary('')
    }
    catch (e) {
      console.log('ERROR', e)
      alert.error(e)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (startDate === '') {  
      alert.show('Opa! Informe quando começa o quadri!')
      return
    }

    if (endDate === '') {
      alert.show('Opa! Informe quando acaba o quadri!')
      return
    }

    if (summary === '') {
      alert.show('Opa! Cole seu resumo!')
      return
    }
    
    localHandleSummary({
      university: 'UFABC',
      summary,
      startDate,
      endDate
    })
  }

  return (
    <>
        <p className="slogan">
          Adicione sua <strong>grade</strong> ao seu <strong>calendário</strong> e centralize seus eventos
        </p>

        <form onSubmit={handleSubmit}>
          
          <div className="dates">

            <div className="date">
              <label htmlFor="startDate">INICIO DO QUADRI:*</label>
              <input 
                id="startDate"
                type="date"
                className="startDate"
                placeholder="Data do início do quadrimestre"
                value={startDate}
                onChange = {event => setStartDate(event.target.value)}
              />
            </div>

            <div className="date">
              <label htmlFor="endDate">FIM DO QUADRI:*</label>
              <input 
                id="endDate"
                type="date"
                className="endDate"
                placeholder="Data do final do quadrimestre"
                value={endDate}
                onChange = {event => setEndDate(event.target.value)}
              />
            </div>

          </div>
          
          <p className="hint">Acesse o calendário acadêmico no <a className="hint" rel="noopener noreferrer" target="_blank" href="http://prograd.ufabc.edu.br/calendarios">Site da Prograd</a></p>
        
          <label htmlFor="summary">RESUMO*</label>
          <textarea 
            id="summary"
            type=""
            placeholder="Cole aqui o resumo das disciplinas que você conseguiu pegar"
            value={summary}
            onChange = {event => setSummary(event.target.value)}
          />

          <p className="hint">Copie o seu resumo no <a className="hint" rel="noopener noreferrer" target="_blank" href="https://matricula.ufabc.edu.br/matricula/resumo">Portal de Matrículas</a></p>

          <button type="submit">Gerar Calengrade</button>

        </form>
    </>
  )
}