import { FaAddressCard } from "react-icons/fa";
import { FiLogOut, FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE } from "../../../constants/routes";
import { toast } from "react-toastify";
import styled from "styled-components";
import cookie from "js-cookie"

const Card = styled.div`
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
`;

const CardContent = styled.div`
  margin-top: 24px;
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  background: #007bff;
  color: white;
  transition: background 0.3s;
  
  &:hover {
    background: #0056b3;
  }
`;

const DestructiveButton = styled(Button)`
  background: #dc3545;
  
  &:hover {
    background: #a71d2a;
  }
`;

const Avatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: not-allowed;
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (!storedUser) {
      navigate(LOGIN_PAGE);
      toast.error("Вы не авторизованы. Пожалуйста, авторизуйтесь.");
    }
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);





  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card>
        <div className="flex flex-col items-center">
          <Avatar>
          {user?.name}
          </Avatar>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaAddressCard className="text-gray-500" /> {}
          </h2>
          <p className="text-gray-500 text-sm">{user?.name}</p>
        </div>
        
        <CardContent>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input type="email"  disabled />
          </div>
          
          <Button>
            <FiEdit2 size={16} /> Обновить профиль
          </Button>
          
          <DestructiveButton >
            <FiLogOut size={16} /> Выйти
          </DestructiveButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
