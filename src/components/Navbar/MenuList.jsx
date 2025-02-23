import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  RiMenuFold2Line,
  RiHomeLine,
  RiSettings2Line,
  RiBookmarkLine,
} from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { SETTINGS_PAGE, STATION_PAGE } from "../../constants/routes";
import { getUserRole } from "../../utils/auth";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => (props.isOpen ? "250px" : "60px")};
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOpen ? "flex-start" : "center")};
  padding-top: 1rem;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s, color 0.2s;

    svg {
      margin-right: ${(props) => (props.isOpen ? "1rem" : "0")};
      font-size: 1.5rem;
    }

    span {
      display: ${(props) => (props.isOpen ? "inline" : "none")};
      &:hover {
        color: blue;
      }
    }
  }
`;
const BottomLi = styled.li`
  margin-top: 25rem;
`;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <MenuIcon onClick={toggleSidebar}>
          <RiMenuFold2Line style={{ marginLeft: isOpen ? "20px" : "0rem" }} />
        </MenuIcon>

        {/* Меню */}
        <MenuList isOpen={isOpen}>
          <li>
            <RiBookmarkLine />
            <span>Сохранено</span>
          </li>
          <li>
            <MdOutlineFavoriteBorder />
            <span>Уведомления</span>
          </li>

          {userRole === "admin" && (
            <li>
              <IoIosAddCircleOutline />
              <span onClick={() => navigate(STATION_PAGE)}>
                Добавить станцию
              </span>
            </li>
          )}
          <BottomLi>
            <IoInformationCircleOutline />
            <span>О нас</span>
          </BottomLi>
          <li>
            <BiSupport />
            <span>Поддержка</span>
          </li>
        </MenuList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
