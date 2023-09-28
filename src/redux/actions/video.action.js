import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SELECTED_VIDEOS_FAIL,
  SELECTED_VIDEOS_SUCCESS,
  SELECTED_VIDEOS_REQUEST,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
    RELATED_VIDEO_FAIL,
    SEARCHED_VIDEO_REQUEST,
    SEARCHED_VIDEO_SUCCESS,
    SEARCHED_VIDEO_FAIL,LOGIN_REQUEST,SET_SUBSCRIPTION_STATUS, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS,SUBSCRIPTIONS_CHANNEL_FAIL
} from "../actionType";
import request from "../../api";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};
export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEOS_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEOS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};
export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCHED_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,

        q: keyword,
        type: "video,channel",
      },
    });

    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: data.items
        
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};
export const getVideoByChannel = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:SUBSCRIPTIONS_CHANNEL_REQUEST,
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
        
        const apiUrl = "/subscriptions";
        console.log("API URL:", apiUrl);
        // Your API request code here
        // Include the access token in the Authorization header of your API request
        const { data } = await request(apiUrl, {
            params: {
                prt: 'snippet,contentDetails',
               
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
                type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
                payload: data.items,
            });
            console.log(data);
        } else {
            console.log("No data received from the API");
        }
    } catch (error) {
        console.error("API request failed:", error);
        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_FAIL,
            
        });
    }
};