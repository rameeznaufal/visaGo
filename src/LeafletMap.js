import { MapContainer, TileLayer, Popup,Marker,useMapEvents } from 'react-leaflet'

import { Icon } from 'leaflet'
import {useState,useEffect} from "react";
import LeafletMarkers from './LeafletMarkers';
import { ZOOM_LEVEL_INITIAL } from './utils/constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LeafletMap = () => {
 
    
  //const [location,setLocation]=useState();

  
  return (
    <div style={{display: 'flex'}}>
      <MapContainer style={{
                            height:"700px",flex:1
                        }} center={[12.983691, 77.693905]} zoom={ZOOM_LEVEL_INITIAL} scrollWheelZoom={false}>
     <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   
    <LeafletMarkers/>
    
    
    <ToastContainer />
  </MapContainer>
  
     </div>

  );
};

export default LeafletMap;