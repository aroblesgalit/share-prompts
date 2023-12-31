'use client';

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

import Profile from '@components/Profile';

const CreatorProfile = () => {
  const query = useSearchParams();
  const params = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <Profile
      name={query.get('name')}
      desc={`Welcome to ${query.get('name')}'s personalized profile page. Explore ${query.get('name')}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  )
}

export default CreatorProfile;