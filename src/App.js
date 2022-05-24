import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'
import Feed from './components/Feed'

function App() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    fetch("https://api.test.eyesee-cms.com/tiktok/tester-timeline-interaction/920")
      .then(res => res.json())
      .then(
        (result) => {
          setPosts([...result.timeline.posts])
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
  },[])
  return (
    <div className="App">
      {
        posts.length > 0 && <Feed posts={posts} />
      }
    </div>
  );
}

export default App;
