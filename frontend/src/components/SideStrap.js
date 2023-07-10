
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import { dummy_merchant_list } from './LeafletMarkers';
import { useCommonStore } from '../utils/store';
import OfferCard from './OfferCard';
import { useState } from 'react';
const SideStrap = () => {
    const {setSideStrapVisible,sideStrapVisible,index,setSelectedOffer,selectedOffer}=useCommonStore();
    const [offer,setOffer]=useState();
    console.log(selectedOffer);
    //console.log(offer);
    if(!sideStrapVisible)
    {
        return null;
    }

    const handleChange = () => {
        console.log("Inside function");
      };

    return <div>
        <Modal className="text-center position-absolute" style={{top:0,right:0}} isOpen={sideStrapVisible} toggle={()=>setSideStrapVisible(!sideStrapVisible)}>
            <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}} toggle={()=>setSideStrapVisible(!sideStrapVisible)}>
                <div>
                <h4>{dummy_merchant_list[index].name}</h4>
                <h6><i>{dummy_merchant_list[index].type}</i></h6>
                </div>
                </ModalHeader>
            <ModalBody >
                
                    <b className="text-info">List of Offers:</b>
                    <div onChange={(event)=>{console.log(event)}}>
                    {dummy_merchant_list[index].offer.map((indivOffer,index)=>{
                         return (
                           <label style={{left:0,right:0}} key={index}>
                           <input type="radio" name="test" value="small" checked onClick={()=>{setOffer(indivOffer)}} />
                           <OfferCard offer={indivOffer}/>
                         </label>);
                    })}
                    </div>
                    <br></br>
                    <br></br>
                 <button className='btn mt-3 text-white' style={{backgroundColor:'#4fc1db'}} onClick={()=>{setSelectedOffer(offer);setSideStrapVisible(false)}}>Redeem and pay</button>
                </ModalBody>
        </Modal>
    </div>
  
};

export default SideStrap;