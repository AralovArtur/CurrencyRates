import "antd/dist/antd.css";
import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Register from "./components/Register";
import CurrencyRates from "./components/CurrencyRates";
import axios from "axios";
import {
  ACCESS_TOKEN,
  API_BASE_URL,
  CURRENT_USER,
  IS_AUTHENTICATED,
} from "./constant/index";
import History from "./components/History";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: localStorage.getItem(CURRENT_USER) || null,
      isAuthenticated: localStorage.getItem(IS_AUTHENTICATED),
    };
  }

  handleLogout = () => {
    localStorage.setItem(CURRENT_USER, null);
    localStorage.setItem(IS_AUTHENTICATED, "false");
    this.setState({ currentUser: null, isAuthenticated: "false" });
  };

  handleLogin = (credentials) => {
    axios
      .post(API_BASE_URL + "/auth/login", credentials)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        this.getCurrentUser()
          .then((response) => {
            console.log(response);
            this.setState({
              currentUser: response.data,
              isAuthenticated: "true",
            });
            localStorage.setItem(IS_AUTHENTICATED, "true");
            localStorage.setItem(CURRENT_USER, response.data);
            console.log(this.props);
            this.props.history.push("/currencies");
          })
          .catch((error) => {
            console.log(error);
            alert("Something went wrong, please try again!");
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401)
          alert("Your Username or Password is incorrect. Please try again!");
        else alert("Something went wrong, please try again!");
      });
  };

  getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }

    return axios.get(API_BASE_URL + "/user/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    });
  }

  render() {
    console.log("state", this.state);

    return (
      <>
        <Menu
          isAuthenticated={this.state.isAuthenticated}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route
            path="/login"
            render={() => <Login handleLogin={this.handleLogin} />}
          />
          <Route path="/currencies" exact component={CurrencyRates} />
          <Route path="/history" exact component={History} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
