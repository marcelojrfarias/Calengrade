import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import FileDownload from 'js-file-download'
import api from '../../services/api'

import './styles.css'

import Instructions from '../../components/Instructions'
import Generate from '../../components/Generate'
import Import from '../../components/Import'

const moment = require('moment') 

export default function Main() {

  const alert = useAlert()

  const [summary, setSummary] = useState({
    startDate: '',
    endDate: '',
    summary: ''
  })

  const [step, setStep] = useState(0) 

  useEffect(() => {

    // Get the period dates

    setSummary({
      startDate: '2020-02-10',
      endDate: '2020-05-15',
      summary: ''
    })

  }, [])

  function nextStep() {
    setStep(step + 1)
  }

  function prevStep() {
    setStep(step - 1)
  }

  const handleChange = input => event => {
    setSummary({...summary, [input]: event.target.value})
  }

  async function handleSummary(form) {
    const response = await api.post('/summary', form)
    if (response.status === 200) {
      handleCalendar(response.data)
    }
    else {
      console.log('ERROR', response)
      alert.error(response.data)
    }
  }

  async function handleCalendar(summary) {
    const response = await api.post('/calendar', summary, {responseType: 'text'})
    if (response.status === 200) {
      FileDownload(response.data, 'MyCalengrade.ics')
      alert.success('Calegrade gerado com sucesso! :)')
      alert.success('Agora é só abrir no aplicativo de sua preferência! ;)')
      // setSummary('')
      nextStep()
    }
    else {
      console.log('ERROR', response)
      alert.error(response.data)
    }
  }

  async function generateCalengrade() {

    handleSummary({
      university: 'UFABC',
      summary: summary.summary,
      startDate: moment(summary.startDate).toISOString(),
      endDate: moment(summary.endDate).toISOString()
    })
  }

  switch(step) {
    case 0:
      return <Instructions
              summary={summary}
              setSummary={setSummary}
              nextStep={nextStep}
              prevStep={null}
              handleChange={handleChange}
              />
    case 1:
      return <Generate
              summary={summary}
              setSummary={setSummary}
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              generateCalengrade={generateCalengrade}
              />
    case 2:
      return <Import
              summary={summary}
              setSummary={setSummary}
              nextStep={null}
              prevStep={prevStep}
              handleChange={handleChange}
              />
    default:
      setStep(0)
  }
}