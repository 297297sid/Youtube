import { React, useState } from "react";

import "./_cateogory.scss";
import { useDispatch } from "react-redux";
import { getPopularVideos, getVideosByCategory } from "../../redux/actions/video.action";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "use of API ",
  "Redux",
  "Music",
  "Algorithm Art",
  "Guitar",
  "Coding",
  "Cricket",
  "Poor coder",
  "Movies",
  "Banglore",
  "Pune",
  "Coding",
];

const Categoriesbar = () => {
  const [activeElement, setActiveElement] = useState("All");
  const dispatch=useDispatch()
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All")
    {
      dispatch(getPopularVideos())
    } else {
      dispatch(getVideosByCategory(value))
      }
  
  };
  return (
    <div className="Categoriesbar">
      {keywords.map((value, i) => (
          <span onClick={() => handleClick(value)} key={i}
          className={activeElement===value?'active':" "}>
          {value}
        </span>
      ))}
    </div>
  );
};

export default Categoriesbar;
