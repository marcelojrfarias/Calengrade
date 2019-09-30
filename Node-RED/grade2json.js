global.set("summary", msg.payload)
let summary = global.get("summary") || ""

// Get all classes codes
let classCodeRegex = /[A-Z0-9]{7}[-][0-9]{2}/gi
let classesCodes = [...summary.match(classCodeRegex)];

// Get all classes index
let classesIndex = []
for (var c = 0; c < classesCodes.length; c++)
    classesIndex.push(summary.indexOf(classesCodes[c]))

// Get all classes
let classes = []
for (var c = 0; c < classesIndex.length; c++) {
    if (c == classesIndex.length-1) {
        classes.push(summary.substring(classesIndex[c], summary.length))
        continue    
    }
    classes.push(summary.substring(classesIndex[c], classesIndex[c+1]-1))
}

for (var c = 0; c < classes.length; c++) {
    classes[c] = classes[c].split(/\n+/gi)
}

let classesInfo = []
for (var c = 0; c < classes.length; c++){ 
    var classInfo = {info:classes[c][0], times:[]}
    for (var i = 1; i < classes[c].length; i++) {
        classInfo.times.push(classes[c][i])
    }
    classesInfo.push(classInfo)
}

msg.payload = classesInfo

let finalClasses = []
for (var c = 0; c < msg.payload.length; c++) {
    let originalClass = msg.payload[c]

    let myClassInfo = {
        code: originalClass.info.match(/[A-Z0-9]{7}[-][0-9]{2}/gi)[0],
        title: originalClass.info.match(/(?![\s-\s])([0-9a-záàâãéèêíïóôõöúçñ, ]{2,})(?=\s\w{1,2}-)/gi)[0],
        id: originalClass.info.match(/([A-Z]{1}[0-9]?(?=-(Noturno|Matutino)))/g)[0],
        shift: originalClass.info.match(/(?!-)(Noturno|Matutino)/gi)[0],
        tpi: originalClass.info.match(/(?!\()(\d{1,2}\s-\s\d{1,2}\s-\s\d{1,2})(?=\))/gi)[0],
        campus: originalClass.info.match(/(Campus\s)(Santo\sAndré|São\sBernardo\sdo\sCampo)/gi)[0]
    }
    
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
    
    let myClass = {
        info: myClassInfo,
        times: myClassTimes
    }
    
    finalClasses.push(myClass)
}

msg.payload = finalClasses

return msg;