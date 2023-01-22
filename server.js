const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
require('dotenv').config()
const env = process.env;


connectToMongo();

const app = express();
const port = 1000;

app.use(cors({ origin: `${env.BASE_URL}`, }))

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`OOPS! wrong path goto ${env.BASE_URL}`)
})

app.use('/api/auth/admin', require('./routes/adminAuth'));
app.use('/api/video', require('./routes/manageVideo'));
app.use('/api/blog', require('./routes/manageBlog'));
app.use('/api/analytics', require('./routes/manageAnalytics'));

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})