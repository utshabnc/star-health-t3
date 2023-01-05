import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import ReactStars from "react-star-rating-component";

interface Review {
  reviewText: string;
  reviewStars: number;
  onSubmitReview: MouseEventHandler<HTMLButtonElement>;
  setReviewText: ChangeEventHandler<HTMLTextAreaElement>;
  setReviewStars: (newRating: number) => void;
}

function ReviewForm(review: Review) {
  const [reviewStarsShown, setReviewStarsShown] = useState(5);
  return (
    <>
      <div className="flex flex-col px-8">
        <ReactStars
          name="rating"
          value={reviewStarsShown}
          starCount={5}
          starColor="#ffd700"
          onStarHover={setReviewStarsShown}
          onStarHoverOut={() => setReviewStarsShown(review.reviewStars)}
          onStarClick={review.setReviewStars}
        />
        <textarea
          className="mt-5 resize-none appearance-none rounded-md border-violet-600 py-2 pl-3 text-gray-800
shadow-lg ring ring-violet-600 focus:ring focus:ring-indigo-700 focus:ring-offset-2"
          placeholder="Write a review..."
          value={review.reviewText}
          onChange={review.setReviewText}
        />
        <button
          className="mt-4 rounded-md bg-violet-600 px-2 py-2 text-white hover:bg-violet-700 active:bg-indigo-700 disabled:bg-violet-600/50"
          onClick={review.onSubmitReview}
        >
          Submit Review
        </button>
      </div>
    </>
  );
}

export default ReviewForm;
