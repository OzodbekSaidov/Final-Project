import StationAdd from "./AddingSt.jsx";
import { getUserRole } from "../../../utils/auth.js";


const AddStations = () =>{
    const userRole = getUserRole();

    if (userRole !== "admin") {
        return <p>У вас нет прав для добавления станций.</p>;
      }
      console.log(userRole);
      
    
      return <StationAdd />;
    
}

export default AddStations;