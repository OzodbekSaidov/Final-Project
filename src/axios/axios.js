import axios from "axios";

export const api = axios.create({baseURL: 'http://localhost:5000', headers : {"Content-Type" : "application/json"}})

export const getStations = async () => {
    const res = await axios.get("http://localhost:5000/stations")
    return res.data
}