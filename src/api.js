import axios from 'axios'

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key:"AIzaSyA_RKr2im0C_uAdsfeyn4JWTH_adYQn_sk",
            // : process.env.REACT_APP_YT_API_KEY,
    },


})
export default request