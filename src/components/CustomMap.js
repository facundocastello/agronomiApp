import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";

class CustomMap extends Component {
  state = {
    center: { lat: -30.679562, lng: -61.234794 },
    draggable: false,
    zoom: 15,
    addLat: -30.679562,
    addLng: -61.234794
  };

  dragChild = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      addLat: mouse.lat,
      addLng: mouse.lng
    });
  };
  stopDrag = () => {
    this.setState({
      draggable: true
    });
  };

  render() {
    const { addLat, addLng, center, draggable, zoom } = this.state;

    const onGoogleApiLoaded = (map, maps) => {
      var triangleCoords = [
        { lat: -30.679562, lng: -61.234794 },
        { lat: -30.673379, lng: -61.232906 },
        { lat: -30.673896, lng: -61.22973 },
        { lat: -30.6797, lng: -61.231605 }
      ];

      // Construct the polygon.
      var bermudaTriangle = new maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
      });
      bermudaTriangle.setMap(map);
    };

    // Construct the polygon.
    // var BermudaTriangle = new google.maps.Polygon();
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column bg-silver-light w-90 p-2 p-md-5">
          <div
            className="d-flex flex-column align-items-center"
            className="position-relative"
            style={{ width: "600px", height: "600px" }}
          >
            <GoogleMapReact
              options={function(maps) {
                return { mapTypeId: "satellite" };
              }}
              draggable={draggable}
              center={{
                lat: center.lat,
                lng: center.lng
              }}
              defaultCenter={{
                lat: center.lat,
                lng: center.lng
              }}
              onChildMouseDown={this.dragChild}
              onChildMouseUp={this.stopDrag}
              onChildMouseMove={this.dragChild}
              className="CropMap"
              zoom={zoom}
              // bootstrapURLKeys={{
              //     key: 'AIzaSyAQ7CcNri5Ge5VHEb_gxahp9_d1p1J0SzU'
              // }}

              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                onGoogleApiLoaded(map, maps)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const AnyReactComponent = ({ text }) => (
  <div className="bg-black text-white">{text}</div>
);

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMap);
