import React, { Component } from 'react';

export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.canvas = null;
	}

	componentWillUpdate() {
		let ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.props.tweets.map((tweet) => {
			coord = tweet.coordinates.coordinates;
			console.log(coord);
			pos = this.props.getProjection()(coord);
			ctx.fillStyle = 'green';
			ctx.beginPath();
			ctx.arc(pos[0], pos[1], 3, 0, 2*Math.PI);
			ctx.fill()
		});

	}

	render() {
		return(
			<canvas ref={(canvas) => {this.canvas = canvas}} width="600" height="600"></canvas>
		);
	}
}