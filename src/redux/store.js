import { createStore, applyMiddleware,combineReducers } from 'redux';


import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {authReaducer} from "./reducers/auth.reducer"
import {homeVideoReducer,subscriptionsChannelReducer,releatedVideoReducer} from "./reducers/videos.reducer"
import { selectedVideoReducer } from './reducers/videos.reducer';
import { channelDetailsReducer } from './reducers/channel.reducer';
import {commentListReducer} from './reducers/comments.reducer'
import {searchedVideosReducer} from "./reducers/videos.reducer"
const rootReaducer = combineReducers({
    auth: authReaducer,
    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailsReducer,
    commentList: commentListReducer,
    releatedVideos: releatedVideoReducer,
    searchedVideos: searchedVideosReducer,
    subscriptionsChannel:subscriptionsChannelReducer
})


const store = createStore(rootReaducer,
    {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;
