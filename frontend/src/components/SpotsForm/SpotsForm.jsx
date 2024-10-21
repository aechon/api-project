import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './SpotsForm.css';
import { createSpot, getSpotById, updateSpot } from '../../store/spots';
import {addImageToSpot } from '../../store/images';

function SpotForm() {

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [previewPhoto, setPreviewPhoto] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");

  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState('Create Spot')

  const spot = useSelector(state => state.spots);
  const navigate = useNavigate();
  
  const id = useLocation().pathname.split('/')[2];

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getSpotById(id));
      setButtonText('Update your spot');
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id !== 'new') {
      setAddress(spot.spot.address);
      setCity(spot.spot.city);
      setState(spot.spot.state);
      setCountry(spot.spot.country);
      setLat(spot.spot.lat);
      setLng(spot.spot.lng);
      setDescription(spot.spot.description);
      setName(spot.spot.name);
      setPrice(spot.spot.price);
    }
  }, [spot, id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!isValidUrl(previewPhoto) || previewPhoto === '') return;

    if (id !== 'new') {
      dispatch(updateSpot({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      }, id)
    )
    .then(()=> {
      navigate(`/spots/${id}`);
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    });
    } else {


      let newSpot = await dispatch(createSpot({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })
      )
      .catch(async (res) => {
        const data = await res.json();
       if (data?.errors) {
         if (!isValidUrl(previewPhoto) || previewPhoto === '') data.errors.preview = 'Invalid URL';
         setErrors(data.errors);
       }
     });

    if(newSpot) {
      const spotData = await newSpot.json()
      await dispatch(addImageToSpot({
              url: previewPhoto,
              preview: true
              }, spotData.id))
      // if (isValidUrl(photo2) && photo2 !== '') {
      //   await dispatch(addImageToSpot({
      //     url: photo2,
      //     preview: false
      //     }, spotData.id));
      // };
      navigate(`/spots/${spotData.id}`);
    }
    }
  };



  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className='formDiv'>
          <h3>Where&apos;s your place located?</h3>
          <text>Guests will only get your exact address once they booked a reservation</text>
          <label>
            <p>Country</p>
            <input
              type="text"
              value={country}
              placeholder='Country'
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          {errors.country && <p className='error'>{errors.country}</p>}
          <label>
            <p>Street Address</p>
            <input
              type="text"
              value={address}
              placeholder='Street Address'
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {errors.address && <p className='error'>{errors.address}</p>}
          <label>
            <p>City</p>
            <input
              type="text"
              value={city}
              placeholder='City'
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          {errors.city && <p className='error'>{errors.city}</p>}
          <label>
            <p>State</p>
            <input
              type="text"
              value={state}
              placeholder='State'
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          {errors.state && <p className='error'>{errors.state}</p>}
          <label>
            <p>Latitude</p>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          {errors.lat && <p className='error'>{errors.lat}</p>}
          <label>
            <p>Longitude</p>
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </label>
          {errors.lng && <p className='error'>{errors.lng}</p>}
        </div>
        <div className='formDiv'>
          <h3>Describe your place to guests</h3>
          <text>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</text>
          <label>
            <textarea
              className='descriptionBox'
              type="text"
              value={description}
              placeholder='Please write at least 30 characters'
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {errors.description && <p className='error'>{errors.description}</p>}
        </div>
        <div className='formDiv'>
          <h3>Create a title for your spot</h3>
          <text>Catch guests&apos; attention with a spot title that highlights what makes your place special</text>
          <label>
            <input
              type="text"
              value={name}
              placeholder='Name of your spot'
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>
        <div className='formDiv'>
          <h3>Set a base price for your spot</h3>
          <text>Competitive pricing can help your listing stand out and rank higher in search results.</text>
          <div className='priceDiv'>
            <label>
            <input
              type="number"
              value={price}
              placeholder='Price per night (USD)'
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          </div>
          {errors.price && <p className='error'>{errors.price}</p>}
        </div>
        <div className='formDiv'>
          <h3>Liven up your spot with photos</h3>
          <text>Submit a link to at least one photo to publish your spot.</text>
          <label>
            <input
              type="text"
              value={previewPhoto}
              placeholder='Peview Image URL'
              onChange={(e) => setPreviewPhoto(e.target.value)}
            />
          </label>
          {errors.preview && <p className='error'>{errors.preview}</p>}
          <label>
            <input
              type="text"
              value={photo2}
              placeholder='Image URL'
              onChange={(e) => setPhoto2(e.target.value)}
            />
          </label><label>
            <input
              type="text"
              value={photo3}
              placeholder='Image URL'
              onChange={(e) => setPhoto3(e.target.value)}
            />
          </label><label>
            <input
              type="text"
              value={photo4}
              placeholder='Image URL'
              onChange={(e) => setPhoto4(e.target.value)}
            />
          </label><label>
            <input
              type="text"
              value={photo5}
              placeholder='Image URL'
              onChange={(e) => setPhoto5(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">{buttonText}</button>
      </form>
    </>
  );
}

export default SpotForm;