import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { LOGIN_PAGE } from "../../constants/routes";
import cookie from "js-cookie";
import { Menu, MenuItem, Avatar as MuiAvatar } from "@mui/material";

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

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [storedUser, setStoredUser] = useState(null);
  const [avatarContent, setAvatarContent] = useState(null);

  // Function to handle opening/closing the dropdown menu
  const toggleMenu = (event) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsMenuOpen(null);
  };

  // Function to check user status and set avatar content
  const checkUserStatus = () => {
    const user = cookie.get("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setStoredUser(parsedUser);
      setAvatarContent(parsedUser.username[0].toUpperCase());
    } else {
      setStoredUser(null);
      setAvatarContent(null);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <NavContainer>
      <MuiAvatar
        onClick={toggleMenu}
        style={{
          cursor: "pointer",
          backgroundColor: storedUser ? "#3f51b5" : "#e0e0e0",
          color: "#fff",
          width: "3rem",
          height: "3rem",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        {avatarContent || <IoIosSearch size={24} />}
      </MuiAvatar>

      <Menu
        anchorEl={isMenuOpen}
        open={Boolean(isMenuOpen)}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {storedUser ? (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/account");
            }}
          >
            Профиль
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(LOGIN_PAGE);
            }}
          >
            Login
          </MenuItem>
        )}
      </Menu>
    </NavContainer>
  );
};

export default Navbar;
