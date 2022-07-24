const fs = require('fs');
const jsonData = require('./env.json');

const url = JSON.stringify(jsonData).replace(
  'https://mighty-sheep-study-119-204-204-253.loca.lt/',
  'http://localhost:19410'
);

fs.writeFile('env.json', url, (err) => {
  if (err) throw err;

  res.send('end');
});
