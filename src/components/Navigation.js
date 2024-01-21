import React, {useState} from "react";
import { Link } from "react-router-dom";

import { MenuItems } from "./Menu";
import "./navigation.css";

export default function Navigation () {
  const [clicked, setClicked] = useState(false);
  const handleClick = () =>{
    setClicked(!clicked);
  }
  
    return (
      <nav className="NavbarItens">
        <div className="navbar-logo">
        Predict Cacao
        </div>
        <div className="menu-icons" onClick={handleClick} >
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index} >
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}>
                    {item.title}
                  </i>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
  