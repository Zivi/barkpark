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
      citySelected: "sf",
      coord: props.coord,
      parks: props.parks
    }
  }
  
  static async getInitialProps() {
    // pass in context.params from next.js to get city information
    // add error state with 404 page
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
    this.setState({
      coord: jsonResults.coord,
      parks: jsonResults.parks
    })
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
        <Map coord={this.state.coord} zoom='11' parks={this.state.parks}/>
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