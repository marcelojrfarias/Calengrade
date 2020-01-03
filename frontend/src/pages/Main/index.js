import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import FileDownload from 'js-file-download'
import api from '../../services/api'

import './styles.css'

export default function Main() {

  const alert = useAlert()

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [summary, setSummary] = useState('')

  useEffect(() => {

    // Get the period dates

    setStartDate('2020-02-10')
    setEndDate('2020-05-15')

  }, [])

  async function handleSummary(form) {
    const response = await api.post('/summary', form)
    if (response.status === 200) {
      handleCalendar(response.data)
      // console.log('SUCCESS', response)
    }
    else {
      console.log('ERROR', response)
      alert.error(response.data)
    }
  }

  async function handleCalendar(summary) {
    const response = await api.post('/calendar', summary, {responseType: 'text'})
    if (response.status === 200) {
      // console.log('SUCCESS', response.data)
      FileDownload(response.data, 'MyCalengrade.ics')
      alert.success('Calegrade gerado com sucesso! :)')
      alert.success('Agora é só abrir no aplicativo de sua preferência! ;)')
      setSummary('')
    }
    else {
      console.log('ERROR', response)
      alert.error(response.data)
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

    console.log(startDate);
    console.log(endDate);

    handleSummary({
      university: 'UFABC',
      summary,
      quarterStartDate: startDate,
      quarterEndDate: endDate
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