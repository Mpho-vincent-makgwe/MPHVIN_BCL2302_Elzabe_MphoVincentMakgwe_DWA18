
import '../styles/PodcastCard.css'; 


const PodcastCard = ({ img, title, onClick }) => {
  return (
    <div className="podcast-card" onClick={onClick}>
      <img src={img} className="podcast-card--image" alt={title} />
      <h2 className="podcast-card--title">{title}</h2>
    </div>
  );
};

export default PodcastCard;
