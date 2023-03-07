const fs = require('fs');
const express = require('express');
const app = express();

const players = require('./players.json');

const logPath = '/path/to/valheim_server.log';

function getServerStatus() {
  const logFilePath = '/path/to/valheim_server.log';
  const log = fs.readFileSync(logFilePath, 'utf-8');
  if (log.includes('Shuting down')) {
    return 'Offline';
  } else {
    return 'Online';
  }
}


function getOnlinePlayers() {
  const log = fs.readFileSync(logPath, 'utf8');
  const lines = log.split('\n');
  const onlinePlayers = [];
  let lastPlayerId;
  for (const line of lines) {
    const match = line.match(/Got connection SteamID (\d+)/);
    if (match) {
      lastPlayerId = match[1];
      onlinePlayers.push(lastPlayerId);
    } else if (line.includes(`Closing socket ${lastPlayerId}`)) {
      onlinePlayers.splice(onlinePlayers.indexOf(lastPlayerId), 1);
    }
  }
  return onlinePlayers.map(id => players.find(p => p.id === parseInt(id, 10)).name);
}

function getDeathCount() {
  const log = fs.readFileSync(logPath, 'utf8');
  const deathLines = log.match(/Got character ZDOID from (.+?) : 0:0/g) || [];
  return deathLines.length;
}

function getSaveTimeAverage() {
  const log = fs.readFileSync(logPath, 'utf8');
  const saveLines = log.match(/World saved \(\s*(\d+\.\d+)ms \)/g) || [];
  const saveTimes = saveLines.map(line => parseFloat(line.match(/World saved \(\s*(\d+\.\d+)ms \)/)[1]));
  const averageSaveTime = saveTimes.reduce((total, time) => total + time, 0) / saveTimes.length;
  return averageSaveTime.toFixed(2) + 'ms';
}

app.use(express.static('public'));

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
}); 

 //below sets routing for GET requests to the status endpoint
app.get('/status', (req, res) => {
  const serverStatus = getServerStatus();
  const onlinePlayers = getOnlinePlayers();
  const deathCount = getDeathCount();
  const saveTimeAverage = getSaveTimeAverage();
  const data = {
    serverStatus,
    onlinePlayers,
    deathCount,
    saveTimeAverage
  };
  res.send(data);
});

app.listen(3000, () => console.log('Server running on port 3000...'));

