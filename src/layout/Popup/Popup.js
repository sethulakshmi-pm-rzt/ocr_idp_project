/**
 * Popup Layout
 * @author Sethulakshmi
 */

import React, { Component } from 'react';
import './Popup.css';
import { PopUp } from './../../components';

const data = 'jnfkjnfk nkb k nkj nk j klm lk ml kmkj bjh bj h jkj nkj bk uj kn kjn n jn kj nk nk n kj b kjn kj jhb j kn jkjnkjhfhkdfhih niub i n jio n kjn jbjbjhbjhb hjbjhb huhu hbjhbjhb jhbj hbjhbjhbjhb jh i oii mlk nkjnkh g ct x retx dtryt gyu yjbhnk jqwertyui fghjk vb nm  fghj k ty ui o fghjkl ertyuio ';

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
