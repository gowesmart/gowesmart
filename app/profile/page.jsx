'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/utils/constants';
import useAuthStore from '@/store/authStore';

export default function Profile() {
  const { currentUser, token, loadingFetching } = useAuthStore(state => ({
    currentUser: state.currentUser,
    token: state.token,
    loadingFetching: state.loadingFetching
  }));

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser && currentUser.username && token) {
        try {
          const { data } = await axios.get(`${baseUrl}/api/users/profile/${currentUser.username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfile(data.payload);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      }
    };

    fetchProfile();
  }, [currentUser, token, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    const updateInput = {
      username: profile.username,
      email: profile.email,
      name: profile.name,
      bio: profile.bio,
      gender: profile.gender,
      age: profile.age
    };
    e.preventDefault();
    try {
      await axios.patch(`${baseUrl}/api/users/profile`, updateInput, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loadingFetching || !profile) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <main className="pt-[80px]">
      <div className="max-w-lg p-8 mx-auto">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-semibold">Profile</h1>
          {isEditing
            ? <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            :
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-secondary rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Edit
            </button>
          }
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-6 mt-6">
            <label className="block mb-2 font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={profile.username || ''}
              onChange={handleChange}
              required
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${isEditing ? 'border border-gray-300 bg-white text-black' : 'border-none bg-transparent pt-0 px-0'
                }`}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              required
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${isEditing ? 'border border-gray-300 bg-white text-black' : 'border-none bg-transparent pt-0 px-0'
                }`}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              required
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${isEditing ? 'border border-gray-300 bg-white text-black' : 'border-none bg-transparent pt-0 px-0'
                }`}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
              required
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${isEditing ? 'border border-gray-300 bg-white text-black' : 'border-none bg-transparent pt-0 px-0'
                }`}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={profile.gender || ''}
              onChange={handleChange}
              required
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${isEditing ? 'border border-gray-300 bg-white text-black' : 'border-none bg-transparent pt-0 px-0'
                }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age || ''}
              onChange={handleChange}
              required
              disabled={!isEditing}
              className={`w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 ${isEditing ? 'border border-gray-300 bg-white text-black' : 'border-none bg-transparent pt-0 px-0'}`}
            />
          </div>
          <div className="flex justify-end">
            {isEditing && (
              <button
                type="submit"
                className="px-4 py-2 text-white bg-secondary rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
