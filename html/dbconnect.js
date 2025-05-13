const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/internship')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model for MongoDB
const InternshipSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    dob: Date,
    gender: String,
    nationality: String,
    address: String,
    email: String,
    phone: String,
    education: String,
    fieldOfWork: String,
    location: String,
    skills: String,
    experience: String,
    linkedin: String,
    portfolio: String,
    availability: Date,
    terms: Boolean
});

const Internship = mongoose.model('Internship', InternshipSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submission
app.post('/submitForm', async (req, res) => {
    try {
        const newApplication = new Internship(req.body);
        await newApplication.save();
        console.log('Data inserted successfully!');
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
