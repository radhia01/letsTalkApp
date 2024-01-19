import "./App.css";
import Login from "./components/Login";
import { Switch, Route } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import UserProfile from "./components/UserProfile";
import Singin from "./components/SingIn";
import EditPicture from "./components/EditPicture";
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={ListUsers} />
        <Route exact path="/profile" component={UserProfile} />
        <Route path="/editpic" component={EditPicture} />
        <Route exact path="/register" component={Singin} />
      </Switch>
    </div>
  );
}

export default App;
