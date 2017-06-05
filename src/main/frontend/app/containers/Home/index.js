/**
 * Created by Kyle on 6/4/2017.
 */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Alert,
} from 'react-bootstrap';

import { fetchItems, updateOrder, placeOrder } from './actions';
import './styles/index.scss';
import {
  makeSelectItems,
  makeSelectOrder,
  makeSelectError,
  makeSelectLoading,
} from './selectors';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
  }

  componentDidMount() {
    this.props.loadItems();
  }

  onChangeItemQuantity(evt, item){
    if (item){
      const order = this.props.order;

      let newOrder = [];

      if (order){
        newOrder = [].concat(this.props.order);
      }
      let isExist = false;

      newOrder.map((nItem) => {
        if (nItem.id === item.id) {
          nItem.quantity = evt.target.value;
          isExist = true;
        }
      });

      if (!isExist) {
        newOrder.push({id: item.id, quantity: evt.target.value, name: item.name});
      }
      this.props.onUpdateOrder(newOrder);
    }
  }

  render() {
    const { items, order, onSubmitForm, error } = this.props;
    let content = <div>Empty!</div>;
    let shoppingContent = <div></div>;
    let errorContent = <div></div>;

    if (error) {
      errorContent = (
        <Alert bsStyle="danger">
          {error}
        </Alert>
      )
    }

    if (items) {
      content = items.map((item, index) => (
        <ListGroupItem key={`item-${index}`}>
          {item.name}: {item.amount} left
        </ListGroupItem>
      ));

      const oderQuantityObj = {};
      if (order){
        order.map((o) => {
          oderQuantityObj[o.id] = o.quantity;
        })
      }


      const shoppingItem = items.map((item, index) => (
        <FormGroup key={`shopitem-${index}`} controlId="formItemAQuantity" >
          <Col componentClass={ControlLabel} sm={2} >
            {item.name}
          </Col>
          <Col sm={10}>
            <FormControl type="number" min="1" max={item.amount} className="input_num"
                         value={oderQuantityObj && oderQuantityObj[item.id]? oderQuantityObj[item.id] : 0}
                         onChange={(evt) => this.onChangeItemQuantity(evt, item)}/>
          </Col>
        </FormGroup>
      ));

      shoppingContent = (
        <div className="form_block">
          <div className="title_margin">Your Shopping:</div>
          <div>
            <Form horizontal onSubmit={onSubmitForm}>
              {shoppingItem}
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Buy
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      );
    }


    return (
      <div className="main_div">
        {errorContent}
        <ListGroup>
          {content}
        </ListGroup>
        {shoppingContent}
      </div>
    );
  }
}

Home.propTypes = {
  items: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  loadItems: React.PropTypes.func,
  onUpdateOrder: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectItems(),
  order: makeSelectOrder(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadItems: () => dispatch(fetchItems()),
    onUpdateOrder: (order) => dispatch(updateOrder(order)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(placeOrder());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);