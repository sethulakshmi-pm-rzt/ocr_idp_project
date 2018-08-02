/**
 * KeyValues
 * @author Akshay
 */
import React, { Component } from 'react';
import './KeyValues.css';

export default class KeyValues extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		const { listItems } = this.props;
		return (
			<div className="keyValuesContainer">
				{listItems.length > 0 &&
					listItems.map((item, index) => (
						<span key={index} className="keyValuesList">
							{index + 1}. {item.value}
						</span>
					))}
			</div>
		);
	}
}
