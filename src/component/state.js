import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player";

const State = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [videoObj, setVideoObj] = useState();

  // console.log(data)

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

  // console.log(data, "api____");

  useEffect(() => {
    apiCall().then(() => {
      const scroll = document.querySelector(".video_player");
      const vid = document.querySelectorAll("video");
      for (let i = 0; i < vid.length; i++) {
        let vidLength = vid.length - 3;
        let vidElem = vid[vidLength];
        let vidLength2 = vid.length - 2;
        let vidElem2 = vid[vidLength2];
        scroll.addEventListener("scroll", () => {
          if (
            scroll.scrollTop > vidElem.offsetTop &&
            scroll.scrollTop < vidElem2.offsetTop
          ) {
            setOffset(offset + 1);
            vidElem2.classList.add("test");
          }
        });
      }
    });
  }, [offset]);

  useEffect(() => {
    data.length === 3 && setVideoObj(data[0]);
  }, [data]);

  useEffect(() => {
    const scroll = document.querySelector(".video_player");
    var video = Array.from(document.querySelectorAll("video"));

    data.forEach((id) => {
      video.forEach(function (vid) {
        scroll.addEventListener("scroll", (s) => {
          // console.log(scroll.scrollTop)
          if (scroll.scrollTop === vid.offsetTop && vid.id === id.video_id) {
            setVideoObj(id);
            // console.log(id.video_id, "======================", id);
          }
        });
      });
    });
  });

  console.log(videoObj);

  return (
    <div className="video_player">
      {data.map((item, index) => {
        return (
          <ReactHlsPlayer
            key={index}
            id={item.video_id}
            poster={item.user_image}
            src={item.video_path}
            controls={true}
            autoPlay={true}
            muted={true}
            preload="none"
          />
        );
      })}
    </div>
  );
};
export default State;
