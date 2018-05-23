import getConfig from "next/config";

const {
  publicRuntimeConfig: { apiHost }
} = getConfig();

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof mapboxgl === "undefined" || !prevState.map) return null;
    prevState.markers.forEach(oldMarker => {
      oldMarker.remove();
    });
    return {
      markers: createMarkers(nextProps.parks, prevState.map),
      center: centerMap(nextProps.coord, nextProps.zoom, prevState.map)
    };
  }

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiendlaW5zdG9jayIsImEiOiJjamd6eXB3NjIwazg1MndyNDQyeGN1dHRmIn0.XMPt0R1BrJZtqJcklFGwPg";

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: this.props.coord,
      zoom: this.props.zoom
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "top-left");

    this.setState({
      map: this.map,
      markers: createMarkers(this.props.parks, this.map)
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div>
        <div id="map" ref={el => (this.mapContainer = el)} />
        <style jsx>
          {`
            #map {
              height: 80vh;
              margin-top: 5px;
            }
            :global(.marker) {
              padding: 10px;
            }
            :global(.marker-img) {
              background-image: url("${apiHost}/static/images/baseline_pets_black_18dp.png");
              background-size: cover;
              background-color: #eceff1;
              width: 22px;
              height: 22px;
              border-radius: 50%;
              border: 1px solid #263238;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    );
  }
}

const createMarkers = (parks, map) => {
  const markers = [];
  parks.forEach(park => {
    const el = document.createElement("div");
    const innerEl = document.createElement("div");
    el.appendChild(innerEl);
    el.className = "marker";
    innerEl.className = "marker-img";
    const popupHTML = `<h3>${park.title}</h3><p>${park.addr}</p>${
      park.notes ? `<p>${park.notes}</p>` : ""
    }`;
    const marker = new mapboxgl.Marker(el)
      .setLngLat(park.coord)
      .setPopup(new mapboxgl.Popup({ offset: 40 }).setHTML(popupHTML))
      .addTo(map);
    markers.push(marker);
  });
  return markers;
};

const centerMap = (coords, zoom, map) => {
  map.flyTo({ center: coords, zoom: zoom });
};

export default Map;
