import React, {Component} from "react";


import Tweet from "./Tweet.jsx";

export default class TweetResults extends Component {
  renderTweets() {
    return this.props.tweets.slice(0, 10).map((tweet) => {
      return (<Tweet key={tweet.id} tweet={tweet}/>);
    });
  }

  render() {
    return (
      <div className="tweetResults">
        {this.renderTweets()}
      </div>
    );
  }
}