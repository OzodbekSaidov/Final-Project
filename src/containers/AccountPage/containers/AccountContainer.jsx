import styled from "styled-components";
import { cookieData } from "../../../utils/cookies";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE } from "../../../constants/routes";
import { toast } from "react-toastify";
import { LogOut } from "react-feather";
import { User } from "react-feather";

const Container = styled("div")``;

const Account = styled("div")`
  width: 90vw;
  height: 75vh;
  margin: 0 auto;
  margin-top: 5vh;
  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.footer};
`;

const Avatar = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 10vw;
  height: 10vw;
  font-size: 1.8rem;
  color: ${({theme}) => theme.input};
`;
const UserDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 7vw;
  border-radius: 50%;
  color: white;
  background-color: gray;
`;
const Infolar = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 50%;
  margin-top: 4%;
`;
const InfoDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 20vw;
  height: 8vh;
  margin: 3rem 11rem;
  border-radius: 1rem;
  color: ${({theme}) => theme.input};
  border: 1px solid ${({theme}) => theme.input};
  background-color: ${({theme}) => theme.reverse};
`;
const Infos = styled("p")`
  position: relative;
  font-size: 1.2rem;
  color: ${({theme}) => theme.input};
`;

const LogoutDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 8vw;
  height: 7vh;
  left: 90%;
  bottom: 27%;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid red;
  color: red;
  &:hover {
    color: white;
    background-color: red;
  }
`;

const ModalOverlay = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.593);
`;

const ModalContent = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30vw;
  height: 35vh;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.primary};
`;
const Text = styled("h2")`
  font-size: 1.7rem;
  text-align: center;
  color: ${({theme}) => theme.input};
`;
const Buttons = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 100%;
  height: 25%;
  top: 20%;
`;
const Confirm = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 45%;
  height: 100%;
  border-radius: 4rem;
  color: white;
  background-color: red;
  &:hover {
    transition: 0.5s;
    color: ${({theme}) => theme.input};
    background-color: ${({theme}) => theme.primary};
    border: 1px solid red;
  }
`;
const Cancel = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 45%;
  height: 100%;
  border-radius: 4rem;
  color: black;
  border: 1px solid ${({theme}) => theme.input};
  background-color: white;
`;

const AccountPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
    
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  
  const [showModal, setShowModal] = useState(false);

  if (cookieData("username").getValue() === "") {
    navigate(LOGIN_PAGE);
    toast.error("Please login to access the home page");
  }

  useEffect(() => {
    const storedEmail = cookieData("email").getValue();
    const storedUsername = cookieData("username").getValue();
    const storedPassword = cookieData("password").getValue();
    const storedPhoneNumber = cookieData("PhoneNumber").getValue();
    if (storedEmail && storedUsername && storedPassword && storedPhoneNumber) {
      setEmail(storedEmail);
      setUsername(storedUsername);
      setPassword(storedPassword);
      setPhoneNumber(storedPhoneNumber);
    }
  }, []);

  const LogOutfunction = () => {
    cookieData("email").setValue("");
    cookieData("username").setValue("");
    cookieData("password").setValue("");
    cookieData("PhoneNumber").setValue("");
    navigate(HOME_PAGE);
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <Account>
        <Avatar>
          <UserDiv>
            <User size={70} />
          </UserDiv>
          {username}
        </Avatar>
        <LogoutDiv onClick={handleSubmit}>
          <LogOut size={30} />
          Log Out
        </LogoutDiv>
        <Infolar>
        <InfoDiv>{email}</InfoDiv>
        <InfoDiv>{password}</InfoDiv>
        <InfoDiv>{phoneNumber}</InfoDiv>
        <InfoDiv></InfoDiv>
        <Infos style={{left: "13vw", bottom: "42vh"}}>Email Adress</Infos>
        <Infos style={{left: "49vw", bottom: "42vh"}}>Password</Infos>
        <Infos style={{left: "1vw", bottom: "21vh"}}>Phone Number</Infos>
        <Infos style={{left: "37vw", bottom: "21vh"}}>Last Name</Infos>
        </Infolar>
      </Account>
      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Text>Are you sure you want to log out?</Text>
            <Buttons>
              <Confirm onClick={LogOutfunction}>Confirm Logout</Confirm>
              <Cancel onClick={handleCloseModal}>Cancel</Cancel>
            </Buttons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default AccountPage;
