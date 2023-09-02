import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import useNavigateKeepingSearchParams from '../../utils/useNavigateKeepingSearchParams'
import QuartersProvider from '../../services/QuartersProvider'
import CalengradeContext from '../../context/CalengradeContext'

export default function Quarter() {

  const { calengrade, setCalengrade } = useContext(CalengradeContext);

  const classesCount = calengrade.classes.length

  const navigateKeepParams = useNavigateKeepingSearchParams()
  
  const [quarter, setQuarter] = useState(() => {
    const now = Date.now();
    for (let q = 1; q < QuartersProvider.length; q++) {
      const quarterEndDate = new Date(`${QuartersProvider[q].endDate}T00:00:00.000`)
      if (now > quarterEndDate) {
        return q - 1
      } else {
        const quarterStartDate = new Date(`${QuartersProvider[q].startDate}T00:00:00.000`)
        if (now >= quarterStartDate) {
          return q
        }
      }
    }
    return 0;
  }) 

  const [startDate, setStartDate] = useState(() => QuartersProvider[quarter].startDate)
  const [endDate, setEndDate] = useState(() => QuartersProvider[quarter].endDate)

  const [startDateError, setStartDateError] = useState('')
  const [endDateError, setEndDateError] = useState('')

  const handleQuarterChange = value => {
    if (value !== 0) {
      setStartDate(QuartersProvider[value].startDate)
      setEndDate(QuartersProvider[value].endDate)
    }
    setQuarter(value)
  }

  const handleStartDate = value => {
    
    if (value === '') { // is not a date
      setStartDateError('Erro!')
    } else {
      setStartDateError('')
      setStartDate(value)
    }
    
  }

  const handleEndDate = value => {
    
    if (value === '') { // is not a date
      setEndDateError('Erro!')
    } else {
      setEndDateError('')
      setEndDate(value)
    }
    
  }

  const handleClick = (type) => {
    if (type === 'generate') {
      setCalengrade({
        ...calengrade,
        quarter: {
          title: quarter === 0 ? 'Quadrimestre personalizado' : QuartersProvider[quarter].title,
          startDate,
          endDate
        }
      })
      navigateKeepParams('/preview')
    }
    
    navigateKeepParams('/resumo')
    
  }

  return (
    <>
      <div>
        <h1>Selecione um quadrimestre</h1>
        <h2>Datas disponíveis no <a className="hint" rel="noopener noreferrer" target="_blank" href="https://link.cariri.tech/calengrade-calendario-academico">Calendário acadêmico</a></h2>

      
        <label htmlFor='quarter'>Quadrimestre</label>
        <select
          id='quarter'
          value={quarter}
          onChange={event => handleQuarterChange(event.target.value)}
        >
          {
            (QuartersProvider || []).map((quarter, i) => (
              <option key={i} value={i}>{quarter.title}</option>
            ))
          }
        </select>
      
        <label htmlFor='startDate'>Início</label>
        <input
          inputMode='numeric'
          id='startDate'
          type="date"
          value={startDate}
          onChange={event => handleStartDate(event.target.value)}
          disabled={quarter !== '0'}
        />
        {startDateError ?? (<p>{startDateError}</p>)}
      
        <label htmlFor='endDate'>Fim</label>
        <input
          inputMode='numeric'
          id='endDate'
          type="date"
          value={endDate}
          onChange={event => handleEndDate(event.target.value)}
          disabled={quarter !== '0'}
        />
          {endDateError ?? (<p>{endDateError}</p>)}
      </div>
      
      {
        classesCount === 0 ?
        (
          <button 
            onClick={() => handleClick('back')}>
              Voltar
          </button>
        ) : (
          <>
            <Link to='/resumo'>{calengrade.classes.length} disciplina(s) identificada(s) <u>(alterar)</u></Link>
            <button 
              onClick={() => handleClick('generate')}>
                Gerar Calengrade!
            </button>
          </>
        )
      }

    </>
  )
}
