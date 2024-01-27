import React, { useContext } from 'react';
import { isAuthenticated } from '../auth';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../../pages/login';
import Usuario from '../../pages/usuario/index';
import Dashboard from '../../pages/dashboard';
import AccessDenied from '../../components/accessDenied';
import {Fragment} from 'react';
import Lista from '../../pages/lista';
import Sidebar from '../../components/sidebar';
import Formulario from '../../pages/lista/formulario';

const PrivateRoute = (props) => {
    const  token = localStorage.getItem('token');
    return isAuthenticated(token) ? <Sidebar title={props.title}> {props.Component} </Sidebar>: <Navigate to="/"/>;
}

const Router = () => {
    return(
        <BrowserRouter>
        <Fragment>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route exact path='/usuario' element={<PrivateRoute Component={<Usuario />} title={"Usuario"} />} />
                <Route path='/dashboard' element={<PrivateRoute Component={<Dashboard/>} title={"Dashboard"} />} />
                <Route path='/lista' element={<PrivateRoute Component={<Lista/>} title={"Lista"} />} />
                <Route path='/formulario/lista' element={<PrivateRoute Component={<Formulario/>} title={"Lista"} />} />
                <Route path='/accessDenied' element={<AccessDenied/>} />               
            </Routes>
            </Fragment>
        </BrowserRouter>
    );
}
export default Router;
