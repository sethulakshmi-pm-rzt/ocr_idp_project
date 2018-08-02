/**
 * Data Layout
 * @author Sethulakshmi, Akshay
 */
import React, { Component } from 'react';
import KeyValues from '../../container/KeyValues/KeyValues';
import FileList from '../../container/FileList/FileList';

class Data extends Component {
	render() {
		const { listItems, fileObjects, handleFileChange } = this.props;
		let uploadedFiles = fileObjects
			? fileObjects.map(object => object.file)
			: [];
		return (
			<div className={'dataWrapper'}>
				<h3>Values</h3>
				<KeyValues listItems={listItems} />
				<h3>Files</h3>
				<FileList
					fileList={uploadedFiles}
					handleFileChange={handleFileChange}
				/>
			</div>
		);
	}
}

export default Data;
