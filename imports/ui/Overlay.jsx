import React, { Component } from 'react';

export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.canvas = null;
	}

	componentWillUpdate(nextProps) {
		
	}

	render() {
		return(
			<canvas ref = {(canvas) => {this.canvas = canvas}} />
		)
	}
}