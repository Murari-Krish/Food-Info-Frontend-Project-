import React, { useState } from 'react';
import './Saveitem.css';

function SaveModel() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState('');
  const [cost, setCost] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [itemName, setItemName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'area':
        setArea(value);
        break;
      case 'cost':
        setCost(value);
        break;
      case 'hotelName':
        setHotelName(value);
        break;
      case 'itemName':
        setItemName(value);
        break;
      default:
        break;
    }
  };

  const handleNextStep = () => {
    if (step === 1 && itemName) {
      setStep(2);
    } else if (step === 2 && area) {
      setStep(3);
    } else if (step === 3 && cost) {
      setStep(4);
    } else if (step === 4 && hotelName) {
      handleSave();
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const model = { area, cost, hotelName, itemName };

    try {
      const response = await fetch('http://localhost:8080/response/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setSuccess(true);
      setStep(1);
      setArea('');
      setCost('');
      setHotelName('');
      setItemName('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Save Food Item</h2>
      {step === 1 && (
        <div>
          <input
            className="inputbutton"
            name="itemName"
            placeholder="Enter item name"
            value={itemName}
            onChange={handleInputChange}
            style={{ padding: '5px', fontSize: '16px' }}
          />
          <button
            className="nextbutton"
            onClick={handleNextStep}
            disabled={!itemName}
            style={{ padding: '5px 10px', fontSize: '16px', marginLeft: '10px' }}
          >
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            className="inputbutton"
            name="area"
            placeholder="Enter area"
            value={area}
            onChange={handleInputChange}
          />
          <button
            className="nextbutton"
            onClick={handleNextStep}
            disabled={!area}
          >
            Next
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <input
            className="inputbutton"
            type="text"
            name="cost"
            placeholder="Enter cost"
            value={cost}
            onChange={handleInputChange}
          />
          <button
            className="nextbutton"
            onClick={handleNextStep}
            disabled={!cost}
          >
            Next
          </button>
        </div>
      )}
      {step === 4 && (
        <div>
          <input
            className="inputbutton"
            name="hotelName"
            placeholder="Enter hotel name"
            value={hotelName}
            onChange={handleInputChange}
          />
          <button
            className="savebutton"
            onClick={handleNextStep}
            disabled={!hotelName}
          >
            Save
          </button>
        </div>
      )}
      <div id="response">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {success && <div>Model saved successfully!</div>}
      </div>
      
    </div>
  );
}

export default SaveModel;
