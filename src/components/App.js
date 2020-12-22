import Home from "./Home";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import SignIn from "./SignIn";
import { AuthProvider } from "../Auth";
import ApplyLeave from "./ApplyLeave";
import AlternateArrangement from "./AlternateArrangement";
import CheckLeaves from "./CheckLeaves";
import FacultyDetails from "./FacultyDetails";
import CheckAlt from "./CheckAlt";
import LeavesToday from "./LeavesToday";
import SignUp from "./SignUp";
import Register from "./Register";
import ESign from "./ESign";

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
          <PrivateRoute exact path='/facultyDetails' component={FacultyDetails}>
            <FacultyDetails />
          </PrivateRoute>
          <PrivateRoute exact path='/checkAlt' component={CheckAlt}>
            <CheckAlt />
          </PrivateRoute>
          <PrivateRoute exact path='/leavesToday' component={LeavesToday}>
            <LeavesToday />
          </PrivateRoute>
          <PrivateRoute exact path='/signup' component={SignUp}>
            <SignUp />
          </PrivateRoute>
          <PrivateRoute exact path='/register' component={Register}>
            <Register />
          </PrivateRoute>
          <PrivateRoute exact path='/esign' component={ESign}>
            <ESign />
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
