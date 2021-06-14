const express = require('express');
const db = require('./infra/db');
const app = express();

app.use(express.json());
app.use('/', require('./routes/route'));

const PORT = process.env.PORT || 3000;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));