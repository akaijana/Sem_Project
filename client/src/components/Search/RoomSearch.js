import React, { useState } from 'react';
import axios from 'axios';
import './RoomSearch.css'

function RoomSearch() {
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('api/rooms/search', {
        params: { minRent, maxRent }
      });
      setRooms(response.data.rooms);
      console.log(setRooms)
      setError('');
    } catch (error) {
      console.error('Error searching for rooms:', error);
      setError('Error searching for rooms. Please try again.');
    }
  };

  return (
    <div>
      <br/>
      <h1 style={{textAlign:'center', fontFamily:"Baskerville Old Face", fontWeight:'bold'}}>Search Your Desired Room</h1>
      {/* <div >
        <label>Minimum Rent:</label>
        <input type="number" style={{ width: '150px' }} value={minRent} onChange={(e) => setMinRent(e.target.value)} />
      </div>
      <br/>
      <div >
        <label>Maximum Rent:</label>
        <input type="number" style={{ width: '150px' }} value={maxRent} onChange={(e) => setMaxRent(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Search</button> */}
      <div className='room'>
        <div className='input-group' >
          <input placeholder='Minimum Rent' type="number" style={{ width: '150px', textAlign:"center"}} value={minRent} onChange={(e) => setMinRent(e.target.value)} />
        </div>
        <br />
        <div className='input-group'>
          
          <input placeholder='Maximum Rent'type="number" style={{ width: '150px', textAlign:"center" }} value={maxRent} onChange={(e) => setMaxRent(e.target.value)} />
        </div>
        <button onClick={handleSearch} style={{height:"35px" , backgroundColor:"black" , color:"white"}}>Search</button><br/>
      </div>
      {/* <button onClick={handleSearch}>Search</button> */}
      {error && <p>{error}</p>}



      {rooms.length > 0 && (
        <div>
          <h2>Results</h2>
          <div className="room-cards">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <h3>Room Number: {room.Roomnumber}</h3>
                <p>Type: {room.type}</p>
                <p>Max Count: {room.maxcount}</p>
                <p>Rent Per Day: ${room.rentperday}</p>
                <img src={room.imageurls[0]} className="room-image" alt="room" />
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}

export default RoomSearch;

