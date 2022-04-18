import React, {useState, useEffect} from 'react';
import {FaUser, FaCalendarTimes, FaMap, FaPhone, FaEnvelopeOpen, FaLock} from "react-icons/fa";
import index from "../src/index.css"

function App() {
  const [user, setUser] =useState(null);
  const [title, setTitle] = useState("random user");
  const [value, setValue] = useState("name");
  const getUser = async( ) => {
    const response = await fetch("https://randomuser.me/api");
    const data= await response.json();
    const person = data.results[0];
    const {phone, email} = person;
    const {large: image} = person.picture;
    const {password} = person.login;
    const {first, last} = person.name;
    const {
      dob: {age},
    } = person;
    const {
      street: {number, name}
    } = person.location;
    const newPerson = {
      image, phone, email,password, age, street: `${number} ${name}`,
      name: `${first} ${name}`
    }
    setUser(newPerson);
    setTitle("person");
    setValue(newPerson.name)
  };

useEffect(() => {
  getUser();
},[]);

const handleValue = (e) => {
  if(e.target.classList.contains("icons")) {
    const newValue = e.target.dataset.label;
    setTitle(newValue);
    setValue(user[newValue]);
  };
}

  return (
    <div className="App">
      <div className="block bcg-black">
        <div className="block">
          <div className="container">
            <img src={user && user.image}
            className="user-img"
            alt="user-img">
            </img>
            <p className="user-title">This {title} is</p>
            <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleValue}> 
              <FaUser />
            </button>
            <button className="icon" data-label="street" onMouseOver={handleValue}>
            <FaMap />
            </button>
            <button className="icon" data-label="phone" onMouseOver={handleValue}>
            <FaPhone />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
            <FaCalendarTimes />
            </button>
            <button className="icon" data-label="email" onMouseOver={handleValue}>
            <FaEnvelopeOpen /> 
            </button>
            <button className="icon" data-label="password" onMouseOver={handleValue}>
            <FaLock /> 
            </button>
          </div>
          <button className="btn" type="submit" onClick={getUser}>New User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
