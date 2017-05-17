import React, { Component } from 'react';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }

  componentWillReceiveProps() {
    this.renderMap();
  }

  renderMap() {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.setState({points: []});
    let tweets = this.props.tweets.sort((a, b) => b.retweet_count-a.retweet_count);
    let size = tweets.length;
    tweets.map((tweet, i) => {
      coord = tweet.coordinates.coordinates;
      pos = this.props.getProjection()(coord);
      ctx.fillStyle = 'green';
      ctx.beginPath();
      side = 5*(50*((size-i)/size)+50)/100;
      ctx.rect(pos[0], pos[1], side, side);
      this.toolTip(this.canvas, {x: pos[0], y: pos[1], w: side, h: side}, tweet.user.screen_name + ": " + tweet.text, 3000);
      ctx.fill()
    });
  }

  //Based on http://stackoverflow.com/questions/29489468/popup-tooltip-for-rectangular-region-drawn-in-canvas
  toolTip(canvas, region, text, timeout) {

      let me = this,                                // self-reference for event handlers
          div = document.createElement("div"),      // the tool-tip div
          parent = canvas.parentNode,               // parent node for canvas
          visible = false;                          // current status

      // set some initial styles, can be replaced by class-name etc.
      div.style.cssText = "position:fixed;padding:7px;background:yellow;pointer-events:none;width:150px;word-wrap:break-word";
      div.innerHTML = text;
      
      // show the tool-tip
      this.show = (pos) => {
        console.log(text);
        if (!visible) {                             // ignore if already shown (or reset time)
          visible = true;                           // lock so it's only shown once
          setDivPos(pos);                           // set position
          parent.appendChild(div);                  // add to parent of canvas
          setTimeout(hide, timeout);                // timeout for hide
        }
      }
      
      // hide the tool-tip
      let hide = () => {
        visible = false;                            // hide it after timeout
        parent.removeChild(div);                    // remove from DOM
      }

      // check mouse position
      let check = (e) => {
        let pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
            if (!visible &&
              pos.x >= region.x && pos.x < region.x + region.w &&
              pos.y >= region.y && pos.y < region.y + region.h) {
          me.show(posAbs);                          // show tool-tip at this pos
      }
        else setDivPos(posAbs);                     // otherwise, update position
      }
      
      // get mouse position relative to canvas
      let getPos = (e) => {
        let r = canvas.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
      }
      
      // update and adjust div position if needed (anchor to a different corner etc.)
      let setDivPos = (pos) => {
        if (visible){
          if (pos.x < 0) pos.x = 0;
          if (pos.y < 0) pos.y = 0;
          // other bound checks here
          div.style.left = pos.x + "px";
          div.style.top = pos.y + "px";
        }
      }
      
      // we need to use shared event handlers:
      canvas.addEventListener("mousemove", check);
      canvas.addEventListener("click", check);
      
    }

    render() {
      return(
        <canvas ref={(canvas) => {this.canvas = canvas}} width="600" height="600"></canvas>
      );
    }
  }