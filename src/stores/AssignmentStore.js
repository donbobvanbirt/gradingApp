import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

import Storage from '../Storage';

let _assignments = Storage.read('assignments') || [];
let _totals = Storage.read('totals') || {
  score: 0,
  possible: 0,
  grade: ''
}

class AssignmentStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'ADD_ASSIGNMENT':
          let assign = action.payload.assigment;

          let percent = (assign.points / assign.possiblePoints) * 100;
          // console.log('percent:', percent);
          if (percent >= 90) {
            assign.grade = 'A';
          } else if (percent < 90 && percent >= 80) {
            assign.grade = 'B';
          } else if (percent < 80 && percent >= 70) {
            assign.grade = 'C';
          } else if (percent < 70 && percent >= 60) {
            assign.grade = 'D';
          } else {
            assign.grade = 'F';
          }


          // console.log('in store', action.payload.assigment);
          _assignments.push(assign);
          this.calculateTotals();
          this.emit('CHANGE')
        break
        case 'REMOVE':
          _assignments = _assignments.filter(assigment => assigment.id !== action.payload.id);
          this.calculateTotals();
          this.emit('CHANGE')
        break
      }
    });
    this.on('CHANGE', () => {
      Storage.write('assignments', _assignments);
      Storage.write('totals', _totals);
    })
  }

  calculateTotals() {
    _totals = {
      score: 0,
      possible: 0,
      grade: ''
    }
    _assignments.forEach(assig => {
      _totals.score += parseInt(assig.points);
      _totals.possible += parseInt(assig.possiblePoints);
    })
    let totalPercent = (_totals.score / _totals.possible) * 100;
    if (totalPercent >= 90) {
      _totals.grade = 'A';
    } else if (totalPercent < 90 && totalPercent >= 80) {
      _totals.grade = 'B';
    } else if (totalPercent < 80 && totalPercent >= 70) {
      _totals.grade = 'C';
    } else if (totalPercent < 70 && totalPercent >= 60) {
      _totals.grade = 'D';
    } else {
      _totals.grade = 'F';
    }
    console.log('totals', _totals);
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _assignments;
  }

  getTotal() {
    return _totals;
  }

}

export default new AssignmentStore;
