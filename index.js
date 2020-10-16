#!/usr/bin/env node

const Calendar = require('node-google-calendar')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const { prompt } = require('enquirer')
const path = require("path")
const home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
const secretKeyPath = path.join(home, ".count-class-days-secret-key.json")

const numberOfTimes = (params, subject) => {
  const config = require('./calendar-config.json')
  const calId = config.calenderId
  const cal = new Calendar(config)

  cal.Events.list(calId, params)
    .then((events) => {
      const total = events.map((result) => result.summary.split('：'))
      const attendance = total.map((item) => {
        if (item[0] === subject && item[1] === '●') return item
      })
      const absence = total.map((item) => {
        if (item[0] === subject && item[1] === '×') return item
      })
      const canceled = total.map((item) => {
        if (item[0] === subject && item[1] === '休') return item
      })

      const x = attendance.filter((a) => a)
      const y = absence.filter((a) => a)
      const z = canceled.filter((c) => c)
      console.log(`出席：${x.length}\n欠席：${y.length}\n休講：${z.length}`)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

const timePeriod = (start, end, subject) => {
  const timeMin = start + 'T06:00:00+09:00'
  const timeMax = end + 'T06:00:00+09:00'
  const params = { timeMin, timeMax }
  numberOfTimes(params, subject)
}

const question = async () => {
  const response = await prompt([
    {
      type: 'input',
      name: 'start',
      message: '対象期間の初日を入力してください(例：2020-10-01)'
    },
    {
      type: 'input',
      name: 'end',
      message: '対象期間の最終日を入力してください(例：2020-12-31)'
    },
    {
      type: 'input',
      name: 'subject',
      message: '科目を入力してください'
    }
  ])
  const start = response.start
  const end = response.end
  const subject = response.subject
  timePeriod(start, end, subject)
}

const determinArgv = (argv) => {
  if (argv.u != null && argv.i != null) {
    const key = require(secretKeyPath).private_key
    const serviceAcctId = require(secretKeyPath).client_id
    const timezone = 'UTC+09:00'
    const calenderUrl = argv.u
    const calenderId = argv.i
    const data = {
      key: key,
      serviceAcctId: serviceAcctId,
      timezone: timezone,
      calenderUrl: calenderUrl,
      calenderId: calenderId
    }

    fs.writeFileSync('calendar-config.json', JSON.stringify(data, null, ' '))
  } else {
    question()
  }
}

determinArgv(argv)
