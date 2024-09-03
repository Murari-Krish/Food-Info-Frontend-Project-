import React, { useState } from 'react';
import "./CostAndHotelName.css"

function FoodCostAndHotel() {
  const [step, setStep] = useState(1); // Track the current step
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'area') setArea(value);
  };

  const handleNextStep = () => {
    if (step === 1 && name) {
      setStep(2);
    } else if (step === 2 && area) {
      handleSearch(); // Proceed to search when the final step is completed
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`http://localhost:8080/response/cost-and-hotel/${encodeURIComponent(name)}/${encodeURIComponent(area)}`);
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
      setStep(3); // Move to a final step where only results are shown
    }
  };

  return (
    <div style={{ color: 'white', marginTop: '50px' }}>
      <h2 id="h2">Search Cost and Hotel Name by Food Name and Area</h2>
      
      {step === 1 && (
        <div>
          <input
            id="text"
            type="text"
            name="name"
            placeholder="Enter food name"
            value={name}
            onChange={handleInputChange}
          />
          <button
            onClick={handleNextStep}
            disabled={!name}
          >
            Next
          </button>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <input
            id="text"
            type="text"
            name="area"
            placeholder="Enter area"
            value={area}
            onChange={handleInputChange}
          />
          <button
            id="searchbutton"
            onClick={handleNextStep}
            disabled={!area}
          >
            Search
          </button>
        </div>
      )}

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      {step === 3 && results && (
        <div style={{
          border: '1px solid white',
          padding: '20px',
          marginTop: '20px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        }}>
          <h3 id="result">Results:</h3>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index}>
                <p id="res">Hotel Name:  {result[1]}</p>
                <p id="res">Cost:   {result[0]}</p>
              </div>
            ))
          ) : (
            <p>No results found for this search.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FoodCostAndHotel;
