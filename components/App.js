import React, { Component } from 'react';

import AddAssignments from './AddAssignments';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }


  }

  render() {
     return (
       <div>
         <h1>Grading App!!!!!</h1>
         <AddAssignments/>
       </div>
     )
  }
}
