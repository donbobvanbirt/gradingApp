import React, { Component } from 'react';

const AssigmentTable = props => {
  const { assigments, totals } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Assignemt</th>
          <th>Points</th>
          <th>Possible Points</th>
          <th>Grade</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {assigments.map(assigment => (
          <tr key={assigment.id}>
            <td>{assigment.name}</td>
            <td>{assigment.points}</td>
            <td>{assigment.possiblePoints}</td>
            <td>{assigment.grade}</td>
            <td><button onClick={props.delete.bind(null, assigment.id)} className="btn btn-danger">Delete</button></td>
          </tr>
        ))}
        <tr>
          <td>Totals:</td>
          <td>{totals.score}</td>
          <td>{totals.possible}</td>
          <td>{totals.grade}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default AssigmentTable;
