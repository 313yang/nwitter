import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
