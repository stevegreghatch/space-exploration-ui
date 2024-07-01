import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const MissionMap = ({ mission }) => {
  const [mapData, setMapData] = useState({});
  const [loadingMap, setLoadingMap] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      setLoadingMap(true);
      try {
        const response = await axios.get(`/map/${mission}`);
        setMapData(response.data);
        setLoadingMap(false);
      } catch (error) {
        console.error('Error fetching map data:', error);
        setError('Error fetching map data');
        setLoadingMap(false);
      }
    };

    if (mission) {
      fetchMapData();
    }
  }, [mission]);

  useEffect(() => {
    console.log('Map data:', mapData);
  }, [mapData]);

  const layout = {
    title: mapData.title?.text || 'Mission Map',
    geo: {
      showland: true,
      landcolor: '#E5ECF6',
      projection: { type: 'orthographic' },
      center: {
        lon: mapData.lon ? mapData.lon[0] : 0,
        lat: mapData.lat ? mapData.lat[0] : 0
      }
    }
  };

  if (loadingMap) {
    return <p>Loading map...</p>;
  }

  if (error) {
    return <p>Error fetching map data: {error}</p>;
  }

  if (!mapData || !mapData.data || mapData.data.length === 0) {
    return <p>No map data available</p>;
  }

  return (
    <div className="map-container">
      <Plot
        data={mapData.data}
        layout={layout}
        style={{ width: '100%', height: '500px' }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default MissionMap;
