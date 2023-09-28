import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
} from "../actionType";
import axios from 'axios';
import request from "../../api";
export const getCommentsOfVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });

    const { data } = await request(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        params: {
          part: "snippet",
          videoId: id,
        },
      }
    );
    console.log(data);
    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.response.message,
    });
  }
};
// export const addComment = (id, text) => async (dispatch, getState) => {
//   try {
//     const { auth } = getState();
//     const accessToken = auth.accessToken;
//     const obj = {
//       snippet: {
//         videoId: id,
//         topLevelComment: {
//           snippet: {
//             textOriginal: text,
//           },
//         },
//       },
//     };

//     await request.post(
//       "https://www.googleapis.com/youtube/v3/commentThreads",
//       obj,
//       {
//         params: {
//           part: "snippet",
//         },
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     dispatch({
//       type: CREATE_COMMENT_SUCCESS,
//     });
//     dispatch(getCommentsOfVideoById(id))
//   } catch (error) {
//     console.log(error.response.data);
//     dispatch({
//       type: CREATE_COMMENT_FAIL,
//       payload: error.response.message,
//     });
//   }
// };
export const addComment = async (videoId, text, accessToken) => {
  try {
    const commentObject = {
      snippet: {
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    const response = await axios.post(
      'https://www.googleapis.com/youtube/v3/commentThreads',
      commentObject,
      {
        params: {
          part: 'snippet',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Comment added successfully:', response.data);
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

// Usage:
// Replace 'videoId', 'text', and 'accessToken' with appropriate values
addComment('videoId', 'This is a test comment', 'accessToken');