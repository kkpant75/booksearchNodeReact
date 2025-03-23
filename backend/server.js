const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Google Books API base URL
const googleBooksAPI = 'https://www.googleapis.com/books/v1/volumes';

// Endpoint to search books
app.get('/search', async (req, res) => {
    const query = req.query.q; // Book search query
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const response = await axios.get(`${googleBooksAPI}?q=${query}`);
        const books = response.data.items || [];
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Google Books API' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
