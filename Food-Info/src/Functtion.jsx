import React, { useState } from 'react';
import './Function.css'
function FoodLogic() {
  const [itemName, setItemName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false); // New state for managing visibility of the result

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setShowResult(true); // Show result section when search is initiated

    try {
      const response = await fetch(`http://localhost:8080/response/itemname/${encodeURIComponent(itemName)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setResult(null);
    setItemName(''); // Optional: Clear the input field when closing result
  };

  return (
    <div >
      <h2 id="h2">Get Food Cost and Hotel Name by Item Name</h2>
      <input
        id="functioninput"
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onChange={handleInputChange}
        style={{ padding: '5px', fontSize: '16px' }}
      />
      <button
        id="search"
        onClick={handleSearch}
        disabled={!itemName}
        
      >
        Search
      </button>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {showResult && result && (
        <div style={{ marginTop: '20px' }}>
          {result.length > 0 ? (
            result.map((item, index) => (
              <div key={index}>
                <p>Hotel Name is: {item[1]}</p>
                <p>Cost: {item[0]}</p>
              </div>
            ))
          ) : (
            <p>No results found for this search.</p>
          )}
          <button
            onClick={handleCloseResult}
            style={{ padding: '5px 10px', fontSize: '16px', marginTop: '10px' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodLogic;
