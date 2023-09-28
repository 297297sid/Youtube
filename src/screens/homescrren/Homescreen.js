import React,{useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Categoriesbar from "../../components/categoriesBar/Categoriesbar";
import Video from "../../components/video/Video";
import {useDispatch,useSelector} from "react-redux"
import { getPopularVideos, getVideosByCategory } from "../../redux/actions/video.action";
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from "react-loading-skeleton";
import SkeletonVideo from "../../components/skeletons/SkeletonVideo";

const HomeScreen = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch])
  
  const { videos,activeCategory,loading } = useSelector(state => state.homeVideos)
  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  
  }
  
  return (
    <Container>
      <Categoriesbar />
      <Row>
        <InfiniteScroll 
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          Loader={
            <div className="spinner-border text-danger d-block mx-auto">
              
          </div>
        } className='row'>
        {!loading ? videos.map((video) => (
          <Col lg={3} md={4}>
            <Video video=
              {video
              } key={video.id} />
          </Col>
        ))
            : [...Array(20)].map(() => <Col lg={3} md={4}>
              {/* <Skeleton height={180} width="100%" /> */}
            <SkeletonVideo className="infi"/> 
            </Col>
              )
            
          }
          </InfiniteScroll>
      </Row>
    </Container>
  );
};

export default HomeScreen;
