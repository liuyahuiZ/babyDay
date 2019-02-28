import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import LayOut from './core/LayOut';
import Secret from './page/secret';

const SuccessPage = (location, cb) => {
  require.ensure([], require => {
      cb(null, require('./page/successPage').default)
  },'SuccessPage')
};

class MyRouter extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <Router history={hashHistory}>
      <Route path={'/'} component={LayOut} >
        {/* <IndexRoute component={ListDoc} /> */}
        <IndexRedirect to="/Secret"/>
        <Route path={'Secret'} component={Secret} />
        <Route path={'Success'} getComponent={SuccessPage} />
       
      </Route>
    </Router>
    )
  }
}
export default MyRouter
