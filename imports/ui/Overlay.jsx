import React, { Component } from 'react';

export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.canvas = null;
	}

	componentWillUpdate(nextProps) {
		let ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.props.tweets.map((tweet) => {
			coord = tweet.coordinates.coordinates;
			pos = this.props.getProjetion(coord);
			ctx.fillStyle = 'yellow';
			ctx.beginPath();
			ctx.arc(pos[0], pos[1], 5, 0, 2*Math.PI);
			ctx.fill()
		});

	}

	render() {
		return(
			<canvas ref={(canvas) => {this.canvas = canvas}} width="600" height="600"/>
		);
	}
}