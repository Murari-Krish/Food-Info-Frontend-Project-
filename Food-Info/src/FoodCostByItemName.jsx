import React, { useState } from 'react';

function FoodCosts() {
  const [itemName, setItemName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [costs, setCosts] = useState(null);
  const [showCosts, setShowCosts] = useState(false); // New state for managing visibility of costs

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setCosts(null);
    setShowCosts(true); // Show costs section when search is initiated

    try {
      const response = await fetch(`http://localhost:8080/response/costs/${encodeURIComponent(itemName)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched costs:', data);
      setCosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseCosts = () => {
    setShowCosts(false);
    setCosts(null);
    setItemName(''); // Optional: Clear the input field when closing costs
  };

  return (
    <div >
      <h2>Search Costs by Item Name</h2>
      <input
      id="text"
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onChange={handleInputChange}
        style={{ padding: '5px', fontSize: '16px' }}
      />
      <button
        id="searchbutton"
        onClick={handleSearch}
        disabled={!itemName}
        style={{ padding: '5px 10px', fontSize: '16px', marginLeft: '10px' }}
      >
        Search
      </button>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {showCosts && costs && (
        <div >
          <h3>Costs:</h3>
          {costs.length > 0 ? (
            costs.map((cost, index) => (
              <p key={index}>Cost: {cost}</p>
            ))
          ) : (
            <p>No costs found for this item.</p>
          )}
          <button
            onClick={handleCloseCosts}
            style={{ padding: '5px 10px', fontSize: '16px', marginTop: '10px' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodCosts;
