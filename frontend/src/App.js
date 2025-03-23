import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/search?q=${query}`);
      setBooks(response.data);
    } catch (err) {
      setError('Error fetching books. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="book-list">
        {books.length === 0 && !loading && <p>No books found.</p>}
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                width="100"
              />
            )}
            <p>{book.volumeInfo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
