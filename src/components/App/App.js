import React, { Component } from 'react'
import api from '../../utils/api'
import Button from '../Button/Button'
import HotelItem from '../HotelItem/HotelItem'
import './App.css'

class App extends Component {
  state = {
    hotels: [],
    errorMessage: null,
  }

  getHotels = () => {
    api.get('http://fake-hotel-api.herokuapp.com/api/hotels', this.onHotelsReceived)
  }

  onHotelsReceived = (hotels) => {
    if (hotels === 'error' || hotels.error) {
      this.setState({ errorMessage: 'An error occured' })
    } else {
      this.setState({ hotels, errorMessage: null })
    }
  }

  render() {
    const { hotels, errorMessage } = this.state

    return (
      <div className="App">
        <Button className="load-hotels-button" label="Load Hotels" onClick={this.getHotels} />
        {errorMessage ? <div className="error-message">{ errorMessage }</div> : null}
        {hotels.length ? <div className="hotels-container">{ hotels.map((hotel, i) => {
          return (
            <HotelItem data={hotel} key={hotel.id} />
          )
        }) }</div> : null}
      </div>
    )
  }
}

export default App
