import { useState } from 'react'
import FoodCosts from './FoodCostByItemName'
import './App.css'
import FoodLogic from './Functtion'
import FoodCostAndHotel from './CostAndHotelName'
import FoodCostAndHotelWithHotelName from './GetCostByItemNameAreaAndhotelName'
import SaveModel from './SaveItems'
import NearestCosts from './NearestCosts'


function App() {
  const [activeComponent, setActiveComponent] = useState('');

  const handleGoBack = () => {
    setActiveComponent('');
  };

  return (
    <div id="main">
      <h1 id="mainHeading">Hi Welcome to Food-Info</h1>
      {!activeComponent && (
        <div className="button-container">
          <button id="button" onClick={() => setActiveComponent('FoodLogic')}>Get Cost and Hotel Name By Giving Item Name</button>
          <button id="button" onClick={() => setActiveComponent('FoodCosts')}>Get Food Costs By giving Item Name</button>
          <button id="button" onClick={() => setActiveComponent('FoodCostAndHotel')}>Get Food Cost and Hotel Name By providing Name and Area</button>
          <button id="button" onClick={() => setActiveComponent('FoodCostAndHotelWithHotelName')}>Get Cost By typing Item Name, HotelName and Area</button>
          <button id="button" onClick={() => setActiveComponent('SaveModel')}>Add the Details</button>
          <button id="button" onClick={() => setActiveComponent('NearestCosts')}>Get Nearest Prices By typing the Cost</button>
        </div>
      )}
      <div id="component-container">
        {activeComponent === 'FoodLogic' && (
          <>
            <FoodLogic />
            <button onClick={handleGoBack} id="goBackButton">Go Back</button>
          </>
        )}
        {activeComponent === 'FoodCosts' && (
          <>
            <FoodCosts />
            <button onClick={handleGoBack} id="goBackButton">Go Back</button>
          </>
        )}
        {activeComponent === 'FoodCostAndHotel' && (
          <>
            <FoodCostAndHotel />
            <button onClick={handleGoBack} id="goBackButton">Go Back</button>
          </>
        )}
        {activeComponent === 'FoodCostAndHotelWithHotelName' && (
          <>
            <FoodCostAndHotelWithHotelName />
            <button onClick={handleGoBack} id="goBackButton">Go Back</button>
          </>
        )}
        {activeComponent === 'SaveModel' && (
          <>
            <SaveModel />
            <button onClick={handleGoBack} id="goBackButton">Go Back</button>
          </>
        )}
        {activeComponent === 'NearestCosts' && (
          <>
            <NearestCosts />
            <button onClick={handleGoBack} id="goBackButton">Go Back</button>
          </>
        )}
        <h4 id="founder">Founder: MURARI</h4>
      </div>
    </div>
    
  );
}

export default App;