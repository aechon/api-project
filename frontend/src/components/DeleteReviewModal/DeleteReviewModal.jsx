import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReviewModal.css';
import { removeReview } from '../../store/reviews'

function DeleteReviewModal({reviewId, setReviewDeleted}) {
  
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeReview(reviewId));
    console.log('deleted', reviewId);
    closeModal();
    setReviewDeleted(true);
  };

  return (
    <div className='deleteBox'>
      <h2 className='deleteElements'>Confirm Delete</h2>
      <p className='deleteElements'>Are you sure you want to delete this review?</p>
      <button className='deleteElements deleteButton deleteConfirm' onClick={handleDelete}>Yes (Delete Review)</button>
      <button className='deleteElements deleteButton deleteDecline' onClick={closeModal}>No (Keep Review</button>
    </div>
  );
}

export default DeleteReviewModal;