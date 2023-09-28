import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import "./_video.scss";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";



import { useNavigate } from 'react-router-dom';
const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  
  const videoId = id?.videoId || id;
  const navigate = useNavigate();
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "contentDetails,statistics",
              id: videoId,
              key: "AIzaSyA_RKr2im0C_uAdsfeyn4JWTH_adYQn_sk", // Replace with your YouTube Data API key
            },
          }
        );

        const { items } = response.data;
        setDuration(items[0].contentDetails.duration);
        setViews(items[0].statistics.viewCount);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    getVideoDetails();
  }, [videoId]);

  useEffect(() => {
    const getChannelIcon = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/channels",
          {
            params: {
              part: "snippet",
              id: channelId,
              key: "AIzaSyA_RKr2im0C_uAdsfeyn4JWTH_adYQn_sk", // Replace with your YouTube Data API key
            },
          }
        );

        const { items } = response.data;
        setChannelIcon(items[0].snippet.thumbnails.default);
      } catch (error) {
        console.error("Error fetching channel icon details:", error);
      }
    };

    getChannelIcon();
  }, [channelId]);
  
  const handleVideoClick = () => {
   
    navigate(`/watch/${videoId}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img alt="" src={medium.url} /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye />
          {numeral(views).format("0.a")} Views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        <div className="channel-icon">
          {/* <img
            id="img"
            draggable="false"
            className="style-scope yt-img-shadow"
            alt=""
            width="38"
            borderRadius="50%"
            src={channelIcon?.url}
          /> */}
          <LazyLoadImage src={channelIcon?.url} effect="blur" />
        </div>
        <p style={{ display: "inline", paddingLeft: "10px" }}>{channelTitle}</p>
        {/* <p style={{ display: "inline", paddingLeft: "10px" }}>{channelTitle}</p> */}
      </div>
    </div>
  );
};

export default Video;
