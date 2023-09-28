import React, { useEffect } from "react";
import "./watchScreen.scss";
import { Row, Col } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoHorizonatal from "../../components/VideoHorizonatal/VideoHorizonatal";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/video.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  // const{videos,loading:relatedVideoLoading}=useSelector(state=>state.relatedVideos)
  // const { video, loading } = useSelector(state => state.selectedVideo)
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos, loading: relatedVideoLoading } = useSelector(
    (state) => state.releatedVideos
  );

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen_player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading.....</h6>
        )}
        <Comments videoId={id} />
      </Col>
      <Col lg={4}>
        {!loading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizonatal video={video} key={video.id.videoId} />
            ))
        ) : (
          <SkeletonTheme color="#343a40" highlightColor='#3c4147'>
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};
export default WatchScreen;
