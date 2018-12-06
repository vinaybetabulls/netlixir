const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');

const app = express();
let port = process.env.PORT || config.port;

//mongodb connection
mongoose.connect(config.dburl,{ useNewUrlParser: true });
mongoose.connection.on('success',() => {
    console.log("Connection established")
    console.log(`mongodb connected succesfully on ${config.dburl}`)
})
mongoose.connection.on('error', (err) => {
    console.log(`Please check your mongodb connection ${err}`)
})

app.set('superSecret', config.secretekey); // secret variable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.all('*', (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//require app routes
require('./routers/admin/admin.controller')(app);
require('./routers/employee/employee.controller')(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

