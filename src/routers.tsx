import { createHashRouter } from "react-router-dom"
import Index from '@/pages/Index.tsx'
import Login from '@/pages/Login.tsx'
import Register from "@/pages/Register.tsx"
import Member from "@/pages/Member.tsx"
import NotFound from "@/pages/NotFound.tsx"
import BookRoom from "@/pages/BookRoom.tsx"
import { AuthRoute, NonAuthRoute } from '@/components/PrivateRoute.tsx'


const routers = createHashRouter([
    {
        index: true,
        element: <Index />,
    },
    {
        path: "Index",
        element: <Index />,
    },
    {
        path: "/",
        element: <AuthRoute />,
        children: [
            {
                path: "/Member",
                element: <Member />,
            },
        ]
    },
    {
        path: "/",
        // element: <AuthRoute />,
        children: [
            {
                path: "/BookRoom",
                element: <BookRoom />,
            },
        ]
    },
    {
        path: "/",
        element: <NonAuthRoute />,
        children: [
            {
                path: "/Login",
                element: <Login />,
            },
            {
                path: "/Register",
                element: <Register />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

// Page     NonLogin    Login   
// Index           O        O   
// Login           O        X   
// Register        O        X
// Member          X        O 


export default routers