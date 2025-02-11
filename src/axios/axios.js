import axios from "axios";



const token = JSON.parse(localStorage.getItem("token"));
export const api = axios.create({baseURL: 'http://localhost:5000', headers : {"Content-Type" : "application/json" , "Authorization" :"Bearer " + token}})

export const getStations = async (q = "") => {
     const res = await axios.get("http://localhost:5000/stations" +  q)
    if(res.status !== 200) {
        throw new Error("Failed to fetch stations")
    }
    return res.data

}