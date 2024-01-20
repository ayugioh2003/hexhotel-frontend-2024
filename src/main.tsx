import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import routers from '@/routers'
import '@/styles/index.scss'
import "virtual:svg-icons-register";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={routers} />
    </React.StrictMode>,
)
