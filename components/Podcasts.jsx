import { useEffect, useState } from 'react';
import { fetchPodcasts, fetchPodcastById } from './PodcastService';
import '../styles/Podcasts.css'
import Login from './LoginAndRegister';
import Preview from './Previews';

const Podcast = () => {
    const [formData, setFotmData] = useState(true);


useEffect(() => {
    // Check if the user is already logged in
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
        setFotmData(true);
    }
}, []);

const handleLoginAndRegister = () => {
    setFotmData(true)
}

return (
<div>
    {formData ? 
    (<Preview
        />)
    : (
    <Login onLogin={handleLoginAndRegister} />
    )}
</div>
);
};

export default Podcast;
