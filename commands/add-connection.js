const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'Ingrese el nombre del servidor: '
  },
  {
    name: 'user',
    type: 'input',
    message: 'Ingrese el usuario: '
  },
  {
    name: 'host',
    type: 'input',
    message: 'Ingrese el host: '
  }
]

const addConnection = (cmd) => {
  inquirer
  .prompt(questions)
  .then(answers => {
    add(answers)
  })
  .catch(error => {
    console.log(error)
  });
}

const add = (data) => { 
  const file = path.join(__dirname, '../connections.json')
  if(!fs.existsSync(file)){
    const cons = []
    cons.push(data)
    save(file, JSON.stringify({ connections: cons })) 
  }else{
    fs.readFile(file, 'utf8', function(err, cons){
      if(err) console.log(err)
      cons = JSON.parse(cons)
      cons.connections.push(data)
      save(file, JSON.stringify({ connections: cons.connections }))
    })
  
  }

}

const save = (file, data) => {
  fs.writeFile(file, data, 'utf8', function(err){ if(err) console.log(err)
    console.log(chalk.green('Connection saved!'))
    })
}

module.exports = addConnection
