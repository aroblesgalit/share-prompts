'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
} 

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handleSearchChange = (e) => {
    let newSearchText = e.target.value;
    setSearchText(newSearchText);
    
    let newFilteredPosts = posts.filter(post => 
      post.prompt.includes(newSearchText.toLowerCase().trim())
      || post.tag.includes(newSearchText.toLowerCase().trim())
      || post.creator.username.includes(newSearchText.toLowerCase().trim())
    );
    setFiltered(newFilteredPosts);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      console.log(data)
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={searchText ? filtered : posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed