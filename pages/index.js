import Head from 'next/head'
import React from 'react'
import 'isomorphic-unfetch'
import Dropdown from '../components/dropdown'
import Map from '../components/map'
import Footer from '../components/footer'
export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      citySelected: "sf"
    }
  }
  
  static async getInitialProps() {
    const response = await fetch('http://localhost:3000/static/sf-parks.json');
    const jsonResults = await response.json();
    return jsonResults;
  }

  async handleChange(event) {
    this.setState({
      citySelected: event.target.value
    })
    const response = await fetch(`http://localhost:3000/static/${event.target.value}-parks.json`);
    const jsonResults = await response.json();

    // remove old markers array, set state for parks
    // pass in new lat, long values, to read into the render function for map

  }

  render() {
    return (
      <div>
        <Head>
          <title>Bark 🐾 Park</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script crossOrigin src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
          <link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <h1>
          Bark 🐾 Park
          <span id="index-subtitle">&nbsp; Find a great off leash 🐶 park</span>
        </h1>
        <Dropdown onChange={this.handleChange.bind(this)} value={this.state.citySelected}/>
        <Map lng='-122.42' lat='37.7749' zoom='11' parks={this.state.parks || this.props.parks}/>
        <Footer />
        <style global jsx>{`
          body {
            font-family: helvetica-neue, sans-serif;
            max-width: 800px;
            width: 95%;
            margin: 0 auto;
          }          
          #index-subtitle {
            font-size: 12px;
            font-weight: 300;
          }
          @media (max-width: 500px) {
            #index-subtitle {
              display: none;
            }
          }
        `}</style>
      </div>
    )
  }
}