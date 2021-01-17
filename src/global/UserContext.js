import React, { createContext } from "react";
import { db, auth } from "../config/Config";

export const UserContext = createContext();

export class UserContextProvider extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            console.log(snapshot.data().Name);
            this.setState({ user: snapshot.data().Name });
          });
      } else {
        this.setState({ user: null });
      }
    });
  }

  isAuthenticated = () => {
    if (this.state.user === null) {
      return false;
    }

    return true;
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: this.isAuthenticated(),
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
