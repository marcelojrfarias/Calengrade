export default function SummaryController(classesList) {

  // Store the quarter info
  let quarterClasses = {}

  // Get the summary info
  let { summary, startDate, endDate } = classesList
  
  quarterClasses.startDate = startDate
  quarterClasses.endDate = endDate

  // Get all classes codes
  let classesCodes = [...summary.match(/[A-Z0-9]{7}[-][0-9]{2}/gi)]

  if (classesCodes.length <= 0)
    return {error: 'Resumo inválido!'}

  // Get all classes index
  let classesIndex = []
  for (let c = 0; c < classesCodes.length; c++)
    classesIndex.push(summary.indexOf(classesCodes[c]))

  // Get all classes
  let classes = []
  for (let c = 0; c < classesIndex.length; c++) {
    if (c === classesIndex.length-1) {
      classes.push(summary.substring(classesIndex[c], summary.length))
      continue    
    }
    classes.push(summary.substring(classesIndex[c], classesIndex[c+1]-1))
  }

  // Split the classes by end of line
  for (let c = 0; c < classes.length; c++) {
    classes[c] = classes[c].split(/\n+/gi)
  }

  // Get the classes info
  let classesInfo = []
  for (let c = 0; c < classes.length; c++) { 
    let classInfo = {info:classes[c][0], times:[]}
    for (let i = 1; i < classes[c].length; i++) {
      if(classes[c][i].search(/(.*-feira)|(Sábado)/gi) !== -1)
        classInfo.times.push(classes[c][i])
    }
    classesInfo.push(classInfo)
  }

  // Create the final json with the classes
  let finalClasses = [] 
  for (let c = 0; c < classesInfo.length; c++) {
    let originalClass = classesInfo[c]
  
    // Split the classes info
    let myClassInfo = {
      title: originalClass.info.match(/(?![\s-\s])([0-9a-záàâãéèêíïóôõöúçñ, ]{2,})(?=\s\w{1,2}-)/gi)[0],
      campus: originalClass.info.match(/(Campus\s)(Santo\sAndré|São\sBernardo\sdo\sCampo)/gi)[0],
      info: [
        {
          title: "Código",
          content: originalClass.info.match(/[A-Z0-9]{7}[-][0-9]{2}/gi)[0]
        },
        {
          title: "Turma",
          content: originalClass.info.match(/([A-Z]{1}[0-9]?(?=-(Noturno|Matutino)))/g)[0]
        },
        {
          title: "Turno",
          content: originalClass.info.match(/(?!-)(Noturno|Matutino)/gi)[0],
        },
        {
          title: "TPI",
          content: originalClass.info.match(/(?!\()(\d{1,2}\s-\s\d{1,2}\s-\s\d{1,2})(?=\))/gi)[0],
        }
      ]
    }
      
    // Split the classes times
    let myClassTimes = []
    for (var t = 0; t < originalClass.times.length; t++) {
      let time = {
        day: originalClass.times[t].match(/(.*-feira)|(Sábado)/gi)[0],
        start: originalClass.times[t].match(/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/gi)[0],
        end: originalClass.times[t].match(/([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/gi)[1],
        repeat: originalClass.times[t].match(/(?!\s-\s)(semanal|quinzenal\s\(i\)|quinzenal\s\(ii\))/gi)[0]
      }
      myClassTimes.push(time)
    }
      
    let myClass = myClassInfo
    myClass.times = myClassTimes
      
    finalClasses.push(myClass)
  }

  quarterClasses.classes = finalClasses

  // Return the classes as json
  return quarterClasses
  
}