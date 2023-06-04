const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

// init middleware
app.use(express.json({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// app.get('/',(req,res)=>res.send('API RUNNING!'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
