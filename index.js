// // const app = express();
// require('dotenv').config();
// const bodyParser = require('body-parser');
// const express = require('express');
// const mongoose = require('mongoose');

// const {dbConnect} = require("./config/config.js");
// const userRoute=require('./routes/routes.js') ;
// const app = express();
// const cors = require('cors');
// const port = 3000; // You can choose any available port

// app.use(cors()); // Enable CORS for all routes

// dbConnect()

// app.use(cors({ origin: 'https://adminpanel.rajavrukshagroup.in' }));
// app.use(express.json());
// app.use(express.static('public')); 
// app.use('/',userRoute)


// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   })  


require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { dbConnect } = require("./config/config.js");
const userRoute = require('./routes/routes.js');
const cors = require('cors');

const app = express();
const port = 3000; // You can choose any available port

// Connect to the database
dbConnect();

// Configure CORS
app.use(cors({
    origin: 'https://adminpanel.rajavrukshagroup.in', // Allow specific origin
    credentials: true // Include cookies or authorization headers if needed
}));

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/', userRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
