import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function STable(props) {
  const { order } = props;

  console.log('summary', order);

  let content = <div>empty!</div>;
  if (order) {
    content = order.map((item, index) => (
      <tr key={`sum-${index}`}>
        <td>{index}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
      </tr>
    ));
  }

  return (
    <Table responsive striped hover condensed >
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Quantity</th>
      </tr>
      </thead>
      <tbody>
      {content}
      </tbody>
    </Table>
  )
}


STable.propTypes = {
  order: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ])
};