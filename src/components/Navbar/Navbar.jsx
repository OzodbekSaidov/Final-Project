import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useState } from "react";
import { LOGIN_PAGE, SETTINGS_PAGE } from "../../constants/routes";
import cookie from "js-cookie";
import { api } from "../../axios/axios";


const NavContainer = styled.div`
  position: absolute; 
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: end;
  align-items: center;
  width: 90%;
  z-index: 1000;
`

// const SearchBar = styled.div
//   display: flex;
//   align-items: center;
//   background-color: #ffffff;
//   border-radius: 2rem;
//   padding: 0 1rem;
//   width: 40%; /* Ширина строки поиска */
//   height: 3rem;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//   margin-left: 4rem;

//   input {
//     border: none;
//     outline: none;
//     background: none;
//     flex: 1;
//     margin-left: 0.5rem;
//     font-size: 1rem;
//   }
// ;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  width: 20rem;
  height: 15rem;
  position: absolute;
  top: 3.5rem; /* Отступ от аватарки */
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 1000;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`;

const Navbar = ({ isOpen, fuelSearchValue, onSearchInputChange  }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(  );
  const [storedUser , setStoredUser] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() =>{
    const user = cookie.get("user");
    setStoredUser(user);
  }, [])




  return (
    <NavContainer>
      <Avatar onClick={toggleMenu}>
        <RxAvatar size={24} />
        {isMenuOpen && (
          <DropdownMenu>
            <ul>
              {storedUser ? (
                <li onClick={() => navigate("/account")}>Профиль</li>
              ) : (
                <li onClick={() => navigate(LOGIN_PAGE)}>Login</li>
              )}
            </ul>
          </DropdownMenu>
        )}
      </Avatar>
    </NavContainer>
  );
};

export default Navbar;