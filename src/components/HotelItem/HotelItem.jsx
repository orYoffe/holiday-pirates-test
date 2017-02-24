import React, { Component, PropTypes } from 'react'
import api from '../../utils/api'
import { formatDate } from '../../utils/common'
import Button from '../Button/Button'
import ReviewItem from '../ReviewItem/ReviewItem'
import './HotelItem.css'

class HotelItem extends Component {
  static proptypes = {
    type: PropTypes.string,
    data: PropTypes.obj,
  }

  state = {
    showReviews: false,
    reviews: [],
    errorMessage: null,
  }

  toggleReviews = () => {
    const { showReviews, reviews } = this.state
    if(!reviews.length) {
      this.getReviews()
    } else {
      this.setState({ showReviews: !showReviews })
    }
  }

  getReviews = () => {
    const { id } = this.props.data
    api.get(`http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=${id}`, this.onReviewsReceived)
  }

  onReviewsReceived = (reviews) => {
    if (reviews === 'error' || reviews.error || reviews.length < 1) {
      this.setState({ errorMessage: 'An error occured', showReviews: true })
    } else {
      this.setState({ reviews, errorMessage: null, showReviews: true })
    }
  }

  render() {
    const {
      images,
      name,
      country,
      city,
      price,
      date_start,
      date_end,
      stars,
      description,
    } = this.props.data

    const { showReviews, reviews, errorMessage } = this.state
    const dates = `${formatDate(new Date(date_start))} - ${formatDate(new Date(date_end))}`
    const reviewButtonLabel = showReviews ? 'Hide reviews' : 'Show reviews'
    const missingStartsNum = 5 - stars

    const starsContainer = (
      <div className="hotel-stars">
        {stars && new Array(stars).fill(null).map((t, i) => <span key={i}>&#9733;</span>)}
        {new Array(missingStartsNum).fill(null).map((J, i) => <span key={i+5} style={{ opacity: .5 }}>&#9733;</span>)}
      </div>
    )

    const reviewsContainer = showReviews && (
      <div className="hotel-reviews">
        {errorMessage ? <div className="error-message">{ errorMessage }</div> : <div className="reviews-container">{ reviews.map((review, i) => {
          return (
            <ReviewItem {...review} key={`${review.hotel_id}_review_${i}`} />
          )
        }) }</div>}
      </div>
    )

    return (
      <div className="hotel">
        <div className="hotel-overview">
          <div className="hotel-image"><img src={images[0]} role="presentation"/></div>
          <div className="hotel-info">
            <div className="hotel-header">
              <div className="hotel-title">{name}</div>
              <div className="hotel-location">{`${city} - ${country}`}</div>
              {starsContainer}
            </div>
            <div className="hotel-description">{description}</div>
            <Button className="show-reviews-button" label={reviewButtonLabel} onClick={this.toggleReviews} />
            <div className="hotel-price">{price} &#8364;</div>
            <div className="hotel-dates">{dates}</div>
          </div>
        </div>
        {reviewsContainer}
      </div>
    )
  }
}

export default HotelItem
