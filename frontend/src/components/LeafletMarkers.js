
import { Popup,Marker,useMapEvents} from 'react-leaflet';
import shop from '../images/3d-shop.webp';
import disabledshop from '../images/disabled_shop.png';
import { Icon } from 'leaflet'
import {useState,useEffect} from "react";
import { ICON_HEIGHT, ICON_WIDTH, ZOOM_LEVEL_INITIAL } from '../utils/constants';
import current_location from '../images/current_location.png';
import ConfettiExplosion from 'react-confetti-explosion';
import { haversine, hintGenerator } from '../utils/functions';
import { toast } from 'react-toastify';
import SideStrap from './SideStrap';
import { useCommonStore } from '../utils/store';

/**
 * 
 * To be replaced by API call
 */
export const dummy_merchant_list=[{name:"Mezyan",lat:12.9958,long: 77.6964,offer:["Get 20% cashback on orders above ₹450","Get ₹50 off on any purchase"],type:"Resturant and bar",hasVisit:false},{name:"Ferns and petals",lat:12.9569,long: 77.7011,offer:["Get 100 Rs. Off on any purchase above Rs 200"],type:"Boutique shop",hasVisit:false}]

const notify = () => 
{
  toast('🚀🚀 Successfully unlocked a location! \nYayyy!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
};
const LeafletMarkers = () => {
 const [merchantList,setMerchantList]=useState(dummy_merchant_list);
 const [iconDim,setIconDim]=useState([ICON_WIDTH,ICON_HEIGHT]);
 const [isExploding, setIsExploding] = useState(false);
 const [coords,setCoords]=useState(null);
 const {setSideStrapVisible,setIndex}=useCommonStore();
     useEffect(() => {
    const fetchLocation = async () => {
       try {
         const position = await getCurrentPosition();
         setCoords([position.coords.latitude,position.coords.longitude]);
        // console.log(position.coords.latitude+" "+position.coords.longitude);
       } catch (error) {
         console.error('Error retrieving location:', error);
       }
     };
     const interval = setInterval(() => {
      fetchLocation();
    }, 1000);    
   }, []);
 
   const getCurrentPosition = () => {
     return new Promise((resolve, reject) => {
       if (!navigator.geolocation) {
         reject(new Error('Geolocation is not supported by this browser.'));
       } else {
         navigator.geolocation.watchPosition(
           (position) => resolve(position),
           (error) => reject(error)
         );
       }
     });
   };

  useEffect(() => {
    let reached=false;
    //console.log(coords);
    if(coords)
    {
      const new_list=[];
    merchantList.map((obj, index)=>{
      //console.log(haversine(obj.lat,obj.long,coords[0],coords[1]))
      if(!obj.hasVisit && haversine(obj.lat,obj.long,coords[0],coords[1])<100)
      {
        
        reached=true;
        
        new_list.push({...obj,hasVisit:true});
      }
      else 
      {
        new_list.push(obj);
      }
    });
    if(reached)
    {
      notify();
      setIsExploding(true);
      
    }
    
    setMerchantList(new_list);
  }

  }, [coords]);


    
    const map = useMapEvents({
      zoomend: ()=>
      {
        const currentZoom = map.getZoom();
        const frac=currentZoom / ZOOM_LEVEL_INITIAL;
        const factor = Math.pow(frac,frac>=1?2:5);
        //console.log(factor+" "+currentZoom)
        const newX = Math.round(ICON_WIDTH * factor);
        const newY = newX * ICON_HEIGHT / ICON_WIDTH;
        setIconDim([newX,newY]);  
      },
      
    })
  
    return (
      <div>
        
       
        {coords && <Marker position={[coords[0],coords[1]]} icon={new Icon({iconUrl:current_location,iconSize:iconDim})}><Popup>Current location</Popup></Marker>}
        {isExploding && <ConfettiExplosion force={0.6} duration={2500} particleCount={100} width={1000} zIndex={100000} onComplete={()=>{console.log("Animation completed");setIsExploding(false)}}></ConfettiExplosion>}  
        {merchantList.map((obj, index) => {
        if(obj.hasVisit)
        {
          return (
            <Marker position={[obj.lat, obj.long]} zIndexOffset={100000} icon={new Icon({iconUrl:shop,iconSize:iconDim})} key={index}>
            <Popup> Unlocked! <button style={{background: 'none',border: 'none',padding: 0,color: "#069",cursor: 'pointer'}} onClick={()=>{setSideStrapVisible(true,index)}}>Click here </button> to see list of offers</Popup>     
          </Marker>
          );
        }
        else 
        {
          return (
            <Marker position={[obj.lat, obj.long]} icon={new Icon({iconUrl:disabledshop,iconSize:iconDim})} key={index}>
            <Popup> Still unlocked! But here's some hints for you: <br/>{hintGenerator(obj.name,obj.type,index)}  </Popup>     
          </Marker>
          );
        }
    
})}
      <SideStrap></SideStrap>
      </div>
    )
};

export default LeafletMarkers;