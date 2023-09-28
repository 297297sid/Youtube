import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideosBySearch } from "../redux/actions/video.action";
import VideoHorizontal from "../components/VideoHorizonatal/VideoHorizonatal";
import "./searchScreen.scss";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  return (
    <Container>
      {!loading ? (
        videos.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="130px" count={15} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
