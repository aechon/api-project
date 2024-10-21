import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './PostReviewModal.css';
import { postReview } from '../../store/reviews';
import { useLocation } from 'react-router-dom';

function PostReviewModal({setNewReview}) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();
  const [disable, setDisable] = useState(true);

  const id = useLocation().pathname.split('/')[2];

  useEffect(() => {
    if (review.length < 10 || stars === 0) setDisable(true);
    else setDisable(false);
  }, [review, stars])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors('');
    setNewReview(true);
    return dispatch(
      postReview({
        review,
        stars
      }, id)
      )
      .then(()=> {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.message) {
          setErrors(data.message);
        }
      });
  };

  return (
    <>
      <form className='reviewForm' onSubmit={handleSubmit}>
        <h2 className='reviewFormTitle'>How was your stay?</h2>
        <p className='error'>{errors}</p>
        <textarea className='reviewTextBox'
            type="text"
            value={review}
            placeholder='Leave your review here...'
            onChange={(e) => setReview(e.target.value)}
            required
        />
        <span className='reviewSpan'>
            {[1, 2, 3, 4, 5].map((star) => {
            return (  
                <span
                className='start'
                style={{
                    cursor: 'pointer',
                    color: hoverStars >= star ? 'gold' : 'gray',
                    fontSize: `35px`,
                }}
                onClick={() => {
                    setStars(star)
                }}
                onMouseOver={() => {
                    setHoverStars(star)
                }}
                onMouseOut={() => {
                    setHoverStars(stars)
                }}
                >
                {' '}
                ★{' '}
                </span>
            )
            })}
             <label>Stars</label></span>
        <button disabled={disable} type="submit">Submit your review</button>
      </form>
    </>
  );
}

export default PostReviewModal;