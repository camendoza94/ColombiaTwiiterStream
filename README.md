# ColombiaTwitterStream

A simple app that shows in the map of Colombia the geolocalization of tweets according to the search made. **Creative addition: It shows a tooltip with the screen name and tweet text related to the point hovered or clicked, and changes the size of the point according to the number of retweets**. Final exam for web dev course. 

It requires you to setup your credentials on the server using environment variables:

```
export TWITTER_CONSUMER_KEY="yourCredentialsHere"
export TWITTER_CONSUMER_SECRET="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_KEY="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_SECRET="yourCredentialsHere"

meteor npm install
meteor
```
