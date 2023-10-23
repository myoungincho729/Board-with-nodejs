import { useState, useEffect } from "react";
import axios from "axios";
import ListCard from "./ListCard";
import { useNavigate } from "react-router-dom";

function MainPost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  function handleClick(id) {
    console.log(id);
    axios.get("http://localhost:5001/api/posts/" + id).then((res) => {
      console.log(res.data);
      // setPosts(Array.from(res.data));
      navigate("/posts");
    });
  }

  useEffect(() => {
    axios.get("http://localhost:5001/api/posts").then((res) => {
      setPosts(Array.from(res.data));
    });
  }, []);
  // console.log(posts);
  return (
    <div>
      {posts.map((data) => (
        <ListCard props={data} />
      ))}
    </div>
  );
}

export default MainPost;
