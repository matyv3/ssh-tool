const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')

const connect = (cmd) => {
  const file = path.join(__dirname, '../connections.json')
  fs.readFile(file, 'utf8', function(err, data){
    if(err) throw new Error(err)
    data = JSON.parse(data)
    const cons = data.connections
    const choices = []
    cons.forEach((conn, i) => {
      choices.push({ name: `${i+1}) ${conn.name} => ${conn.user}@${conn.host}`, value: i, conn })
    })
    inquirer
      .prompt([
	{
	  name: 'server',
	  type: 'list',
	  message: chalk.green('Select Server'),
	  choices
	}
      ])
      .then(answer => {
	const { conn } = choices[answer.server]
	const command = `ssh ${conn.user}@${conn.host}`	
	shell.exec(command)	
      })
  })
}


module.exports = connect
