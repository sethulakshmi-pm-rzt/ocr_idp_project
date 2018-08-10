/**
 * RegionComponent
 * Takes in an image, returns all the selected areas as a key value pair
 * @author Akshay, Sethulakshmi
 */

import React, { Component } from 'react';
import ReactRegionSelect from 'react-region-select';
import { instruction } from '../../Utils';
import downArrow from './../../images/001-down-arrow.svg';
import edit from './../../images/003-marker.svg';
import deleteIcon from './../../images/004-delete.svg';
import './ImagePatcher.css';

// import * as d3 from 'd3';

class LabelRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownData: props.defaultDropdown,
    };
  }

  render() {
    const { onFormSubmit, regionProps, defaultDropdown } = this.props;

    let placeholderData = '';

    if (this.state.dropDownData === 'keyValue') {
      placeholderData = 'Values';
    } else if (this.state.dropDownData === 'data') {
      placeholderData = 'Line count';
    }
    else {
      placeholderData = 'Header Data';
    }
    const showForm = this.state.dropDownData !== 'constant' && defaultDropdown !== 'constant';
    return (
      <div className={'regionWrapper'}>
        <select
          required
          defaultValue={defaultDropdown}
          onChange={(e) => {
            this.setState({
              dropDownData: e.target.value,
            });
          }}
        >
          <option value="keyValue">Key pair</option>
          <option value="constant">constant</option>
          <option value="headers">headers</option>
          <option value="data">data</option>
        </select>

        <div
          className={'regionForm'}
        >
          {showForm &&
          <input
            type={this.state.dropDownData !== 'data' ? 'text' : 'number'}
            placeholder={placeholderData}
            ref={node => (this.input = node)}
          />}

          <button
            className="okayButton"
            onClick={(event) => {
              event.preventDefault();
              showForm
                ? onFormSubmit(event, regionProps.index, this.state.dropDownData, this.input.value)
                : onFormSubmit(event, regionProps.index, this.state.dropDownData);

            }}
          >
            OK
          </button>
        </div>

      </div>
    );
  }
}

class RegionComponent extends Component {
  onFormSubmit = (event, regionPropsIndex, category, value = null) => {
    event.preventDefault();
    this.changeRegionData(
      regionPropsIndex,
      value,
      category,
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

  toPreviousImg = () => {
    this.props.handleFileChange(this.props.fileToShow.fileNumber - 1);
  };

  toNextImg = () => {
      this.props.handleFileChange(this.props.fileToShow.fileNumber + 1);
  };

  /**
   * Save the final regions
   * @param regions
   */
  handleChange = (regions) => {
    this.setState({
      regions: regions,
    });
  };

  /**
   * Show the input field for the selected area
   * @param regionProps
   */
  regionRenderer = (regionProps) => {


    if (!regionProps.isChanging) {
      let defaultValue = this.state.regions.length === 1 ? 'constant' : 'keyValue';
      return (
        <div className="region">
          {(this.state.editMode && this.state.editIndex === regionProps.index)
            ?
            <div>
              <LabelRegion
                onFormSubmit={this.onFormSubmit}
                regionProps={regionProps}
                defaultDropdown={defaultValue}
              />
            </div>
            :
            <div className={'rectDetail'}>
              <span className={'id'}>{regionProps.index + 1}. </span>

              <span className={'values'}>
                {this.state.regions[regionProps.index].data.value === null ? 'Constant' : this.state.regions[regionProps.index].data.value}
              </span>

              <span
                className={'editIcon'}
                onClick={(e) => {this.onEdit(e, regionProps.index);}}
              >
                <img
                  src={edit}
                  className={'editIconStyle'}
                />
              </span>

              <span
                className={'deleteIcon'}
                onClick={(e) => {this.onDelete(e, regionProps.index);}}
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
  };
  /**
   * Get the value of corresponding selected area
   * @param index
   * @param value
   */
  changeRegionData = (index, value, category) => {
    const region = this.state.regions[index];
    region['type'] = category;
    region.data['value'] = value;

    this.calculateCoordinates([
      ...this.state.regions.slice(0, index),
      {
        ...region,
        data: region.data,
      },
      ...this.state.regions.slice(index + 1),
    ]);
  };
  /**
   * Undo the last selected area
   */
  handleUndo = () => {
    let regions = this.state.regions;
    if (regions.length > 0) {
      regions.pop();
    }
    this.calculateCoordinates(regions);
  };
  /**
   * Calculate the coordinates of all the selected areas
   * Also send the regions with values
   */
  calculateCoordinates = (regions = this.state.regions) => {
    let crArray = regions.filter((region) => region.type === 'constant');
    let cr = crArray[crArray.length - 1];
    let line_count = 0;
    // let cr = regions.find(region => region.type === 'constant');

    let constantRegion = {};
    if (cr) constantRegion = {
      xmin: cr.x,
      xmax: cr.width + cr.x,
      ymin: cr.y,
      ymax: cr.height + cr.y,
    };
    let drArray = regions.filter((region) => region.type === 'data');
    let dr = drArray[drArray.length - 1];
    // let dr = regions.find(region => region.type === 'data');
    let dataRegion = {};
    if (dr) {
      line_count = dr.data.value;
      dataRegion = {
        xmin: dr.x,
        xmax: dr.width + dr.x,
        ymin: dr.y,
        ymax: dr.height + dr.y,
      };
    }

    let hr = regions.filter(region => region.type === 'headers');
    let headerRegion = {};
    hr.map(region => {
      headerRegion = {
        ...headerRegion,
        [region.data.value]: {
          xmin: region.x,
          xmax: region.width + region.x,
          ymin: region.y,
          ymax: region.height + region.y,
        },
      };
    });

    let or = regions.filter(region => region.type === 'keyValue');
    let valuesRegion = {};
    or.map(region => {
      valuesRegion = {
        ...valuesRegion,
        [region.data.value]: {
          xmin: region.x,
          xmax: region.width + region.x,
          ymin: region.y,
          ymax: region.height + region.y,
        },
      };
    });
    let regionCoordinates = {
      constant: constantRegion,
      headers: headerRegion,
      value: valuesRegion,
      data: dataRegion,
      ['line count']: line_count,
    };

    this.props.updateRegions(regionCoordinates, regions, this.props.fileToShow);
    this.setState({
      regions,
      regionCoordinates,
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      regions: this.props.currentFileRegions,
      regionCoordinates: [],
      editMode: true,
      editIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentFileRegions !== nextProps.currentFileRegions) {
      this.setState({
        regions: nextProps.currentFileRegions,
        regionCoordinates: [],
        editMode: true,
        editIndex: nextProps.currentFileRegions.length
      });
    }
  }

  // imageZooming = () => {
  //
  //   function zoomed() {
  //     context.translate(d3.event.transform.x, d3.event.transform.y);
  //     context.scale(d3.event.transform.k, d3.event.transform.k);
  //   }
  //
  //   let canvas = d3.select(this.imgRef);
  //   let context = canvas.node().getContext("2d");
  //
  //   var zoom = d3.zoom()
  //     .on("zoom", zoomed);
  // };

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
                onClick={() => {this.props.handleSingleUpload(this.state.regionCoordinates, this.props.fileToShow.relativePath);}}
                className="savePageButton"
              >
                Save this Page
              </button>

              <div>
                <img
                  className={'previousButton'}
                  alt={'previousArrow'}
                  src={downArrow}
                  onClick={() => {
                    this.toPreviousImg();
                  }}
                />
                <img
                  className={'nextButton'}
                  alt={'nextButton'}
                  src={downArrow}
                  onClick={() => {
                    this.toNextImg();
                  }}
                />
                {/*<img*/}
                {/*src={downArrow}*/}
                {/*alt={'zoom'}*/}
                {/*onClick={() => {this.imageZooming()}}*/}
                {/*/>*/}
              </div>
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
                alt="image"
                ref={node => {
                  this.imgRef = node;
                }}
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
