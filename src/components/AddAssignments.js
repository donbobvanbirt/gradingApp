import React, { Component } from 'react';
import uuid from 'uuid';

import AssigmentActions from '../actions/AssigmentActions';

export default class AddAssignments extends Component {
  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }
  _submitForm(e) {
    e.preventDefault();
    const { name, possiblePoints, points } = this.refs;

    let newAssignment = {
      name: name.value,
      possiblePoints: possiblePoints.value,
      points: points.value,
      id: uuid()
    }

    name.value = '';
    possiblePoints.value = '';
    points.value = '';

    console.log('newAssignment', newAssignment);

    AssigmentActions.addNew(newAssignment);
  }

  render() {
    return (
      <div>
        <form onSubmit={this._submitForm} className="form-inline">
          <div className="form-group">
            <label htmlFor="name">Assigment</label>
            <input ref="name"></input>
            <label htmlFor="possiblePoints">Possible Points</label>
            <input ref="possiblePoints"></input>
            <label htmlFor="points">Points</label>
            <input ref="points"></input>
          </div>
          <button className='btn btn-default'>Add</button>

        </form>
      </div>
    )
  }
}

// export default AddAssignments;
