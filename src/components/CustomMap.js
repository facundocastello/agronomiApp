import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

class CustomMap extends Component {
  state = {
    center: { lat: -30.679562, lng: -61.234794 },
    draggable: true,
    drawingManager: undefined,
    polygons: [],
    zoom: 15
  };

  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (prevProps.displayIndex !== newProps.displayIndex) {
      const polygons = [];
      
      newProps.locations.map(location => {
        var polygon = new this.state.google.maps.Polygon({
          draggable: true,
          editable: true,
          paths: location,
          strokeColor: '#FFFF00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FFFF00',
          fillOpacity: 0.35
        });
        polygons.push(polygon);
        polygon.setMap(this.state.google.map);
      });
      newProps.initPolygons(polygons);
    }
  }

  dragChild = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      addLat: mouse.lat,
      addLng: mouse.lng,
      google: undefined
    });
  };
  handleGoogleMapApi = google => {
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon']
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        fillColor: '#ff0000',
        strokeColor: '#ff0000',
        strokeWeight: 2
      }
    });

    this.setState({
      google: google,
      drawingManager: drawingManager
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', polygon =>
      this.props.addPolygon(polygon)
    );
    drawingManager.setMap(google.map);
  };

  stopDrag = () => {
    this.setState({
      draggable: true
    });
  };

  render() {
    const { center, draggable, zoom } = this.state;
    const { displayMap } = this.props;

    // Construct the polygon.
    // var BermudaTriangle = new google.maps.Polygon();
    return (
      <div
        className={classnames(
          'w-100 flex-column align-items-center',
          displayMap ? 'd-flex' : 'd-none'
        )}
        style={{ height: '600px' }}
      >
        <GoogleMapReact
          options={function(maps) {
            return { mapTypeId: 'satellite' };
          }}
          // draggable={draggable}
          center={{
            lat: center.lat,
            lng: center.lng
          }}
          // defaultCenter={{
          //   lat: center.lat,
          //   lng: center.lng
          // }}
          // onChildMouseDown={this.dragChild}
          // onChildMouseUp={this.stopDrag}
          // onChildMouseMove={this.dragChild}
          // className="CropMap"
          zoom={zoom}
          bootstrapURLKeys={{ libraries: 'drawing' }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleGoogleMapApi}
        />
      </div>
    );
  }
}

const AnyReactComponent = ({ text }) => (
  <div className='bg-black text-white'> {text} </div>
);

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMap);
