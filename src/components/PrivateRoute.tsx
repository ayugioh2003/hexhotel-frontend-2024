import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
const loginStatus = true;

const AuthRoute = () => {
  const [isLogin] = useState<boolean>(loginStatus);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthRoute', isLogin);
    if (!isLogin) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

const NonAuthRoute = () => {
  const [isLogin] = useState<boolean>(loginStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/index');
    }
  }, []);

  return (
    <>
      Non Auth Route
      <Outlet />
    </>
  );
};

export { AuthRoute, NonAuthRoute };
