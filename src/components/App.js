import React, { Component } from 'react';

import AddAssignments from './AddAssignments';
import AssigmentTable from './AssigmentTable';
import AssignmentStore from '../stores/AssignmentStore';
import AssigmentActions from '../actions/AssigmentActions';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assigments: AssignmentStore.getAll(),
      totals: AssignmentStore.getTotal()
    }
    this._onChange = this._onChange.bind(this);

  }

  // start listening
componentWillMount() {
  AssignmentStore.startListening(this._onChange)
}

// stop listening
componentWillUnmount() {
  AssignmentStore.stopListening(this._onChange)
}

_onChange() {
  this.setState({
    assigments: AssignmentStore.getAll(),
    totals: AssignmentStore.getTotal()
  })
  console.log('state:', this.state);
}

delete(id) {
  console.log('delete', id);
  AssigmentActions.remove(id);
}

  render() {
    const { assigments, totals } = this.state;
     return (
       <div>
         <h1>Grading App</h1>
         <AddAssignments/>
         <AssigmentTable assigments={assigments} totals={totals} delete={this.delete}/>
       </div>
     )
  }
}
