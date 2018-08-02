import Popup from 'reactjs-popup';
import React from 'react';
import './Popup.css';

class PopUp extends React.Component {
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
          <div>
            <h1>Heading</h1>
            <p className={"popupData"}>{data}</p>
          </div>
        </div>
      </Popup>
    )
  }
}

export default PopUp;