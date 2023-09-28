import React, { useEffect } from "react";
import "./subscriptions.scss"

import { useDispatch } from "react-redux";


import
{ getVideoByChannel } from "../../redux/actions/video.action";
const SubscriptionsScreen = () => {
    
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getVideoByChannel());
    }, [ dispatch]);
    return <div>
        page not found!!!
    </div>
}
export default SubscriptionsScreen