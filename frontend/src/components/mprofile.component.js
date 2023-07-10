import React, { Component } from "react";
import { Navigate, json } from "react-router-dom";
import AuthService from "../services/auth.service";
import Card from "./Card/Card.js";
import "../css/allstyles.css"
import CardHeader from "./Card/CardHeader.js";
import Table from "./Table/Table.js";
import CardIcon from "./Card/CardIcon.js";
import { makeStyles } from "@material-ui/core/styles";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";

import styles from "d:/Projects/visaGo/frontend/src/components/Card/assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const Offers = function(props)  {
  const classes = useStyles();
  console.log(props.rewards);
  return (
  <Card>
  <CardHeader color="rose">
    <h4 className={classes.cardTitleWhite}>Merchant Offers Offered</h4>
    <p className={classes.cardCategoryWhite}>
      *would be expired after the end date
    </p>
  </CardHeader>
  <CardBody>
    <Table
      tableHeaderColor="primary"
      tableHead={["ID", "Title", "Category", "Description", "End Date"]}
      tableData={props.rewards.rew.map((offer)=>[offer.id, 
                                                offer.title, 
                                                offer.category, 
                                                offer.descr, 
                                                offer.enddate])}
    />
  </CardBody>
</Card>
);
}

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
        <hr/>
        <br/>
        <Offers rewards = {currentUser}/>
        

      </div>: null}
      </div>
    );
  }
}


