var startOfPeriod = "20190923"
var startOfPeriod2 = "20190930"
var endOfPeriod = "20191221"


function getDayOffset(day) {
    if (day.indexOf("Segunda-feira") != -1)
        return "20190923"
    if (day.indexOf("Terça-feira") != -1)
        return "20190924"
    if (day.indexOf("Quarta-feira") != -1)
        return "20190925"
    if (day.indexOf("Quinta-feira") != -1)
        return "20190926"
    if (day.indexOf("Sexta-feira") != -1)
        return "20190927"
    if (day.indexOf("Sábado") != -1)
        return "20190928"
    if (day.indexOf("Domingo") != -1)
        return "20190929"
    return "ERROR!"
}

function getDayOffset2(day) {
    if (day.indexOf("Segunda-feira") != -1)
        return "20190930"
    if (day.indexOf("Terça-feira") != -1)
        return "20191001"
    if (day.indexOf("Quarta-feira") != -1)
        return "20191002"
    if (day.indexOf("Quinta-feira") != -1)
        return "20191003"
    if (day.indexOf("Sexta-feira") != -1)
        return "20191004"
    if (day.indexOf("Sábado") != -1)
        return "20191005"
    if (day.indexOf("Domingo") != -1)
        return "20191006"
    return "ERROR!"
}

function getDayOfWeek(day) {
    if (day.indexOf("Domingo") != -1)
        return "SU"
    if (day.indexOf("Segunda-feira") != -1)
        return "MO"
    if (day.indexOf("Terça-feira") != -1)
        return "TU"
    if (day.indexOf("Quarta-feira") != -1)
        return "WE"
    if (day.indexOf("Quinta-feira") != -1)
        return "TH"
    if (day.indexOf("Sexta-feira") != -1)
        return "FR"
    if (day.indexOf("Sábado") != -1)
        return "SA"
    return "ERROR!"
}

let classes = msg.payload

var events = ""

events += "BEGIN:VCALENDAR" + "\n"
events += "PRODID:-//UFABC//Calendário UFABC//PT" + "\n"
events += "VERSION:2.0" + "\n"
events += "CALSCALE:GREGORIAN" + "\n"
events += "METHOD:PUBLISH" + "\n"
events += "X-WR-CALNAME:UFABC" + "\n"
events += "X-WR-TIMEZONE:America/Sao_Paulo" + "\n"
events += "X-WR-CALDESC:Calendário UFABC" + "\n"
events += "BEGIN:VTIMEZONE" + "\n"
events += "TZID:America/Sao_Paulo" + "\n"
events += "X-LIC-LOCATION:America/Sao_Paulo" + "\n"
events += "BEGIN:DAYLIGHT" + "\n"
events += "TZOFFSETFROM:-0300" + "\n"
events += "TZOFFSETTO:-0200" + "\n"
events += "TZNAME:-02" + "\n"
events += "DTSTART:19701101T000000" + "\n"
events += "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU" + "\n"
events += "END:DAYLIGHT" + "\n"
events += "BEGIN:STANDARD" + "\n"
events += "TZOFFSETFROM:-0300" + "\n"
events += "TZOFFSETTO:-0300" + "\n"
events += "TZNAME:-03" + "\n"
events += "DTSTART:19700215T000000" + "\n"
events += "RRULE:FREQ=YEARLY;BYMONTH=2;BYDAY=3SU" + "\n"
events += "END:STANDARD" + "\n"
events += "END:VTIMEZONE" + "\n"

for (let c = 0; c < classes.length; c++) {
    for (let t = 0; t < classes[c].times.length; t++) {
        
        var event = "BEGIN:VEVENT"+"\n"
        event += "SUMMARY:" + classes[c].info.title + "\n"
        event += "DESCRIPTION:" + "Aula de " + classes[c].info.title + "\\nTurma " + classes[c].info.id + "\\n" + "TPI: " + classes[c].info.tpi + "\n"
        event += "LOCATION:UFABC - " + classes[c].info.campus + "\n"
        event += "SEQUENCE:1" + "\n"
        event += "STATUS:CONFIRMED" + "\n"
        event += "TRANSP:OPAQUE" + "\n"
        event += "DTSTAMP:" + startOfPeriod + "T000000Z" + "\n"
        event += "CREATED:" + startOfPeriod + "T000000Z" + "\n"
        event += "LAST-MODIFIED:" + startOfPeriod + "T000000Z" + "\n"
        event += "UID:"
        event += Math.floor(1000000000*Math.random()*classes[c].info.title.length) + "" + classes[c].info.title.substring(0,3)
        event += "@aluno.ufabc.edu" + "\n"

        if (classes[c].times[t].repeat.indexOf("semanal") != -1 || classes[c].times[t].repeat.indexOf("quinzenal (I)") != -1) {
            event += "DTSTART;TZID=America/Sao_Paulo:" + getDayOffset(classes[c].times[t].day) + "T" + classes[c].times[t].start.replace(":","") + "00" + "\n"
            event += "DTEND;TZID=America/Sao_Paulo:" + getDayOffset(classes[c].times[t].day) + "T" + classes[c].times[t].end.replace(":","") + "00" + "\n"
        } else if (classes[c].times[t].repeat.indexOf("quinzenal (II)") != -1) {
            event += "DTSTART;TZID=America/Sao_Paulo:" + getDayOffset2(classes[c].times[t].day) + "T" + classes[c].times[t].start.replace(":","") + "00" + "\n"
            event += "DTEND;TZID=America/Sao_Paulo:" + getDayOffset2(classes[c].times[t].day) + "T" + classes[c].times[t].end.replace(":","") + "00" + "\n"
        }
        
        if (classes[c].times[t].repeat.indexOf("semanal") != -1) {
            event += "RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=" + endOfPeriod + "T025959Z;BYDAY=" + getDayOfWeek(classes[c].times[t].day) + "\n"
        } else if (classes[c].times[t].repeat.indexOf("quinzenal (I)") != -1 || classes[c].times[t].repeat.indexOf("quinzenal (II)") != -1) {
            event += "RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=" + endOfPeriod + "T025959Z;INTERVAL=2;BYDAY=" + getDayOfWeek(classes[c].times[t].day) + "\n"
        }        
        
        event += "END:VEVENT"
        
        events += event + "\n"
    } 
    
}
events += "END:VCALENDAR"
msg.payload = events
return msg;