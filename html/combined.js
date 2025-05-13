var http = require("http");
var querystring = require("querystring");
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/thirdmsc');

var db = mongoose.connection;
db.once('open', function() {
    console.log("MongoDB connection succeeded");
});

// Define the schema and model for MongoDB
const User = mongoose.model('User', {
    name: { type: String },
    email: { type: String }
}, 'students');

// HTTP server to receive form data
function onRequest(req, res) {
    if (req.method === 'POST') {
        var data1 = '';
        
        req.on('data', function(chunk) {
            data1 += chunk;
        });

        req.on('end', function() {
            // Parse the form data
            const qs = querystring.parse(data1);
            console.log("Received data:", qs);
            
            // Extract data from the parsed form
            const { username, email } = qs;
            
            // Create a new User instance
            const newUser = new User({
                name: username,
                email: email
            });

            // Insert the data into MongoDB
            newUser.save().then(function() {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                
                res.end();
            }).catch(function(error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write("Error inserting data: " + error);
                res.end();
            });
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.write("Method not allowed");
        res.end();
    }
}

http.createServer(onRequest).listen(3000);
console.log('Server has started on port 3000');