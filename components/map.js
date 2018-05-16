class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof mapboxgl === 'undefined' || !prevState.map) return null;
    return {
      markers: createMarkers(nextProps.parks, prevState.map)
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiendlaW5zdG9jayIsImEiOiJjamd6eXB3NjIwazg1MndyNDQyeGN1dHRmIn0.XMPt0R1BrJZtqJcklFGwPg';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom
    });

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
        <div id='map' ref={el => this.mapContainer = el} />
        <style jsx>
          {`
            #map {
              height: 80vh;
            }
          `}
        </style>
      </div>
    )
  }
}

const createMarkers = (parks, map) => {
  const markers = [];
  parks.forEach(park => {
    const popupHTML = `<h3>${park.title}</h3><p>${park.addr}</p>${park.notes ?`<p>${park.notes}</p>`: ''}`;
    const marker = new mapboxgl.Marker()
      .setLngLat(park.coord)
      .setPopup(new mapboxgl.Popup({ offset: 40 })
      .setHTML(popupHTML))
      .addTo(map);
    markers.push(marker);
  })
  return markers;
}

export default Map;