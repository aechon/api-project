import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import './TileList.css';
import { getSpots, getUserSpots } from '../../store/spots'
import { CiStar } from "react-icons/ci";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal.jsx';


function LandingPage({ user }) {

  //find distance from root
  let pathMod = '';
  for (let i = 0; i < useLocation().pathname.split('/').length-1; i++) pathMod+='../';

  const dispatch = useDispatch();

  const [spotDeleted, setSpotDeleted] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const spots = useSelector(state => state.spots);

  useEffect(() => {
    if (pathMod === '../') dispatch(getSpots());
    else dispatch(getUserSpots());
  }, [dispatch, pathMod]);

  useEffect(() => {
    if (spotDeleted === true) {
      if (pathMod === '../') dispatch(getSpots());
      else dispatch(getUserSpots());
      setSpotDeleted(false);
      setRefresh(true);
    }
  }, [dispatch, pathMod, spotDeleted]);

  useEffect(() => {
    if (refresh === true) {
      if (pathMod === '../') dispatch(getSpots());
      else dispatch(getUserSpots());
      setSpotDeleted(false);
      setRefresh(false);
    }
  }, [dispatch, pathMod, refresh]);
  

  let spotsArray = [];
  if(spots) spotsArray = spots.spots.Spots;

  if (!spotsArray) return null;

  let addSpotButton = null;

  if (spotsArray.length === 0) {
    addSpotButton = (
        <button><NavLink to='/spots/new' className="navLink"> Create A New Spot </NavLink></button>
    );
  }

  return (
    <main>
      <ol>
        {addSpotButton}
        {spotsArray.map(({ id, name, previewImage, city, state, avgRating, price }) => (
          
          <li className='tile-container' key={id}>
            <div className='tile tooltip'>
            <span className="tooltiptext">{name}</span>
              <NavLink to={`${pathMod}spots/${id}`}>
                <img className='preview' src={previewImage} />
                <div className='middle-row'>
                    <div>
                        {`${city}, ${state}`}
                    </div>
                    <div className='rating'>
                      <CiStar />{avgRating ? Number.parseFloat(avgRating).toFixed(1)  : 'New'}
                    </div>
                </div>
                ${Number.parseFloat(price).toFixed(2)} night
              </NavLink>
              {user ? (
                <div className="manageButtons">
                  <button><NavLink to={`/spots/${id}/edit`} className="navLink"> Update </NavLink></button>
                  <OpenModalButton 
                    buttonText="Delete"
                    modalComponent={<DeleteSpotModal spotId={id} setSpotDeleted={setSpotDeleted} />}
                  />
                </div>
                ) : (
                <>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}

export default LandingPage;