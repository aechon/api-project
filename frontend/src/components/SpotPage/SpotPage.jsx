import { useLocation } from 'react-router-dom';
import './SpotPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotById } from '../../store/spots';
import { useEffect, useState } from "react";
import { getSpotReviews } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { CiStar } from "react-icons/ci";
import PostReviewModal from '../PostReviewModal/PostReviewModal.jsx';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal.jsx';


function AlertModal() {

  return (
    <>
      <text>Feature Coming Soon...</text>
    </>
  );
}

function SpotPage() {

  const id = useLocation().pathname.split('/')[2];

  const dispatch = useDispatch();
  const [reviewChange, setReviewChange] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const spot = useSelector(state => state.spot.spot);
  const reviews = useSelector(state => state.reviews.reviews);
  const session = useSelector(state => state.session);

  useEffect(() => {
    dispatch(getSpotById(id));
    dispatch(getSpotReviews(id));
  }, [dispatch, id, reviewChange]);

  useEffect(() => {
    if (reviewChange === true) {
      dispatch(getSpotReviews(id));
      setReviewChange(false);
      setRefresh(true);
    }
  }, [reviewChange, dispatch, id]);

  useEffect(() => {
    if (refresh === true) {
      dispatch(getSpotById(id));
      dispatch(getSpotReviews(id));
      setRefresh(false);
    }
  }, [refresh, dispatch, id]);
  

  let userId = null;
  if(session.user) userId = session.user.id;

  if (!spot || !spot.SpotImages || !spot.Owner.id || !reviews.Reviews) {
    return null;
  }

  const altImages = []
  for (let i =0; i < 4; i++) {
    let image = spot.SpotImages.find(image => !image.preview)
    if (image) altImages.push(image);
  }

  let reviewSummary = null;
  let reviewContent = null;
  let postReviewButton = null;

  if (reviews.Reviews.length === 0) {
    reviewSummary = (
      <div>
        <CiStar /> New
      </div>
    );
  } else if (reviews.Reviews.length === 1) {
    reviewSummary = (
      <div>
        <CiStar /> {Number.parseFloat(spot.avgStarRating).toFixed(1)} &#183; 1 Review
      </div>
    );
  } else {
    reviewSummary = (
      <div>
        <CiStar /> {Number.parseFloat(spot.avgStarRating).toFixed(1)} &#183; {spot.numReviews} Reviews
      </div>
    );
  }

  if (userId && reviews.Reviews.length === 0 && userId !== spot.Owner.id) {
    reviewContent = (
        <div>
          Be the first to post a review!
        </div>
    );
  } else {
    reviewContent = (
        <ul className='reviewList'>
          {reviews.Reviews
          .sort((a, b) => {
            const aDate = new Date(a.createdAt);
            const bDate = new Date(b.createdAt);
            return bDate - aDate;
          })
          .map((review) => (
          <li key={review.id}>
            <div className='reviewUser'>
                {review.User.firstName}
            </div>
            <div className='reviewDate'>
                {new Date(review.createdAt).toLocaleString('default', { month: 'long' })} {new Date(review.createdAt).toString().split(' ')[3]}
            </div>
            <div className='reviewbody'>
                {review.review}
            </div>
            <div className='reviewbody' hidden={review.userId !== userId}>
              <OpenModalButton 
                buttonText="Delete"
                modalComponent={<DeleteReviewModal reviewId={review.id} setReviewDeleted={setReviewChange} />}
              />
            </div>
          </li>
        ))}
        </ul>
    );
  }

  if (userId && userId !== spot.Owner.id && !reviews.Reviews.find(review => review.userId === userId)) {
    postReviewButton = (
      <OpenModalButton 
        buttonText="Post Your Review"
        modalComponent={<PostReviewModal setNewReview={setReviewChange} id={id} />}
      />
    );
  }

  return (
    <main className="spotDetails">
      <h1>{spot.name}</h1>
      <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
      <div className='spotImages'>
        <img src={spot.SpotImages.find(image => image.preview).url} className='mainImage' alt='' />
        <ul className='otherImages'>
        {altImages.map((image) => (
          <li key={image.id}>
            <img src={image.url} className='otherImage' alt ='' />
          </li>
        ))}
        </ul>
      </div>
      <div className='spotOverview'>
        <div className='spotDescription'>
            <h3>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h3>
            <p>{spot.description}</p>
        </div>
        <div className='spotBooking'>
            <div className='spotBookingDetails'>
                <div>
                ${Number.parseFloat(spot.price).toFixed(2)} night
                </div>
                {reviewSummary}
            </div>
            <OpenModalButton 
                buttonText="Reserve"
                modalComponent={<AlertModal />}
            />
        </div>
      </div>
      <div className="reviewsHeader">
        {reviewSummary}
      </div>
      {postReviewButton}
      {reviewContent}
    </main>
  );
}

export default SpotPage;