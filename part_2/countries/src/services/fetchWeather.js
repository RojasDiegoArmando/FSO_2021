import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const fetchWeather = async (city) => {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
    console.log(response.data)
    return response.data
}

export default fetchWeather