import Home from "./Home";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import SignIn from "./SignIn";
import { AuthProvider } from "../Auth";
import ApplyLeave from "./ApplyLeave";
import AlternateArrangement from "./AlternateArrangement";
import CheckLeaves from "./CheckLeaves";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Home}>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path='/applyLeave' component={ApplyLeave}>
            <ApplyLeave />
          </PrivateRoute>
          <PrivateRoute
            exact
            path='/alternateArrangement'
            component={AlternateArrangement}
          >
            <AlternateArrangement />
          </PrivateRoute>
          <PrivateRoute exact path='/checkLeaves' component={CheckLeaves}>
            <CheckLeaves />
          </PrivateRoute>
          <Route path='/signin'>
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
