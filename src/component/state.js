import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player";

const State = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  // const [limit, setLimit] = useState(3);

  const apiCall = async () => {
    const res = await axios(
      "https://devsytes.com/mobileapi/trending_general_following",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
        data: {
          device_id: 1,
          device_type: 3,
          video_filter: 6,
          limit: 3,
          offset: offset,
        },
      }
    );
    setData([...data, ...res.data.data]);
  };
  
  console.log(data);

  useEffect(() => {
    apiCall().then(() => {

      const scroll = document.querySelector(".video_player");
      const vidTag = document.querySelectorAll("video");

      Array.from(vidTag).forEach(function (vid, index) {       
        
        
        scroll.addEventListener("scroll", () => {
          vid.pause();
          // vid.pause()
          if (scroll.scrollTop === vid.offsetTop) {
            vid.play()
          }
        })
      });

      console.log(vidTag.length, '=======================')

      for (let i = 0; i < vidTag.length; i++) {
        let vidLength = vidTag.length - 3;
        let vidElem = vidTag[vidLength];
        let vidLength2 = vidTag.length - 2;
        let vidElem2 = vidTag[vidLength2];
        scroll.addEventListener("scroll", () => {
          if (scroll.scrollTop > vidElem.offsetTop && scroll.scrollTop < vidElem2.offsetTop) {
            setOffset(offset + 1);
            vidElem2.classList.add('test')
          }
        });
      }
    });
  }, [offset]);
  return (
    <div className="video_player">
      {data.map((item, index) => {
        return (
          <ReactHlsPlayer
            key={index}
            poster={item.user_image}
            src={item.video_path}
            controls={true}
            autoPlay={true}
            muted={true}
            preload="none"
            // webkit-playsinline="true"
            // playsinline="true"
          />
        );
      })}
    </div>
  );
};
export default State;
