import React, { useState } from 'react';

function NameAndAreaByCost() {
  const [cost, setCost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false); // New state for managing visibility of results

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    setShowResults(true); // Show results section when search is initiated

    try {
      const response = await fetch(`http://localhost:8080/response/name-and-area/${encodeURIComponent(cost)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setResults(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setResults(null);
    setCost(''); // Optional: Clear the input field when closing results
  };

  return (
    <div style={{ color: 'white', marginTop: '50px' }}>
      <h2 id="h2">Search Name and Area by Cost</h2>
      <input
      id="text"
        type="number"
        placeholder="Enter cost"
        value={cost}
        onChange={handleCostChange}
       
      />
      <button
      id="searchbutton"
        onClick={handleSearch}
        disabled={!cost}
        style={{ padding: '5px 10px', fontSize: '16px', marginLeft: '10px' }}
      >
        Search
      </button>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {showResults && results && (
        <div >
          <h3>Results:</h3>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index}>
                <p>Name: {result[0]}</p>
                <p>Area: {result[1]}</p>
              </div>
            ))
          ) : (
            <p>No results found for this search.</p>
          )}
          <button
            onClick={handleCloseResults}
            style={{ padding: '5px 10px', fontSize: '16px', marginTop: '10px' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default NameAndAreaByCost;
