const { writeFileSync, unlink } = require('fs')
const moment = require('moment')
const ics = require('ics')
const path = require('path')

module.exports = {

    store(req, res) {

        var { classes, startDate, endDate } = req.body;

        calendar = []
        
        function getDay(day) {
            if (day.indexOf("Domingo") != -1) return 0
            if (day.indexOf("Segunda-feira") != -1) return 1
            if (day.indexOf("Terça-feira") != -1) return 2
            if (day.indexOf("Quarta-feira") != -1) return 3
            if (day.indexOf("Quinta-feira") != -1) return 4
            if (day.indexOf("Sexta-feira") != -1) return 5
            if (day.indexOf("Sábado") != -1) return 6
            return "ERROR!"
        }

        function getDayOfWeek(day) {
            if (day.indexOf("Segunda-feira") != -1) return "MO"
            if (day.indexOf("Terça-feira") != -1) return "TU"
            if (day.indexOf("Quarta-feira") != -1) return "WE"
            if (day.indexOf("Quinta-feira") != -1) return "TH"
            if (day.indexOf("Sexta-feira") != -1) return "FR"
            if (day.indexOf("Sábado") != -1) return "SA"
            if (day.indexOf("Domingo") != -1) return "SU"
            return "ERROR!"
        }
        
        classes.forEach( subject => {
            subject.times.forEach(time => {
                
                // Maybe should be the local timezone and not the utc
                let startOfPeriod = moment(startDate)

                if (startOfPeriod.day() <= getDay(time.day))
                    startOfPeriod.add(getDay(time.day) - startOfPeriod.day(), 'days')
                else if (startOfPeriod.day() > getDay(time.day))
                    startOfPeriod.add(startOfPeriod.day() + getDay(time.day), 'days')
                
                console.log(startOfPeriod.format(), startOfPeriod.isDST(), startOfPeriod.utcOffset())
                
                if (time.repeat.indexOf("quinzenal (II)") != -1) {
                    startOfPeriod.add(7, 'days')
                }

                if (startOfPeriod.isDST())
                    startOfPeriod.add(1, 'hour')

                console.log(startOfPeriod.format(), startOfPeriod.isDST(), startOfPeriod.utcOffset())

                let start = startOfPeriod.clone()   
                let end = startOfPeriod.clone()
                
                start.add(time.start.split(':')[0], 'hours')
                start.add(time.start.split(':')[1], 'minutes')
                
                end.add(time.end.split(':')[0], 'hours')
                end.add(time.end.split(':')[1], 'minutes')
                
                let recurrenceRule = `FREQ=WEEKLY;`
                recurrenceRule += `BYDAY=${getDayOfWeek(time.day)};`
                
                if (time.repeat.indexOf("semanal") != -1 )
                    recurrenceRule += `INTERVAL=1;`
                else if (time.repeat.indexOf("quinzenal (I)") != -1 || time.repeat.indexOf("quinzenal (II)") != -1)
                    recurrenceRule += `INTERVAL=2;`

                recurrenceRule += `UNTIL=${moment.utc(endDate).format("YYYYMMDDThhmmss")}Z`

                let description = ""
                
                subject.info.forEach(info => {
                    description += `${info.title}: ${info.content}` + "\n"
                })
                
                let event = {
                    title: subject.title,
                    location: 'UFABC - ' + subject.campus, 
                    description,
                    status: 'CONFIRMED',
                    start: start.format('YYYY-M-D-H-m').split("-"),
                    end: end.format('YYYY-M-D-H-m').split("-"),
                    recurrenceRule
                }

                calendar.push(event)
            })
        })
    
        const { error, value } = ics.createEvents(calendar)

        if (error) {
            // Return the error
            return res.status(400).json({error})
        }
        else {
            let pathName = path.resolve(__dirname, '..', '..', 'calendars')+`/calengrade-${Date.now()}.ics`
            writeFileSync(pathName, value)
            return res.download(pathName, 'YourCalengrade.ics', (err) => {
            if (err) {
                console.log(err)
                return
            } else {
                console.log('Calendar file downloaded!')
                
                unlink(pathName, (err) => {
                if (err) throw err;
                    console.log(`${pathName} was deleted`);
                });

                //do something
            }
            })

            // return res.send(value)
        }

    }
}