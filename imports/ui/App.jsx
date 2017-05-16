import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";
import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projection: null
    };
  }

  setProjection(proj) {
    this.setState({ projection: proj });
  }

  getProjection() {
    return this.state.projection;
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }
  render() {
    return (
      <div>
        <h2 className="col-lg-12">Colombia in tweets:</h2>
        {this.props && this.props.tweets ?     
          <div>
              <div className="col-lg-6 col-sm-12">
                <Overlay tweets={this.props.tweets} getProjection={this.getProjection.bind(this)} />
                <ColombiaMap width="600" height="600" data={{RISARALDA:10, CALDAS:12}} setProjection={this.setProjection.bind(this)} />
              </div>
              <div className="col-lg-6 col-sm-12">
                <input type="text" onKeyPress={event => this.changeQuery(event)} placeholder="Enter your search here"/>
                { this.props && this.props.err ?
                  <div>Error: {this.props.err}</div> :
                  <span></span>
                }              
                <TweetsResults tweets={this.props.tweets} />
              </div>
          </div> :
          <p>Enter a query</p>
        }
      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");

  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);