import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class MProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
         <h5>Profile</h5>
         <hr/>
          <h1>
            <strong>{currentUser.username.toUpperCase()}</strong> 
          </h1>
    
        </header>
      
          {currentUser.roles &&
            currentUser.roles.map((role, index) => (<p><i>{role}</i></p>))}
        

        <h2>{currentUser.store_name}</h2>
        <h4>{currentUser.rating}/10</h4>

        <p><strong>"{currentUser.descp}"</strong></p>
        <hr/>
        
        <p><strong>Address:</strong> {currentUser.address}</p>
        <p><strong>Coordinates: </strong> ({currentUser.lat},{currentUser.lng})</p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        
        <p><strong>phone:</strong> {currentUser.phone}</p>
        

      </div>: null}
      </div>
    );
  }
}


