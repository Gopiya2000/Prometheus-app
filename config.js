require('dotenv').config();
var convict = require('convict');

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  databaseURL: {
    doc: 'The MongoDB database URL.',
    format: 'url',
    env: 'DATABASE_URL'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    env: 'PORT',
    arg: 'port'
  },
  region: {
    doc: 'The region.',
    format: String,
    env: 'REGION'
  }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

module.exports = config;