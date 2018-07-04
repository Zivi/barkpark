import Head from "next/head";
import React from "react";
import "isomorphic-unfetch";
import getConfig from "next/config";
import Router from "next/router";
import Dropdown from "../components/dropdown";
import Map from "../components/map";
import Footer from "../components/footer";

const {
  publicRuntimeConfig: { apiHost }
} = getConfig();

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countySelected: props.countySelected,
      coord: props.coord,
      parks: props.parks,
      zoom: props.zoom,
      jsonNotFound: props.jsonNotFound
    };
  }

  static async getInitialProps({ query }) {
    // pass in context.params from next.js to get city information
    // add error state with 404 page
    const location = query.location || "sf";
    try {
      const response = await fetch(
        `${apiHost}/static/data/${location}-parks.json`
      );
      const jsonResults = await response.json();
      return {
        ...jsonResults,
        countySelected: location
      };
    } catch (e) {
      const response = await fetch(`${apiHost}/static/data/sf-parks.json`);
      const jsonResults = await response.json();
      return {
        ...jsonResults,
        countySelected: location,
        jsonNotFound: true
      };
    }
  }

  async handleChange({ target: { value } }) {
    const response = await fetch(`${apiHost}/static/data/${value}-parks.json`);
    const jsonResults = await response.json();
    this.setState({
      coord: jsonResults.coord,
      parks: jsonResults.parks,
      zoom: jsonResults.zoom,
      countySelected: value,
      jsonNotFound: false
    });

    const href = `/?location=${this.state.countySelected}`;
    Router.replace(href, href, { shallow: true });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Bark Park</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <script
            crossOrigin="true"
            src="https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="/static/images/baseline_pets_black_18dp.png"
          />
        </Head>
        <h1>
          Bark Park
          <span id="index-subtitle">&nbsp; Find a great off leash 🐶 park</span>
        </h1>
        <span className="error-message">
          {this.state.jsonNotFound &&
            "We couldn't find parks with your location, select a location from the dropdown ➡ "}
        </span>
        <Dropdown
          onChange={this.handleChange.bind(this)}
          value={this.state.countySelected}
        />
        <Map
          coord={this.state.coord}
          zoom={this.state.zoom}
          parks={this.state.parks}
        />
        <Footer />
        <style global jsx>{`
          body {
            font-family: helvetica-neue, sans-serif;
            max-width: 800px;
            width: 95%;
            margin: 0 auto;
            color: #263238;
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
    );
  }
}
