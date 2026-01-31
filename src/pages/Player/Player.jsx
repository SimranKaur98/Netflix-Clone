import React, { useEffect, useState, useMemo } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Use environment variable here
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }), []);
  

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id, options]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      {apiData.key && (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

      <div className="player-info">
        <p className="player-info-date">{apiData.published_at.slice(0, 10)}</p>
        <p className="player-info-name">{apiData.name}</p>
        <p className="player-info-type">{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
