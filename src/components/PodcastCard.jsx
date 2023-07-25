import '../styles/PodcastCard.css'; 


const PodcastCard = ({ img, title, onClick }) => {
  return (

    <div className="podcast-card" onClick={onClick}>
    <h2 className="podcast-card--title">{title}</h2>
      <img src={img} className="podcast-card--image" alt={title} />
      
    </div>

  );
};

export default PodcastCard;
