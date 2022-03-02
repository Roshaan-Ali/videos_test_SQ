import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player";

const State = () => {
  const [data, setData] = useState([]);

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
          offset: 1,
        },
      }
    );
    setData(res.data.data);
  };

  useEffect(() => {
    apiCall();
  }, []);
  return(
      <div className="video_player">
          {
              data.map((item, index) => {
                return (
                  <ReactHlsPlayer
                    src={item.video_path}
                    autoPlay={true}
                  />
                );
              })
          }
      </div>
  )
};
export default State;
