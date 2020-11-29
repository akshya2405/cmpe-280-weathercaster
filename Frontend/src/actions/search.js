import axios from 'axios';

export const getCurrentData = (searchQuery) => async () => {
  console.log("calling backend")
  try {
    const response = await axios.get('http://localhost:3001/today', { params: { CityStateCountry: searchQuery } })
    console.log(JSON.parse(response));
  } catch (error) {
    console.log(error)
  }
}