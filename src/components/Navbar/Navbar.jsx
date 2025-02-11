import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useState } from "react";
import { LOGIN_PAGE, SETTINGS_PAGE } from "../../constants/routes";
import { api } from "../../axios/axios";
import { FiLogOut, FiEdit3 } from "react-icons/fi";

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
`;

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
  position: relative;
`;

const DropdownMenu = styled.div`
  width: 250px;
  position: absolute;
  top: 3.5rem;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
  padding: 10px;
  font-size: 14px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const UserEmail = styled.div`
  font-size: 12px;
  color: gray;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f5f5f5;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (!storedUser) navigate(LOGIN_PAGE);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    navigate(LOGIN_PAGE);
  };

  return (
    <NavContainer>
      <Avatar onClick={toggleMenu}>
        <RxAvatar size={24} />
        {isMenuOpen && (
          <DropdownMenu>
            {user ? (
              <>
                <UserInfo>
                  <RxAvatar size={32} />
                  <div>
                    <UserName>{user?.name}</UserName>
                    <UserEmail>{user?.phone}</UserEmail>
                  </div>
                </UserInfo>
                <MenuItem onClick={handleLogout} style={{ color: "red" }}>
                  <FiLogOut /> Выйти
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => navigate(LOGIN_PAGE)}>Войти</MenuItem>
            )}
          </DropdownMenu>
        )}
      </Avatar>
    </NavContainer>
  );
};

export default Navbar;
