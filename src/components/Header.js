import React from 'react';
import './Header.css';
import Logo from "./img/netflix.png.png";
import Usu from "./img/perfil.png";




export default ({black}) => {
    return (
        <header className= {black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={Logo} alt="Netflix" title="Netflix"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={Usu} alt="Perfil" title="Perfil do usuario"></img>
                </a>
            </div>
        </header>
    );
}