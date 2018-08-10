/**
 * App
 * @author Akshay
 */

import React, { Component } from 'react';
import Header from './layout/Header/Header';
import Upload from './layout/Upload/Upload';
import Selection from './layout/Selection/Selection';
import { commonAction } from './common/actions';
import Data from './layout/Data/Data';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fileObjects: [],
			fileToShow: null,
			currentFile: null,
			currentFileDetail: [],
			currentFileRegions: [],
      proceedData: [],
		};

		this.handleFilesUpload = this.handleFilesUpload.bind(this);
		this.updateRegions = this.updateRegions.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
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
      regions: [],
      relativePath: '',
    }));

    let formData = new FormData();

    for (let i =0; i < uploadedFiles.length; i++) {
      formData.append('files', uploadedFiles[i]);
    }
    this.props.commonAction('UPLOAD', 'FILE', 'post', 'file/uploadFile', formData, null, (response) => {
      if(response.data.entity.labelled === true) {
        let newProceedData = response.data.entity.listFiles.map((item) => (
          {
            relativePath: item.relativePath,
            fileName: item.fileName
          }
        ));
        this.props.commonAction('PROCEED', 'DETAILS', 'post', 'file/getData', newProceedData);
      } else {
        let newFileObjects = response.data.entity.listFiles.map((file, index) => (
          {
            ...fileObjects[index],
            fileName: file.name,
            fileNumber: index,
            relativePath: file.relativePath,
          }
        ));
        this.setState({
          fileObjects: newFileObjects,
          fileToShow: newFileObjects[0],
          currentFile: 0,
          currentFileDetail: newFileObjects[0].details,
          currentFileRegions: newFileObjects[0].regions,
          proceedData: newFileObjects,
        })
      }
    });
    // this.setState({
    //   fileObjects: fileObjects,
    //   fileToShow: fileObjects[0],
    //   currentFile: 0,
    //   currentFileDetail: fileObjects[0].details,
    //   currentFileRegions: fileObjects[0].regions,
    //   proceedData: fileObjects,
    // })
  }

	/**
	 * update the regions for corresponding file
	 * @param regions
	 * @param details
	 * @param index
	 */
	updateRegions(coordinateDetails, regions, currentFile) {
	  let index = currentFile.fileNumber;
	  let updatedFileObject = this.state.fileObjects[index];
		updatedFileObject.details = coordinateDetails;
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
			currentFileDetail: coordinateDetails,
			currentFileRegions: regions
		});
	}

	handleSingleUpload = (coordinates, fileRelativePath) => {
    let data = {
      label: {
        ...coordinates,
      },
      path: fileRelativePath
    };
    this.props.commonAction('UPDATE', 'REGION', 'post', 'file/saveTemplate', data);
  };

	handleProceed = () => {

	  let newProceedData = this.state.proceedData.map((item) => (
      {
        relativePath: item.relativePath,
        filename: item.file.name
      }
    ));
    this.props.commonAction('PROCEED', 'DETAILS', 'post', 'file/getData', newProceedData);
  };

	/**
	 * change the current working file
	 * @param index
	 */
	handleFileChange(index) {
		let selectedFileObject = this.state.fileObjects[index];
		selectedFileObject && this.setState({
			fileToShow: selectedFileObject,
			currentFile: index,
			currentFileDetail: selectedFileObject.details,
			currentFileRegions: selectedFileObject.regions
		});
	}

	render() {
		const {
			fileToShow,
			fileObjects,
			currentFileDetail,
			currentFileRegions,
      currentFile
		} = this.state;
		return (
			<div className="homePageWrapper">
				<Header />
				<div className="AppContent">
					<Upload
            handleFilesUpload={this.handleFilesUpload}
          />
          <Selection
						fileToShow={fileToShow}
						updateRegions={this.updateRegions}
						currentFileRegions={currentFileRegions}
						handleFileChange={this.handleFileChange}
            fileObjects={fileObjects}
            handleSingleUpload={this.handleSingleUpload}
					/>
					<Data
						listItems={currentFileDetail}
						fileObjects={fileObjects}
            currentFileNumber={currentFile}
						handleFileChange={this.handleFileChange}
            handleProceed={this.handleProceed}
					/>
				</div>
			</div>
		);
	}
}

export default connect(null, { commonAction })(App);
