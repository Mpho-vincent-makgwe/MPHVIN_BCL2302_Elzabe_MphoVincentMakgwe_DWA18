const fetchPodcasts = async () => {
try {
    const response = await fetch('https://podcast-api.netlify.app/shows');
    const data = await response.json();
    return data;
} catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
}
};

const fetchPodcastById = async ({ show }) => {
try {
    const response = await fetch('https://podcast-api.netlify.app/shows');
    const data = await response.json();
    const podcast = data.map((podcast) => podcast.id);

    return podcast;
} catch (error) {
    console.error(`Error fetching podcast with ID ${show.id}:`, error);
    return null;
}
};




export { fetchPodcasts, fetchPodcastById };
