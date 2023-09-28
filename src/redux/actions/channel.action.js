import { SET_SUBSCRIPTION_STATUS,CHANNEL_DETAILS_FAIL, LOGIN_REQUEST,CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS } from "../actionType";
import request from "../../api"
export const getChannelDetails = (id) => async dispatch=> {
    try {
        dispatch({
            type: CHANNEL_DETAILS_REQUEST,
        })
       
        const {data}=await request("https://www.googleapis.com/youtube/v3/channels", {
            params: {
                part: "snippet,statistics,contentDetails",
               id
                
            },

        })
        console.log(data)
        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload:data.items[0]
        })
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: CHANNEL_DETAILS_FAIL,
            payload:error.response.data,
        })
        
    }
}
// export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
//     try {
//         // Get the access token from your Redux store or wherever it's stored
//         const accessToken = getState().auth.accessToken;

//         if (!accessToken) {
//             // Handle the case where there is no valid access token
//             console.error("No access token available.");
//             return;
//         }

//         const { data } = await request("https://www.googleapis.com/youtube/v3/subscriptions", {
//             params: {
//                 part: "snippet",
//                 forChannelId: id,
//                 mine: true,
//             },
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         if (data) {
//             // Assuming SET_SUBSCRIPTION_STATUS is an action type
//             dispatch({
//                 type: SET_SUBSCRIPTION_STATUS,
//                 payload: data.items.length !== 0,
//             });
//             console.log(data);
//         } else {
//             console.log("No data received from the API");
//         }
//     } catch (error) {
//         console.error("API request failed:", error);
//     }
// };
export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        // Get the access token from sessionStorage
        const accessToken = sessionStorage.getItem("ytc-access-token");

        if (!accessToken) {
            // Handle the case where there is no valid access token
            console.error("No access token available.");
            // You may want to dispatch an action here to handle the lack of access token.
            // For example, dispatch({ type: NO_ACCESS_TOKEN });
            return;
        }

        // Log the constructed API URL with the access token for debugging
        const apiUrl = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&forChannelId=${id}&mine=true&access_token=${accessToken}`;
        console.log("API URL:", apiUrl);

        // Your API request code here
        // Include the access token in the Authorization header of your API request
        const { data } = await request(apiUrl, {
            params: {
                prt: 'snippet',
                forChannelId: id,
                mine:true,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Rest of your code to handle the API response
        // ...

        if (data) {
            // Assuming SET_SUBSCRIPTION_STATUS is an action type
            dispatch({
                type: SET_SUBSCRIPTION_STATUS,
                payload: data.items.length !== 0,
            });
            console.log(data);
        } else {
            console.log("No data received from the API");
        }
    } catch (error) {
        console.error("API request failed:", error);
    }
};

