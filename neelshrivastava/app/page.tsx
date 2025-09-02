"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ users: [] });
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/users?')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const findingUsers = (searchInput) => {
    if (!searchInput) return ["Enter a name to search"];
    
    const matches = data.users.filter((user) => 
      user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchInput.toLowerCase())
    );

    return matches.length > 0 
      ? matches.map((user) => `${user.firstName} ${user.lastName}`)
      : ["User Not Found"];
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="text-center">
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleChange}  
          placeholder="Search for a user:"
          className="border p-2 rounded mb-4 w-64"
        />
        <div className="mt-4">
          {findingUsers(inputValue).map((result, index) => (
            <p key={index} className="my-2">{result}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
