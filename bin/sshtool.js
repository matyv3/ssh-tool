#!/usr/bin/env node
const program  = require('commander')
const addConnection = require('../commands/add-connection')
const connect = require('../commands/connect')

program
  .action((cmd) => connect(cmd))

program
  .command('add')
  .description('Add new ssh connection')
  .action((cmd) => addConnection(cmd))

program.parse(process.argv)
