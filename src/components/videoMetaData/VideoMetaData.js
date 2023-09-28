import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import moment from "moment";
import { useSelector } from "react-redux";
import { checkSubscriptionStatus } from "../../redux/actions/channel.action";
import numeral from "numeral";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch } from "react-redux";
import { getChannelDetails } from "../../redux/actions/channel.action";
const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();

    const { snippet: channelSnippet,
        statistics: channelStatistics,

    } = useSelector((state) => state.getChannelDetails?.channel || {});
const {subscriptionStatus}=useSelector(state=>state.channelDetails.subscriptionStatus)

  // const { snippet: channelSnippet, statistics: channelStatistics } = useSelector((state) => state.getChannelDetails.channel);
  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);
  // const thumbnailUrl = channelSnippet?.thumbnails?.default?.url || '';
  // const thumbnailUrl = channelSnippet?.thumbnails?.default?.url || '';
    const thumbnailUrl = snippet.thumbnails.default.url;
   

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className="mr-3">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex align-items-center">
          {/* <img
            src={thumbnailUrl}
            alt=""
                      className="rounded-circle mr-3"
                      style={{ borderRadius: '50%', height: '50px', width: '50px', objectFit: 'contain' }}
          /> */}
          <img
            src={thumbnailUrl}
            alt=""
            className="rounded-circle mr-3"
            style={{
              borderRadius: "50%",
              height: "50px",
              width: "50px",
              objectFit: "contain",
            }}
          />


          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
             
                          {numeral(channelStatistics?.subscriberCount).format("0.a")} Subscribers

            </span>
          </div>
        </div>
       


                  <button className={`p-2 m-2 border-0 btn btn-danger ${subscriptionStatus && 'btn-gray'}`}>
  {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
</button>





      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
