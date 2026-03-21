const axios = require('axios');
const db = require('../config/db');
require('dotenv').config();

exports.getYouTubeSuggestions = async (req, res) => {
  const { doubtId } = req.params;

  try {
    // 1. Get doubt details for search query
    const doubtResult = await db.query('SELECT * FROM doubts WHERE id = $1', [doubtId]);
    if (doubtResult.rows.length === 0) return res.status(404).json({ message: 'Doubt not found' });
    
    const { subject, topic, title } = doubtResult.rows[0];
    const searchQuery = `${subject} ${topic} ${title} educational`;

    // 2. Call YouTube Data API
    const ytResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults: 3,
        key: process.env.YOUTUBE_API_KEY
      }
    });

    const videos = ytResponse.data.items.map(v => ({
      title: v.snippet.title,
      id: v.id.videoId,
      thumbnail: v.snippet.thumbnails.default.url
    }));

    // 3. Save to database if not exists
    for (const v of videos) {
      await db.query(
        'INSERT INTO video_suggestions (doubt_id, video_title, video_url, video_thumbnail) VALUES ($1, $2, $3, $4)',
        [doubtId, v.title, `https://www.youtube.com/watch?v=${v.id}`, v.thumbnail]
      );
    }

    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
