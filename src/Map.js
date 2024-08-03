import React, {useEffect, useState} from 'react'
import {MapContainer, TileLayer, Marker, Polyline} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const vehicleIcon = new L.Icon({
  iconUrl: 'https://example.com/vehicle-icon.png', // Use a valid vehicle icon URL
  iconSize: [25, 25],
})

const Map = () => {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations')
        const data = await response.json()
        setPositions(data)
      } catch (error) {
        console.error('Error fetching location data:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Fetch new data every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <MapContainer
      center={[17.385044, 78.486671]}
      zoom={15}
      style={{height: '500px', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.length > 0 && (
        <>
          <Marker
            position={[
              positions[positions.length - 1].latitude,
              positions[positions.length - 1].longitude,
            ]}
            icon={vehicleIcon}
          />
          <Polyline
            positions={positions.map(pos => [pos.latitude, pos.longitude])}
            color="blue"
          />
        </>
      )}
    </MapContainer>
  )
}

export default Map
