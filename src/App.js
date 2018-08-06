/**
 * App
 * @author Akshay
 */
import React, { Component } from 'react';
import Header from './layout/Header/Header';
import Upload from './layout/Upload/Upload';
import Selection from './layout/Selection/Selection';
import Data from './layout/Data/Data';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fileObjects: [],
			fileToShow: null,
			currentFile: null,
			currentFileDetail: [],
			currentFileRegions: []
		};

		this.handleFilesUpload = this.handleFilesUpload.bind(this);
		this.updateRegions = this.updateRegions.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		// this.handleIndividualSubmit = this.handleIndividualSubmit.bind(this);
	}

	/**
	 * upload file or multiple files and create a file object
	 * @param uploadedFiles
	 */
	handleFilesUpload(uploadedFiles) {
		let fileObjects = uploadedFiles.map((file, index) => ({
			file,
			fileName: file.name,
			fileNumber: index,
			details: [],
			regions: []
		}));
		this.setState({
			fileObjects,
			fileToShow: fileObjects[0],
			currentFile: 0,
			currentFileDetail: fileObjects[0].details,
			currentFileRegions: fileObjects[0].regions
		});
	}

	/**
	 * update the regions for corresponding file
	 * @param regions
	 * @param details
	 * @param index
	 */
	updateRegions(regions, details, index) {
		let updatedFileObject = this.state.fileObjects[index];
		updatedFileObject.details = details;
		updatedFileObject.regions = regions;
		let fileObjects = [
			...this.state.fileObjects.slice(0, index),
			{
				...updatedFileObject
			},
			...this.state.fileObjects.slice(index + 1)
		];
		this.setState({
			fileObjects,
			currentFileDetail: details,
			currentFileRegions: regions
		});
	}

	/**
	 * change the current working file
	 * @param index
	 */
	handleFileChange(index) {
		let selectedFileObject = this.state.fileObjects[index];
		this.setState({
			fileToShow: selectedFileObject,
			currentFile: index,
			currentFileDetail: selectedFileObject.details,
			currentFileRegions: selectedFileObject.regions
		});
	}

	// handleIndividualSubmit() {
	// 	const { uploadedFiles, currentFile } = this.state;
	// 	if (
	// 		uploadedFiles.length > 1 &&
	// 		currentFile !== uploadedFiles.length - 1
	// 	) {
	// 		this.setState({
	// 			fileToShow: uploadedFiles[currentFile + 1],
	// 			currentFile: currentFile + 1
	// 		});
	// 	}
	// }

	render() {
		const {
			fileToShow,
			fileObjects,
			currentFileDetail,
			currentFileRegions
		} = this.state;

		return (
			<div className="homePageWrapper">
				<Header />
				<div className="AppContent">
					<Upload handleFilesUpload={this.handleFilesUpload} />
					<Selection
						fileToShow={fileToShow}
						updateRegions={this.updateRegions}
						// handleIndividualSubmit={this.handleIndividualSubmit}
						currentFileRegions={currentFileRegions}
						handleFileChange={this.handleFileChange}
            fileObjects={fileObjects}
					/>
					<Data
						listItems={currentFileDetail}
						fileObjects={fileObjects}
						handleFileChange={this.handleFileChange}
					/>
				</div>
			</div>
		);
	}
}

export default App;
