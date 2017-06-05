/**
 * Created by Kyle on 6/5/2017.
 */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router';

import { makeSelectOrder } from 'containers/Home/selectors';
import STable from 'components/STable';
import './styles/index.scss';

class Summary extends React.Component{

  render() {
    const { order } = this.props;

    return (
      <div className="main_div">
        <h2>Order Summary</h2>
        <STable order={order} />
        <div>
          <Link to="/">Order Again</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  order: makeSelectOrder(),
});


export default connect(mapStateToProps, null)(Summary);