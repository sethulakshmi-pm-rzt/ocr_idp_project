/**
 * Popup Layout
 * @author Sethulakshmi
 */

import React, { Component } from 'react';
import './Popup.css';
import { PopUp } from './../../components';

const dummy = {
  "constant": {
    "xmin": "465",
    "ymin": "62",
    "xmax": "804",
    "ymax": "108"
  },
  "value": {
    "address": {
      "xmin": "35",
      "ymin": "89",
      "xmax": "459",
      "ymax": "199"
    },
    "date": {
      "xmin": "196",
      "ymin": "260",
      "xmax": "352",
      "ymax": "295"
    },
    "vendor": {
      "xmin": "194",
      "ymin": "297",
      "xmax": "467",
      "ymax": "321"
    },
    "check": {
      "xmin": "196",
      "ymin": "345",
      "xmax": "359",
      "ymax": "371"
    },
    "amount": {
      "xmin": "196",
      "ymin": "367",
      "xmax": "363",
      "ymax": "406"
    }
  },
  "headers": {
    "pro": {
      "xmin": "363",
      "ymin": "432",
      "xmax": "483",
      "ymax": "480"
    },
    "amount": {
      "xmin": "507",
      "ymin": "436",
      "xmax": "704",
      "ymax": "486"
    },
    "reference": {
      "xmin": "709",
      "ymin": "441",
      "xmax": "946",
      "ymax": "484"
    }
  },
  "data": {
    "xmin": "352",
    "ymin": "484",
    "xmax": "967",
    "ymax": "608"
  },
  "line count": "1"
};


const data = {
  heading: 'PopUpNewHeading',
  popupData: [
    {
      dataHeading: 'DataHeading1',
      data: JSON.stringify(dummy, null, '\t'),
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },{
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading1',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    },
    {
      dataHeading: 'DataHeading2',
      data: '-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data-----data'
    }
  ]
};

class PopupComp extends Component {

  openModal = () => {
    this.setState({
      open: true
    });
  };

  closeModal = () => {
    this.setState({
      open: false
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div className={"popupCompWrapper"}>
        <button
          className="popupButton"
          onClick={this.openModal}
        >
          Click here for Popup
        </button>

        <PopUp
          open = {this.state.open}
          closeModal = {this.closeModal}
          data={data}
          {...this.props}
        />

      </div>
    );
  }
}

export default PopupComp;
