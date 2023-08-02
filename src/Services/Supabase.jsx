import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';



const supabaseUrl = 'https://msdfhytbhsyosabmwjhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZGZoeXRiaHN5b3NhYm13amhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3ODkwNjcsImV4cCI6MjAwNjM2NTA2N30.1pJ6tZqwmChTLHy0FXXVu0wvZwwcl1A-VkHRyHdJIAI';


export const supabase = createClient(supabaseUrl, supabaseKey);



const useAuthentication = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    // Check if a user is already authenticated when the component mounts
    const session = supabase.auth.user;
    setUser(session?.user || null);
    setLoading(false);
    
    // Set up an event listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
        setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
        setUser(null);
        }
    });
    
    // Clean up the event listener when the component unmounts
    return () => {
        authListener.unsubscribe;
    };
    }, []);
    
    const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });
    if (user) {
        // User successfully signed in
        // Save user details in local storage
        localStorage.setItem('user', JSON.stringify(user));
      }
    
    if (error) {
        console.error('Error signing in:', error);
        return false;
    }
    
    setUser(user);
    return true;
    };
    
    const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });
    
    if (error) {
        console.error('Error signing up:', error);
        return false;
    }
    
    setUser(user);
    return true;
    };
    
    const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    };
    
    return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    };
    };
    
    export default useAuthentication;