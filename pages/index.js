import Head from 'next/head'
import React from 'react'
import Map from '../components/map'
import parks from '../data/parks'
export default class extends React.Component {

  render() {
    return (
      <div>
        <Head>
          <title>Bark 🐾 Park</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script crossorigin src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
          <link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <h1>Bark 🐾 Park</h1>
        <h2>Find a great 🐶 park</h2>
        <Map width='500' height='500' lng='-122.4194' lat='37.7749' zoom='11' parks={parks.parks}/>
        <style global jsx>{`
          body {
            font-family: helvetica-neue, sans-serif;
          }
        `}</style>
      </div>
    )
  }
}