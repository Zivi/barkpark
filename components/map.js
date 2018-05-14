class Map extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiendlaW5zdG9jayIsImEiOiJjamd6eXB3NjIwazg1MndyNDQyeGN1dHRmIn0.XMPt0R1BrJZtqJcklFGwPg';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [`${this.props.lng}`, `${this.props.lat}`],
      zoom: `${this.props.zoom}`
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
            width: ${this.props.width}px;
            height: ${this.props.height}px;
          }
        `}
      </style>
      </div>
    )
  }
}

export default Map;