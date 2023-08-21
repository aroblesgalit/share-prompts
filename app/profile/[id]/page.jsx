'use client';

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

import Profile from '@components/profile';

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
      desc={`Welcome to ${query.get('name')} personalized profile page`}
      data={posts}
    />
  )
}

export default CreatorProfile;