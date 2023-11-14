import {NavLink} from "react-router-dom";

// Styles
import Nav from '../assets/style/Header-Navbar/NavbarStyle.js'

// Icons
import {Person, PersonFill, PiggyBank as Earn, PiggyBankFill as EarnFill} from '@styled-icons/bootstrap/';
import {Home} from '@styled-icons/heroicons-outline/';
import {Home as HomeFill} from '@styled-icons/heroicons-solid/Home'
import {BookContacts as Contact} from '@styled-icons/fluentui-system-regular/';
import {BookContacts as ContactFill} from '@styled-icons/fluentui-system-filled/';
import {Payments as Payment} from '@styled-icons/material-outlined/';
import {Payments as PaymentFill} from '@styled-icons/material-sharp/';

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
  name: 'Contact',
  icon: <Contact className="inactive-icon" size={32}/>,
  iconActive: <ContactFill className="active-icon" size={32}/>,
  path: '/contact'
}];

export function Navbar() {
  return (
    <Nav>
      <ul>
        {section.map((item) => {
          return (
            <li key={item.name}>
              <NavLink to={item.path} className={({isActive}) => (isActive ? 'active' : '')}>
                {item.icon}
                {item.iconActive}
                <span>{item.name}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </Nav>
  )
}