export const haversine=(lat1, lon1, lat2, lon2)=>
    {
        // distance between latitudes
        // and longitudes
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;
           
        // convert to radiansa
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
         
        // apply formulae
        let a = Math.pow(Math.sin(dLat / 2), 2) +
                   Math.pow(Math.sin(dLon / 2), 2) *
                   Math.cos(lat1) *
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c * 1000;
         
    }

    export const isVowel=(c)=>
    {
        //console.log(c)
        if(c==='a' || c==='e' || c==='i' || c==='o' || c==='u')
        {
            return true;
        }
        return false;
    }
    export const hintGenerator=(name,type,idx)=>
    {
        let sentence="It's";
        const shopType=type.toLowerCase();
        sentence=sentence+(isVowel(shopType[0])?" an ":" a ")+shopType;
        sentence=sentence+", whose name starts with the letter "+name[0].toLowerCase()+" and ends with the letter "+name.slice(-1)+"(.....aaand it's got some exciting offers for you!!🐣🦄)";
        return sentence;
    }


    export const randomIntFromInterval=(min, max)=> { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      export const randomColor=()=> { // min and max included 
        const colorList=['#23406f','#301934',"#023020"]
        return colorList[Math.floor(Math.random() * colorList.length)];
      }