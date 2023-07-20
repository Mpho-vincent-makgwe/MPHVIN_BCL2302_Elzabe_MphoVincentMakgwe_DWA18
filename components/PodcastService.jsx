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

const fetchPodcastById = async (id) => {
try {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    const data = await response.json();
    return data;
} catch (error) {
    console.error(`Error fetching podcast with ID ${id}:`, error);
    return null;
}
};

export { fetchPodcasts, fetchPodcastById };
