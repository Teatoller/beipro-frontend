import React from "react";
import "../css/styles.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

class Dropdown extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    const { displayMenu } = this.state;

    return (
      <div className="dropdown" style={{ width: "200px" }}>
        <div className="button" onClick={this.showDropdownMenu}>
          {" "}
          My Menu
          {" "}
        </div>

        {displayMenu ? (
          <ul>
            <li>
              <NavLink className="active" to="/depots">
                Depot Prices
              </NavLink>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <NavLink to="/">Log Out</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
