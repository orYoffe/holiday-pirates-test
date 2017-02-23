import React, { PropTypes } from 'react'
import './ReviewItem.css'

const ReviewItem = ({
  positive,
  comment,
  name,
}) => {

  return (
    <div className="review">
      <div className="review-marker">{positive ? '+' : '-'}</div>
      <div>
        <div>{name}</div>
        <div className="review-description">{comment}</div>
      </div>
    </div>
  )
}

ReviewItem.proptypes = {
  positive: PropTypes.bool,
  comment: PropTypes.string,
  name: PropTypes.string,
}

export default ReviewItem
