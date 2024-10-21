import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './Icon/logo.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let createSpotLink= null;
  if (sessionUser) {
    createSpotLink = (
        <NavLink to='/spots/new' className="navLink"> Create A New Spot </NavLink>
    );
  }

  return (
    <ul className='navigation'>
      <li>
        <NavLink to="/">
          <img className='logo' src={logo}></img>
        </NavLink>
      </li>
      {isLoaded && (
        <li className='navButtons'>
          {createSpotLink}
          <div className='profileButton'>
            <ProfileButton user={sessionUser} />
          </div>
        </li>
      )}
    </ul>
  );
}

export default Navigation;