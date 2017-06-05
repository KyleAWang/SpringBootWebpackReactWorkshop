/**
 * Created by Kyle on 6/5/2017.
 */
import React from 'react';

import './styles/index.scss'

export function App(props) {
  return (
    <div>
      {React.Children.toArray(props.children)}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;