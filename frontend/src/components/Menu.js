import { Component } from "react";
import { Menu } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("props", this.props);

    return (
      <Menu mode="horizontal">
        {this.props.isAuthenticated === "false" ? (
          <>
            <Menu.Item
              style={{ marginLeft: "auto", float: "right" }}
              key="login"
              icon={<LoginOutlined />}
            >
              <Link to={"login"}>Login</Link>
            </Menu.Item>
            <Menu.Item
              style={{ float: "right" }}
              key="register"
              icon={<UserAddOutlined />}
            >
              <Link to={"register"}>Register</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="currency_rates">
              <Link to={"currencies"}>Currency rates</Link>
            </Menu.Item>
            <Menu.Item key="history">
              <Link to={"history"}>History</Link>
            </Menu.Item>
            <Menu.Item
              style={{ marginLeft: "auto", float: "right" }}
              key="logout"
              icon={<LogoutOutlined />}
            >
              <Link to={"login"} onClick={this.props.handleLogout}>
                Logout
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    );
  }
}

export default NavBar;
