import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export const App = () => {
    return (
        <div>
            <h1>MAIN PAGE</h1>
            <Link to={"/about"}>ABOUT</Link> <br />
            <Link to={"/shop"}>SHOP</Link>
            <Outlet/>
        </div>
    );
}
