/**
 * Upload Layout
 * @author Sethulakshmi, Akshay
 */
import React, { Component } from 'react';
import Upload from '../../container/Upload/Upload';
import './Upload.css';
import PopupComp from '../Popup/Popup';

class UploadLayout extends Component {
	render() {
		return (
			<div className={'fileUploadWrapper'}>
				<Upload {...this.props} />
        <PopupComp />
			</div>
		);
	}
}

export default UploadLayout;
