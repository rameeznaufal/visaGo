import '../css/allstyles.css'
import { randomColor, randomIntFromInterval } from '../utils/functions';
const OfferCard = (offer) => {
 
    
  //const [location,setLocation]=useState();

  //console.log(offer)
  return (
    <div class="d-flex justify-content-center container text-white mt-5 ">
        <div class="card p-2 px-3 py-3 position-relative z-index-1" style={{backgroundColor:randomColor()}}>
        <div class="text-center text-danger align-items-center position-absolute" style={{left:0,right:0,top:'35%',margin:'auto' }}><h4><b>{offer.offer}</b></h4></div>
           
            <div class="d-flex justify-content-between align-items-center"><img src="https://i.imgur.com/8ANWXql.png" width="20" height="20"/><img src="https://i.imgur.com/SsTSozr.png" width="40"/></div>
           
            <div class="mt-3"><span class="mr-3">4***</span><span class="mr-3">****</span><span class="mr-3">****</span><span class="mr-2">{randomIntFromInterval(1000,9999)}</span></div>
                     
            <div class="d-flex justify-content-between card-details mt-3 mb-3">
                <div class="d-flex flex-column"><span class="light">Card Holder</span><span class="text-white">You :{'>'}</span></div>
                <div class="d-flex flex-row  gap-2">
                    <div class="d-flex flex-column mr-3"><span class="light">Expired</span><span class="text-white">{randomIntFromInterval(1,12)}/{randomIntFromInterval(24,40)}</span></div>
                    <div class="d-flex flex-column"><span class="light">CVV</span><span class="text-white">{randomIntFromInterval(100,999)}</span></div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default OfferCard;