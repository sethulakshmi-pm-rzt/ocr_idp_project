/**
 * PopupComponent
 * Takes popup content and displays the popup
 * @author Sethulakshmi
 */

import Popup from 'reactjs-popup';
import React from 'react';
import './Popup.css';
import downIcon from './../../images/001-down-arrow.svg'

class PopUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeValue: '',
      expanded: false,
    };
  }

  toGetDetails = (index, expanded) => {
    this.setState({
      activeValue: index,
      expanded: !expanded,
    });
  };

  popupBody = (data, activeValue, expanded) => (
    <div className={"popupDataBody"}>
      <h2 className={"popupDataBodyHead"}>
        {data.heading}
      </h2>

      <div className={"popupContentWrapper"}>
        {data.popupData.map((item, index) =>
          <div
            key={index}
            className={"singleContent"}
            onClick={() => {this.toGetDetails(index, expanded)}}
          >
            <div className={"contentHeaderWrapper"}>
              <h4 className={"contentHeader"}>
                {item.dataHeading}
              </h4>

              <img
                className={`downIcon ${((activeValue === index) && expanded) ? 'upIcon' : ''}`}
                src={downIcon}
                alt={downIcon}
              />

            </div>

            <div
              className={`itemDataWrapperInactive ${((activeValue === index) && expanded) ? 'itemDataWrapperActive' : ''}`}
            >
              <pre
                className={"contentData"}
              >
                {JSON.stringify(item.data, null, '\t')}
              </pre>
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
          {this.popupBody(data, this.state.activeValue, this.state.expanded)}
        </div>
      </Popup>
    )
  }
}

export default PopUp;