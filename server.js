'use strict';

const http = require('http');
const chrono = require('chrono-node');
const dateFormat = require('dateformat');
const express = require('express');


const app = express();

app.get('/', (req, res) => {
  res.type('text').send(`Example usage:
https://timestamp-ms.herokuapp.com/December%2015,%202015
https://timestamp-ms.herokuapp.com/1450137600
Example output:
{ "unix": 1450137600, "natural": "December 15, 2015" }`);
});

app.get('/:input', (req, res) => {
  const timestamp = parseDate(req.params.input);
  
  if(timestamp === null) {
    res.send({
      unix: null,
      natural: null
    });
  } else {
    res.send({
      unix: timestamp,
      natural: dateFormat(new Date(timestamp * 1000), 'mmmm d, yyyy')
    });
  }
  
});

app.listen(process.env.PORT, process.env.IP, () => console.log('Listening'));


function parseDate(input) {
  let date = chrono.parseDate(input);
  
  if(!date) {
    const num = parseInt(input);
    if(!isNaN(num)) {
      date = new Date(num * 1000);
    }
  }
  
  if(date) return Math.floor(date.getTime() / 1000);
  
  return null;
}