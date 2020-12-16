import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../App.css'
import { Search } from '../svg/svg';

const HomePage = () => {

  const [searchString, setsearchString] = useState("")
  const [error, setError] = useState("")
  let history = useHistory();

  let search = () => {
    if (searchString) {
      setError("")
      console.log(searchString)
      sessionStorage.setItem("location", searchString)
      sessionStorage.setItem("units", "farenheit")
      history.push('/search/today');
    } else {
      setError("Please enter a location");
    }
  }

    return (
      <div className="container-fluid">
        <header style={{ fontFamily: "Courier New", height:"50px", paddingTop:"10px", margin:"auto" }}>
          <h1>WeatherCaster</h1>
        </header>
        <div className="center">
          <form onSubmit={(e) => search(e)}>
            <input
              type="text"
              name="searchString"
              // className="rounded-pill"
              onChange={(e) => setsearchString(e.target.value)}
              placeholder="Search using city, state or country"
              required
            />
            <button
              type="submit"
              className="fa fa-search"
              value="Search"
              // onClick={(e) => search(e)}
            >
              <Search />
            </button>
            {error && <div style={{color: "red"}}>{error}</div>}
          </form>
        </div>
      </div>
    )
}

export default HomePage;