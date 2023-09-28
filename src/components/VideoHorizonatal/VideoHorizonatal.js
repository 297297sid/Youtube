import React, { useState ,useEffect} from "react";
import "./_videoHorizonatal.scss";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col } from "react-bootstrap";
const VideoHorizonatal = ({ video ,searchScreen}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails:{medium},
    },
  } = video;
  const isVideo=id.kind==='youtube#video'
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "contentDetails,statistics",
              id: id.videoId,
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
  }, [id]);
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
  


  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const handleClick = () => {
    isVideo?
      navigate(`/watch/${id.videoId}`)
      :
      navigate(`/channel/${id.channelId}`)
  }
  const thumbnail =!isVideo && 'videoHorizontal__thumbnail-channel'
  return (
    <Row className="videoHorizontal m-1 py-2 align-items-center "onClick={handleClick}>
      <Col xs={6} md={searchScreen?4:6} className="videoHorizontal__left">
        <LazyLoadImage
         
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail}`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col xs={6} md={searchScreen?8:6} className="videoHorizontal__right" p-0>
        <p className="videoHorizontal__title mb-1">
          {title}
        </p>
        { isVideo && ( <div className="videoHorizontal__details">
          <AiFillEye />
          {numeral(views).format("0.a")} Views •
          {moment(publishedAt).fromNow()}
        </div>)}
        
        {isVideo && <p className="mt-1">
          { description}</p>}
        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {isVideo &&(
            <LazyLoadImage
              src={channelIcon?.url}
              effect="blur"
              className="videoHorizontal__thumbnail"
              wrapperClassName="videoHorizontal__thumbnail-wrapper" />
          )}
          <p className="mb-0">{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};
export default VideoHorizonatal;

