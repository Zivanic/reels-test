import { useRef, useState } from "react";
import { InView } from "react-intersection-observer";
import "./style.css";
import poster from "./poster.jpg";

function Feed({ posts }) {
  const [showVideo, setShowVideo] = useState(true);
  const videoPlayer = useRef(null); 

  function playVideo() {
    videoPlayer.current.play();
  }

  function changeVideoUrl(inView, postId) {
    if (inView) {
      setShowVideo(true)
      let activePost = null;
      posts.forEach((post) => {
        if (post.post_id === postId) activePost = post;
      });
      videoPlayer.current.src = activePost.video_url;
      playVideo();
    }else{
      setShowVideo(false)
    }
  }
  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <InView
            as="div"
            onChange={(inView) => changeVideoUrl(inView, post.post_id)}
            threshold={1}
            className="test1"
            key={post.post_id}
            
          >
          <img
              id={post.post_id}
              alt={post.post_id}
              src={poster}
            />
            
          </InView>
        );
      })}
      <video
        ref={videoPlayer}
        poster={poster}
        playsInline
        src={posts[0].video_url}
        className={`${showVideo ? "show" : "scroll"} videoEement`}
        loop
        autoPlay={true}
        muted={true}
      />
    </div>
  );
}
export default Feed;
