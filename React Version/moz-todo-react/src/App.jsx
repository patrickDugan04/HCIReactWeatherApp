import { useState } from 'react'
import './App.css'


const WeatherApp = () => {
  const [activeInfoBox, setActiveInfoBox] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [dropdownTarget, setDropdownTarget] = useState(null);
  const [infoBoxTypes, setInfoBoxTypes] = useState({
    'info-box0': 'UVI',
    'info-box1': 'Humidity',
    'info-box2': 'Precipitation',
    'info-box3': 'Air Pressure'
  });

  const data = {
    "UVI": "4", 
    "Humidity": "68%", 
    "Precipitation": "1”", 
    "Air Pressure": "30 inHg", 
    "Wind Speed": "5 mph"
  };

  const desc = {
    "UVI": "The UVI or UV index measures the strength of the UV radiation from the sun...", 
    "Humidity": "Humidity is a measure of how much water vapor is in the air...", 
    "Precipitation": "Precipitation is the amount of rain expected to fall...", 
    "Air Pressure": "Air pressure measures the atmospheric pressure...", 
    "Wind Speed": "Wind speed measures the speed of the wind..."
  };

  const handleInfoBoxClick = (boxId) => {
    if (showDropdown) {
      setShowDropdown(false);
      return;
    }
    setActiveInfoBox(boxId);
    setDropdownTarget(boxId);
    setShowDropdown(true);
    setShowDescription(false);
  };

  const handleMouseEnter = (boxId) => {
    if (!showDropdown) {
      setActiveInfoBox(boxId);
      setShowDescription(true);
    }
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  const handleDropdownSelect = (type) => {
    if (dropdownTarget) {
      setInfoBoxTypes(prev => ({
        ...prev,
        [dropdownTarget]: type
      }));
    }
    setShowDropdown(false);
  };

  return (
    <div className="weather-container">
      <TopBanner />
      <HourlyForecast />
      
      <div className="L-R">
        <DailyForecast />
        <InfoBoxes 
          data={data}
          desc={desc}
          infoBoxTypes={infoBoxTypes}
          activeInfoBox={activeInfoBox}
          showDropdown={showDropdown}
          showDescription={showDescription}
          dropdownTarget={dropdownTarget}
          onInfoBoxClick={handleInfoBoxClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onDropdownSelect={handleDropdownSelect}
        />
      </div>
    </div>
  );
};


const TopBanner = () => {
  return (
    <div id="top-banner">
      <div className="top-item"></div>
      <div id="main-info">
        <div id="temperature">20°</div>
        <div className="headingInfo">Philadelphia</div>
        <div className="headingInfo">H : 25°  L : 19°</div>
      </div>
      <div className="top-item">
        <img src="/assets/sun.png" alt="Sun" />
      </div>
    </div>
  );
};



const HourlyForecast = () => {
  return (
    <div className="hor-forecast">
      <div className="hour opac">1 PM <img className="icon" src="/assets/sun.png" alt="sun" /> <br /> 20° </div>
      <div className="hour opac">2 PM <img className="icon" src="/assets/cloud.png" alt="cloud" /> <br /> 22° </div>
      <div className="hour opac">3 PM <img className="icon" src="/assets/sun.png" alt="sun" /> <br /> 22° </div>
      <div className="hour opac">4 PM <img className="icon" src="/assets/sun.png" alt="sun" /> <br /> 25° </div>
      <div className="hour opac">5 PM <img className="icon" src="/assets/sun.png" alt="sun" /> <br /> 23° </div>
    </div>
  );
};


const DailyForecast = () => {
  return (
    <div className="daily-forecast">
      <div className="day opac"><img className="small-icon" src="/assets/cloud.png" alt="cloud" />Mon</div>
      <div className="day opac"><img className="small-icon" src="/assets/sun.png" alt="sun" />Tues</div>
      <div className="day opac"><img className="small-icon" src="/assets/cloud.png" alt="cloud" />Wed</div>
      <div className="day opac"><img className="small-icon" src="/assets/rain.png" alt="rain" />Thurs</div>
      <div className="day opac"><img className="small-icon" src="/assets/sun.png" alt="sun" />Fri</div>
      <div className="day opac"><img className="small-icon" src="/assets/sun.png" alt="sun" />Sat</div>
    </div>
  );
};

const InfoBoxes = ({ 
  data, 
  desc, 
  infoBoxTypes,
  activeInfoBox, 
  showDropdown, 
  showDescription, 
  dropdownTarget, 
  onInfoBoxClick, 
  onMouseEnter,
  onMouseLeave,
  onDropdownSelect 
}) => {
  const infoBoxIds = ['info-box0', 'info-box1', 'info-box2', 'info-box3'];
  const dropdownOptions = ['UVI', 'Wind Speed', 'Air Pressure', 'Humidity', 'Precipitation'];

  return (
    <div id="info-boxes" className="daily-forecast">
      {infoBoxIds.map((boxId) => (
        <div 
          key={boxId}
          id={boxId}
          type={infoBoxTypes[boxId]}
          className="info-box opac"
          onClick={() => onInfoBoxClick(boxId)}
          onMouseEnter={() => onMouseEnter(boxId)}
          onMouseLeave={onMouseLeave}
        >
          {infoBoxTypes[boxId]} <br /> {data[infoBoxTypes[boxId]]}
        </div>
      ))}
      
      <WeatherInfo 
        showDropdown={showDropdown}
        showDescription={showDescription}
        dropdownTarget={dropdownTarget}
        activeInfoBox={activeInfoBox}
        dropdownOptions={dropdownOptions}
        desc={desc}
        data={data}
        onDropdownSelect={onDropdownSelect}
      />
    </div>
  );
};

const WeatherInfo = ({ 
  showDropdown, 
  showDescription, 
  dropdownTarget, 
  activeInfoBox, 
  dropdownOptions, 
  desc, 
  data,
  onDropdownSelect
}) => {
  const getActiveType = () => {
    const box = document.getElementById(activeInfoBox);
    return box ? box.getAttribute('type') : null;
  };

  const activeType = getActiveType();

  return (
    <>
      {showDropdown && (
        <div 
          id="dropdown-menu" 
          className="dropdown opac"
          style={{
            position: 'absolute',
            top: dropdownTarget ? `${document.getElementById(dropdownTarget)?.offsetTop + document.getElementById(dropdownTarget)?.offsetHeight}px` : '0',
            left: dropdownTarget ? `${document.getElementById(dropdownTarget)?.offsetLeft}px` : '0'
          }}
        >
          <ul>
            {dropdownOptions.map((option) => (
              <li 
                key={option}
                onClick={() => onDropdownSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showDescription && activeType && (
        <div 
          id="description" 
          className="popup opac"
          style={{
            position: 'absolute',
            top: activeInfoBox ? `${document.getElementById(activeInfoBox)?.offsetTop + document.getElementById(activeInfoBox)?.offsetHeight}px` : '0',
            left: activeInfoBox ? `${document.getElementById(activeInfoBox)?.offsetLeft - 30}px` : '0'
          }}
        >
          {desc[activeType]}
        </div>
      )}
    </>
  );
};


export default WeatherApp;
