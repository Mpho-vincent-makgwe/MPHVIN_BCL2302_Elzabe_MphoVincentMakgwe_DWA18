import {useState, useEffect, useCallback} from 'react'
// import supabase from './Supabase'



 export const useLocalStorageState = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : defaultValue;
    const [value, setValue] = useState(initial);
  
    const updateLocalStorage = useCallback(
        (newValue) => {
          localStorage.setItem(key, JSON.stringify(newValue));
        },
        [key]
      );
    
      useEffect(() => {
        updateLocalStorage(value);
      }, [value, updateLocalStorage]);
      
    return [value, setValue];
  };