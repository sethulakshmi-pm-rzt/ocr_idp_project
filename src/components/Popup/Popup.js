/**
 * PopupComponent
 * Takes popup content and displays the popup
 * @author Sethulakshmi
 */

import Popup from 'reactjs-popup';
import React from 'react';
import './Popup.css';

class PopUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeValue: '',
    };
  }

  toGetDetails = (index) => {
    this.setState({
      activeValue: index
    });
  };

  popupBody = (data, activeValue) => (
    <div className={"popupDataBody"}>
      <h2 className={"popupDataBodyHead"}>{data.heading}</h2>
      <div className={"popupContentWrapper"}>
        {data.popupData.map((item, index) =>
          <div
            key={index}
            className={"singleContent"}
            onClick={() => {this.toGetDetails(index)}}
          >
            <h4 className={"contentHeader"}>{item.dataHeading}</h4>

            <div className={`itemDataWrapperInactive ${(activeValue === index) ? 'itemDataWrapperActive' : ''}`}>
              <pre className={"contentData"}>{item.data}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  render() {

    const { open, closeModal, data } = this.props;

    return (
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div
          className="contentWrapper"
        >
          <a
            className="close"
            onClick={closeModal}
          >
            &times;
          </a>
          {this.popupBody(data, this.state.activeValue)}
        </div>
      </Popup>
    )
  }
}

export default PopUp;