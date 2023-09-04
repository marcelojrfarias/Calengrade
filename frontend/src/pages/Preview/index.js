import React, { useContext, useState, useEffect } from 'react'

import loadingImage from '../../assets/loading.svg'

import CalengradeContext from '../../context/CalengradeContext'
import CalendarController from '../../services/CalendarController'
import DonateTable from '../../components/DonateTable'
import useNavigateKeepingSearchParams from '../../utils/useNavigateKeepingSearchParams'

export default function Preview() {

  const { calengrade, setCalengrade } = useContext(CalengradeContext);

  const navigateKeepParams = useNavigateKeepingSearchParams()

  const { classes, quarter: { startDate, endDate }, calendar } = calengrade

  const [step, setStep] = useState(0)
  const [timer, setTimer] = useState(null)

  useEffect(() => {

    window.dataLayer.push({
      event: 'pageview'
    });

    let interval

    if (!timer) {
      interval = setInterval(() => setStep(s => s + 1), 2500)
      setTimer(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, []) // eslint-disable-line


  useEffect(() => {

    if (classes.length <= 0 || !startDate || !endDate) {
      navigateKeepParams('/resumo')
    }

    switch (step) {
      case 0: // Gerar
        const newCalendar = calendar ? calendar : CalendarController({
          classes,
          startDate,
          endDate,
        })

        setCalengrade({
          ...calengrade,
          calendar: newCalendar
        })
        break

      case 1: // Download
        try {
          const { calendar, quarter: { title } } = calengrade

          if (calendar) {
            const blob = new Blob([calendar], { type: "text/calendar" })

            const downloadURL = URL.createObjectURL(blob)

            const downloadLink = document.createElement('a')

            downloadLink.href = downloadURL
            downloadLink.download = `Meu Calengrade - ${title}.ics`
            downloadLink.href = downloadURL;
            downloadLink.click();

            URL.revokeObjectURL(downloadURL);

          } else {
            if (timer) clearInterval(timer)
            alert('Não foi possível baixar seu Calengrade!')
          }

        }
        catch (e) {
          console.log('ERROR: ', e)
          alert('Não foi possível baixar seu Calengrade!')
          if (timer) clearInterval(timer)
          navigateKeepParams('/resumo')
        }
        break;

      default:
        if (timer) clearInterval(timer)
        break
    }

  }, [step]) // eslint-disable-line

  return step <= 1 ? (
    (
      <>
        <div>
          <h1>{step === 0 ? 'Gerando o seu calengrade' : 'Fazendo download'}</h1>
          <h2>...</h2>
        </div>

        <img src={loadingImage} alt="Calendário acadêmico" />

        <div>
          <h1>Você sabia?</h1>
          <h3>O Calengrade foi desenvolvido em 2020 por Marcelo Farias, um ex aluno da UFABC.</h3>
        </div>
      </>
    )
  ) : (
    <>
      <div>
        <h1>Seu Calengrade está pronto!</h1>
        <h2>{'Abra o arquivo com seu aplicativo de calendário favorito e aproveite :)'}</h2>
      </div>

      
      <DonateTable />
      

      <div className='twoButtons'>
        <button onClick={() => {
          window.dataLayer.push({
            event: 'btn_click_donate'
          });
          window.open('https://link.calengrade.com/fazer-doacao', '_blank')
        }}>Fazer doação</button>

        <button onClick={() => {
          window.dataLayer.push({
            event: 'btn_click_share'
          });
          window.open('https://link.calengrade.com/compartilhar', '_blank')
        }}>Compartilhar</button>
      </div>
    </>
  )
}