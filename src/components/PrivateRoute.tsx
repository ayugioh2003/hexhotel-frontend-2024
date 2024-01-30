<<<<<<< HEAD
import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react";

import useUserStore from "@/store/useUserStore";

const AuthRoute = () => {
    //const [isLogin] = useState<boolean>(loginStatus)
    const navigate = useNavigate()
    const token = useUserStore(s => s.token)

    console.log(token)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Outlet />        
        </>
    )
}

const NonAuthRoute = () => {
    //const [isLogin] = useState<boolean>(loginStatus)
    const token = useUserStore(s => s.token)
    const navigate = useNavigate()

    console.log(token)

    useEffect(() => {
        if (token) {
            navigate('/index')
        }
    }, [])

    return (
        <>
            <Outlet />        
        </>
    )
}
=======
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
>>>>>>> origin/develop

export { AuthRoute, NonAuthRoute };
