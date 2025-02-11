import {jwtDecode} from "jwt-decode"

export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      return decoded.r || null;
    } catch (error) {
      console.error("Ошибка декодирования токена", error);
      return null;
    }
}