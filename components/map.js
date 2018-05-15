class Map extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiendlaW5zdG9jayIsImEiOiJjamd6eXB3NjIwazg1MndyNDQyeGN1dHRmIn0.XMPt0R1BrJZtqJcklFGwPg';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [`${this.props.lng}`, `${this.props.lat}`],
      zoom: `${this.props.zoom}`
    });

    this.props.parks.map((park) => {
      let popupHTML = '<h3>' + park.title + '</h3>' + 
        '<p>' + park.addr + '</p>' +
        (park.notes ? '<p>' + park.notes + '</p>' : '');
      let marker = new mapboxgl.Marker()
      .setLngLat(park.coord)
      .setPopup(new mapboxgl.Popup({ offset: 40 })
      .setHTML(popupHTML))
      .addTo(this.map);
    })
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