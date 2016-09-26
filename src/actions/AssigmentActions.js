import AppDispatcher from '../AppDispatcher'

const AssigmentActions = {
  addNew(assigment) {
    AppDispatcher.dispatch({
      type: 'ADD_ASSIGNMENT',
      payload: { assigment }
    })
    // console.log('in action', assigment);
  },
  remove(id) {
    AppDispatcher.dispatch({
      type: 'REMOVE',
      payload: { id }
    })
  }
}

export default AssigmentActions;
