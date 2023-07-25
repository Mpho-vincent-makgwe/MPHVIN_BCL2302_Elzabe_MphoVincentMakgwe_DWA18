// Episode.js

const Episode = ({ episode, onPlay }) => {
  return (
    <div className="episode">
      <h3>{episode.title}</h3>
      <p>{episode.description}</p>
      <p>Release Date: {new Date(episode.updated).toLocaleDateString()}</p>
    </div>
  );
};

export default Episode;
