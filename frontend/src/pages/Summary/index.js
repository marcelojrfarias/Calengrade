import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import useNavigateKeepingSearchParams from '../../utils/useNavigateKeepingSearchParams'

import SummaryController from '../../services/SummaryController'
import CalengradeContext from '../../context/CalengradeContext'
import QuartersProvider from '../../services/QuartersProvider'

export default function Summary() {

  const { calengrade, setCalengrade } = useContext(CalengradeContext);

  const navigateKeepParams = useNavigateKeepingSearchParams()
  
  const textareaRef = useRef(null);

  const [summary, setSummary] = useState(() => {
    return calengrade.summary ?? ''
  })
  const [message, setMessage] = useState([])

    
  const [quarter] = useState(() => {
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

  useEffect(() => {
    setCalengrade({
      ...calengrade,
      quarter: QuartersProvider[quarter]
    })
  }, [quarter])  // eslint-disable-line

  const handleChange = value => {
    setSummary(value)

    if (value === '') {
      setMessage(['Cole seu resumo de disciplinas ;)', 'error'])
    } else if (value.length > 50) {
      const newClasses = SummaryController(value)
      const classesCount = newClasses.length
      if (classesCount > 0) {
        setMessage([
          `${classesCount} ${classesCount === 1 ? 'disciplina identificada' : 'disciplinas identificadas'}`
          , 'info'
        ])
        setCalengrade({ 
          ...calengrade,
          classes: newClasses,
          summary: value
        })
      } else {
        setMessage(['Nenhuma disciplina identificada :(', 'error'])
        setCalengrade({ 
          ...calengrade,
          classes: [],
          summary: value
        })
      }
    } else {
      setMessage([])
    }
  }

  const handleClick = () => {
    if (summary === '') {
      setMessage(['Cole seu resumo de disciplinas!!!', 'error'])
    }
    else if ((calengrade.classes ?? []).length <= 0) {
      setMessage(['Nenhuma disciplina identificada :(', 'error'])
    } else {
      navigateKeepParams('/preview')
    }
    
  }

  async function handlePaste () {
    try {
      textareaRef.current.focus();
      const copied = await navigator.clipboard.readText()
      setSummary(copied)
      handleChange(copied) 
    } catch (error) {
      textareaRef.current.focus();
      // send error event
    }
  }

  return (
    <>
      <div className='summary'>
        <h1>Cole aqui o seu resumo de disciplinas disponível no</h1>
        <h2><a className="hint" rel="noopener noreferrer" target="_blank" href="https://link.cariri.tech/calengrade-matriculas">Portal de Matrículas</a></h2>

        <h3><Link className='quadri' to='/quadri'><strong>Quadrimestre:</strong> {calengrade.quarter.title} (<u>alterar</u>)</Link></h3>

        <textarea
          // autoFocus
          ref={textareaRef}
          id='summary'
          type=""
          placeholder='Exemplo: 
          BIR0603-15 - Ciência, Tecnologia e Sociedade A1-Noturno (Santo André) - TPI (3 - 0 - 4) - Campus Santo André
          Terça-feira das 21:00 às 23:00 - quinzenal (I)
          Quinta-feira das 19:00 às 21:00 - semanal
          NHT1057-15 - Genética II A-Noturno ...'
          value={summary}
          onChange={event => handleChange(event.target.value)}
        />
        <p className={message[1]}>{message[0] ?? '. . .'}</p>
      </div>
      {
        summary === '' ?
          <button
            onClick={handlePaste}>
              Colar
          </button>
        :
          <button 
            onClick={handleClick}>
              Gerar Calengrade!
          </button>
      }

    </>
  )
}
