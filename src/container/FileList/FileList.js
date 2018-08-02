/**
 * FileList
 * @author Akshay
 */
import React, { Component } from 'react';
import './FileList.css';

class FileList extends Component {
	render() {
		const { fileList } = this.props;
		return (
			<React.Fragment>
				<div className="fileListContainer">
					{fileList.length > 0 &&
						fileList.map((file, index) => (
							<span
								className="fileListItem"
								key={index}
								onClick={() =>
									this.props.handleFileChange(index)
								}
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
