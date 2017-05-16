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
    this.projection = null;
  }

  setProjection(proj) {
    this.projection = proj;
  }

  getProjection() {
    return this.projection;
  }

  changeQuery(query) {
    console.log(query);
    Meteor.call("twitter.stream", query);
  }

  render() {
    return (
      <div>
      {this.changeQuery("Colombia")}
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Colombia in tweets:</h2>
        {this.props && this.props.tweets ?     
          <div>
              <ColombiaMap width="600" height="600" data={{RISARALDA:10, CALDAS:12}} setProjection={() => this.setProjection} />
              <Overlay tweets={this.props.tweets} getProjection={() => this.getProjection} />
              <TweetsResults tweets={this.props.tweets} />
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