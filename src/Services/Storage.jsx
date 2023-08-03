import {useState, useEffect} from 'react'



export const useLocalStorageState = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : defaultValue;
    const [value, setValue] = useState(initial);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  };
