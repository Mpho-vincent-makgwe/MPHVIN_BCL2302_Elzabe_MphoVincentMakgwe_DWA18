import '../styles/PodcastCard.css'; 


const PodcastCard = ({id,img,rating, reviewCount,location,title,price,selectedSeasonIndex, onSeasonChange, onClose,podcast,onClick,onFavoriteChange}) => {
  return (

    <div className="podcast-card" onClick={onClick}>
    <h2 className="podcast-card--title">{title}</h2>
      <img src={img} className="podcast-card--image" alt={title} />
      
    </div>

  );
};

export default PodcastCard;
