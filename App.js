import React from 'react';
import {Provider} from 'react-redux';
import store from './src/Store/index';
import Navigation from './src/container/Navigation';
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
