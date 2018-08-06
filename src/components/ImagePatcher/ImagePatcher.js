/**
 * RegionComponent
 * Takes in an image, returns all the selected areas as a key value pair
 * @author Akshay, sethulakshmi
 */

import React, { Component } from 'react';
import ReactRegionSelect from 'react-region-select';
import { instruction } from '../../Utils';
import edit from './../../images/003-marker.svg';
import deleteIcon from './../../images/004-delete.svg';
import './ImagePatcher.css';

class RegionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regions: this.props.currentFileRegions,
      regionCoordinates: [],
      editMode: true,
      editIndex: 0,
    };

    this.regionRenderer = this.regionRenderer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.calculateCoordinates = this.calculateCoordinates.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentFileRegions !== nextProps.currentFileRegions) {
      this.setState({
        regions: nextProps.currentFileRegions,
        regionCoordinates: [],
      });
    }
  }

  /**
   * Save the final regions
   * @param regions
   */
  handleChange(regions) {
    this.setState({
      regions: regions,
    });
  }

  /**
   * Get the value of corresponding selected area
   * @param index
   * @param value
   */
  changeRegionData(index, value) {
    const region = this.state.regions[index];
    region.data.value = value;
    this.calculateCoordinates([
      ...this.state.regions.slice(0, index),
      {
        ...region,
        data: region.data,
      },
      ...this.state.regions.slice(index + 1),
    ]);
  }

  onFormSubmit = (event, regionPropsIndex) => {
    event.preventDefault();
    this.changeRegionData(
      regionPropsIndex,
      this.input.value,
    );
    this.setState({
      editMode: true,
      editIndex: regionPropsIndex + 1,
    });
  };

  onEdit = (e, regionPropsIndex) => {
    e.stopPropagation();
    this.setState({
      editMode: true,
      editIndex: regionPropsIndex,
    });
  };

  onDelete = (e, regionPropsIndex) => {
    e.stopPropagation();
    let updatedRegion = this.state.regions;
    updatedRegion.splice(regionPropsIndex, 1);
    this.calculateCoordinates(updatedRegion);
    this.setState({
      regions: updatedRegion,
    });
  };

  /**
   * Show the input field for the selected area
   * @param regionProps
   */
  regionRenderer(regionProps) {

    if (!regionProps.isChanging) {
      if (this.state.regions.length - 1 === regionProps.index) {
        return (
          <div className="region">
            {(this.state.editMode && this.state.editIndex === regionProps.index)
              ?
              <form
                className={'regionForm'}
                onSubmit={event => this.onFormSubmit(event, regionProps.index)}
              >
                <input
                  type="text"
                  ref={node => (this.input = node)}
                />

                <button
                  type="submit"
                  className="okayButton"
                >
                  OK
                </button>
              </form>
              : <div className={'rectDetail'}>
                <span className={'id'}>{regionProps.index + 1}. </span>
                {this.state.regions[regionProps.index].data.value &&
                <span className={'values'}>{this.state.regions[regionProps.index].data.value}</span>}
                <span
                  className={'editIcon'}
                  onClick={(e) => {this.onEdit(e, regionProps.index)}}
                >
                  <img
                    src={edit}
                    className={'editIconStyle'}
                  />
                  </span>

                <span
                  className={'deleteIcon'}
                  onClick={(e) => {this.onDelete(e, regionProps.index)}}
                >
                  <img
                    src={deleteIcon}
                    className={'deleteIconStyle'}
                  />
                </span>

              </div>
            }
          </div>
        );
      } else {
        return (
          <div className={'region'}>
            {(this.state.editMode && this.state.editIndex === regionProps.index)
              ?
              <form
                className={'regionForm'}
                onSubmit={event => this.onFormSubmit(event, regionProps.index)}
              >
                <input
                  type="text"
                  ref={node => (this.input = node)}
                />

                <button
                  type="submit"
                  className="okayButton"
                >
                  OK
                </button>
              </form>
              :
              <div className={'rectDetail'}>
                <span className={'id'}>{regionProps.index + 1}. </span>
                {this.state.regions[regionProps.index].data.value &&
                <span className={'values'}>{this.state.regions[regionProps.index].data.value}</span>}
                <span
                  className={'editIcon'}
                  onClick={(e) => {this.onEdit(e, regionProps.index)}}
                >
                  <img
                    src={edit}
                    className={'editIconStyle'}
                  />
                </span>
                <span
                  className={'deleteIcon'}
                  onClick={(e) => {this.onDelete(e, regionProps.index)}}
                >
                  <img
                    src={deleteIcon}
                    className={'deleteIconStyle'}
                  />
                </span>
              </div>

            }
          </div>

        );
      }
    }
  }

  /**
   * Undo the last selected area
   */
  handleUndo() {
    let regions = this.state.regions;
    if (regions.length > 0) {
      regions.pop();
    }
    this.calculateCoordinates(regions);
  }

  /**
   * Calculate the coordinates of all the selected areas
   * Also send the regions with values
   */
  calculateCoordinates(regions) {
    let regionCoordinates = [];
    regionCoordinates = regions.map(region => {
      let x1 = region.x;
      let y1 = region.y;
      let x2 = region.width + region.x;
      let y2 = region.height + region.y;
      return {
        x1,
        y1,
        x2,
        y2,
        value: region.data.value,
      };
    });
    this.props.updateRegions(
      regions,
      regionCoordinates,
      this.props.fileToShow.fileNumber,
    );
    this.setState({
      regions,
      regionCoordinates,
    });
  }

  toSaveEachImg = (e) => {
    e.stopPropagation()
    console.log("SAVE - EACH - IMG")
  };

  // handleSubmit() {
  // 	this.props.handleIndividualSubmit();
  // 	this.setState({
  // 		regions: [],
  // 		regionCoordinates: []
  // 	});
  // }

  render() {
    const { fileToShow } = this.props;
    if (fileToShow) {
      return (
        <React.Fragment>
          <span className={'imageHeader'}>{instruction}</span>
          <div className="imagePatcherWrapper">
            <div className="buttonWrapper">
              <button
                onClick={this.handleUndo}
                className="undoLastButton"
              >
                Undo Last
              </button>

              <button
                onClick={(e) => {this.toSaveEachImg(e)}}
                className="savePageButton"
              >
                Save this Page
              </button>

              <div>
                <button className={"previousButton"}>
                  previous
                </button>
                <button className={"nextButton"}>
                  next
                </button>
              </div>

              {/* <button
               onClick={this.handleSubmit}
               className="buttonStyle"
               >
               Submit
               </button> */}
            </div>
            <ReactRegionSelect
              regions={this.state.regions}
              onChange={this.handleChange}
              regionRenderer={this.regionRenderer}
              className="imgWrapper"
            >
              <img
                src={fileToShow.file.preview}
                width={500}
                className="image"
                alt=""
              />
            </ReactRegionSelect>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <h5 className={'imageHeader'} style={{ textAlign: 'center' }}>
          Upload Files to begin
        </h5>
      );
    }
  }
}

export default RegionComponent;