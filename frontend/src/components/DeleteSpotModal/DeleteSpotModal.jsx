import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css';
import { removeSpot } from '../../store/spots'

function DeleteSpotModal({spotId, setSpotDeleted}) {
  
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeSpot(spotId));
    // console.log('deleted', spotId);
    closeModal();
    setSpotDeleted(true);
  };

  return (
    <div className='deleteBox'>
      <h2 className='deleteElements'>Confirm Delete</h2>
      <p className='deleteElements'>Are you sure you want to remove this spot from the listings?</p>
      <button className='deleteElements deleteButton deleteConfirm' onClick={handleDelete}>Yes (Delete Spot)</button>
      <button className='deleteElements deleteButton deleteDecline' onClick={closeModal}>No (Keep Spot</button>
    </div>
  );
}

export default DeleteSpotModal;