import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => (localStorage.getItem('authToken') ? children : <Redirect to="/Login" />)}
  />
);

export default PrivateRoute;
