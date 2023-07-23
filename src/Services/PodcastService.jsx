

const baseUrl = 'https://podcast-api.netlify.app';

const fetchPodcasts = async () => {


  try {
    const response = await fetch(`${baseUrl}/shows`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }
};

const fetchPodcastById = async (showId) => {

  try {
    const response = await fetch(`${baseUrl}/id/${showId}`);
    const data = await response.json();

    console.log(data)

    return data;
  } catch (error) {
    console.error(`Error fetching podcast with ID ${showId}:`, error);
    return null;
  }
};

export { fetchPodcasts, fetchPodcastById };
