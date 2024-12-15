const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
let actors;
axios
  .get('https://www.freetestapi.com/api/v1/actresses')
  .then(response => {
    actors = response.data;
    console.log('API request sent', actors);
  })
  .catch(error => {
    console.error(error);
  });
  app.get('/v1/actors/:id', (req, res) => {
    const actorId = parseInt(req.params.id); // Convert req.params.id;
    const actor = actors.find(actor => actor.id === actorId);
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  });
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
