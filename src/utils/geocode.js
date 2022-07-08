const request=require('request')

const geocode=(address, callbackFn)=>{
    const geocodeURL='http://api.positionstack.com/v1/forward?access_key=c452528623448608d5c97874d5a08497&query='+address+'&limit=1'
    request({url:geocodeURL,json:true},(error,response)=>{
        if(error){
            callbackFn('Unable to connect to geocoding service!',undefined)
        }else if(response.body.error){
            callbackFn("Unable to find location",undefined)
        }else{
            callbackFn(undefined,{
                //location:response.body.data[0].label,
                longitude:response.body.data[0].longitude,
                latitude:response.body.data[0].latitude
            })
        }
    })
}

module.exports=geocode