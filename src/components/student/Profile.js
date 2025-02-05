import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    skills: '',
    achievements: '',
    resumeUrl: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/student/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/student/profile', profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="profile">
      <h2>Update Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Skills</label>
          <textarea
            value={profile.skills}
            onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          />
        </div>
        <div>
          <label>Achievements</label>
          <textarea
            value={profile.achievements}
            onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
          />
        </div>
        <div>
          <label>Resume URL</label>
          <input
            type="text"
            value={profile.resumeUrl}
            onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
