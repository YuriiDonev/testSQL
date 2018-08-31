import React, { Component } from 'react';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class Cars extends Component {

  state = {
    cars: [],
    query: '',
  }

  componentDidMount() {
    this.getCars();
  }

  sendData = () => {
    axios({
      url: 'http://localhost:4000/cars/add',
      method: 'POST',
      data: {query: this.state.query},
      headers
    }).then(response => {
        console.log('response ', response);
      }, error => {
        console.log('error ', error);
      }).catch(error => {
        console.log('error ', error);
    });
  }

  getCars = () => {
    axios({
      url: 'http://localhost:4000/cars',
      method: 'GET',
      headers
    }).then(response => {
        this.setState({ cars: response.data.data.recordset });
      }, error => {
        console.log('error ', error);
      }).catch(error => {
        console.log('error ', error);
    });
  }

  setInput = (e) => {
    if (e.target.name === 'query') {
      this.setState({ query: e.target.value });
    }
  }

  render() {

    return (
      <div className="cars">
        {
          this.state.cars.map((car, i) => <div key={i}>{car.model}</div>)
        }

        <div>
          <input name='query' onChange={this.setInput} value={this.state.query} />
          <button onClick={this.sendData}>{'SEND'}</button>
        </div>
      </div>
    );
  }
}

export default Cars;
