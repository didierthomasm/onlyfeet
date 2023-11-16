import {NavLink} from "react-router-dom";
import React, {useId} from "react";

// Styles
import Nav from '../assets/style/Header-Navbar/NavbarStyle.js'

// Icons
import {Person, PersonFill, PiggyBank as Earn, PiggyBankFill as EarnFill} from '@styled-icons/bootstrap/';
import {Home} from '@styled-icons/heroicons-outline/';
import {Home as HomeFill} from '@styled-icons/heroicons-solid/Home'
import {Payments as Payment} from '@styled-icons/material-outlined/';
import {Payments as PaymentFill} from '@styled-icons/material-sharp/';
import {HelpCircle as Help} from '@styled-icons/boxicons-regular/';
import {HelpCircle as HelpFill} from '@styled-icons/boxicons-solid/';
import {LogOut} from '@styled-icons/ionicons-outline/';


// Navbar sections
const section = [{
  name: 'Home',
  icon: <Home className="inactive-icon" size={32}/>,
  iconActive: <HomeFill className="active-icon" size={32}/>,
  path: '/'
}, {
  name: 'Profile',
  icon: <Person className="inactive-icon" size={32}/>,
  iconActive: <PersonFill className="active-icon" size={32}/>,
  path: '/profile'
}, {
  name: 'Pay',
  icon: <Payment className="inactive-icon" size={32}/>,
  iconActive: <PaymentFill className="active-icon" size={32}/>,
  path: '/payment'
}, {
  name: 'Earn',
  icon: <Earn className="inactive-icon" size={32}/>,
  iconActive: <EarnFill className="active-icon" size={32}/>,
  path: '/earnings'
}, {
  name: 'Help',
  icon: <Help className="inactive-icon" size={32}/>,
  iconActive: <HelpFill className="active-icon" size={32}/>,
  path: '/help'
}, {
  name: 'Logout',
  icon: <LogOut className="inactive-icon" size={32}/>,
  iconActive: <LogOut className="active-icon" size={32}/>,
  path: '/logout'
}
];

export function Navbar() {
  return (
    <Nav>
      <ul>
        {section.map((item) => {
          const uniqueId = useId() + item.name;
          return (
            <React.Fragment key={uniqueId}>
              <li>
                <NavLink to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {item.icon}
                  {item.iconActive}
                  <span>{item.name}</span>
                </NavLink>
              </li>

              {item.name === 'Profile' || item.name === 'Earn' ? <hr /> : ''}
            </React.Fragment>
          )
        })}
      </ul>
    </Nav>
  )
}
