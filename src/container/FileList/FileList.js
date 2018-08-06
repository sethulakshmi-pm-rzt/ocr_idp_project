/**
 * FileList
 * @author Akshay, Sethulakshmi
 */
import React, { Component } from 'react';
import './FileList.css';

class FileList extends Component {
	constructor(props){
		super(props);
		this.state = {
			activeItem: 0,
		}
	}

	toFindActiveImg = (index) => {
    this.props.handleFileChange(index);
    this.setState({
      activeItem: index
    })
  };

	render() {
		const { fileList } = this.props;
		return (
			<React.Fragment>
				<div className="fileListContainer">
					{fileList.length > 0 &&
						fileList.map((file, index) => (
							<span
								className={`fileListItem ${this.state.activeItem === index ? 'activeItem' : ''}`}
								key={index}
								onClick={() => {this.toFindActiveImg(index)}}
							>
								{index + 1}. {file.name}
							</span>
						))}
				</div>
				{fileList.length > 0 && (
					<button
						className="buttonStyle"
						style={{ margin: '5px 0px 0px 0px', float: 'right' }}
					>
						Proceed
					</button>
				)}
			</React.Fragment>
		);
	}
}

export default FileList;
