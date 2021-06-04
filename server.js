const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('api running'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
