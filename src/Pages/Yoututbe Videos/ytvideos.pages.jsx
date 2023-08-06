import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ytvideos.styles.scss';

const YouTubeVideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [channelInfo, setChannelInfo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // const apiKey ='AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
                const apiKey = 'AIzaSyDexZ2esi-HVqmUMnZetcwLHV-9cm20z0Y'; //mykey
                // channel_id=UC1hw1wkmrIJGQhh25SS1O5w"
                // const channelId = 'UCSJ4gkVC6NrvII8umztf0Ow'; // YouTube channel ID for "Travel for more living"
                const channelId = 'UC1hw1wkmrIJGQhh25SS1O5w';
                const maxResults = 10; // Number of videos to fetch

                // Fetch channel details
                const channelResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`
                );
                const channelData = channelResponse.data.items[0].snippet;
                setChannelInfo(channelData);

                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`
                );

                const videosData = response.data.items;
                setVideos(videosData);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);


    return (
        <div className="youtube-videos-page">
            <div className="yt-top-section" 
            
            style={{
                background: channelInfo
                  ? `url(${channelInfo.thumbnails.high.url})`
                  : 'url(https://images.unsplash.com/photo-1682685796965-9814afcbff55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
              }}
            
            >
                <h2 className="yt-list-heading">Youtube Videos | {channelInfo?channelInfo.title:"Channel Name"} </h2>
            </div>
            {/* <h2>YouTube Videos - Travel for more living</h2> */}
            <div className="video-list">
                {videos.map((video) => (
                    <div className="video-item" key={video.id.videoId}>

                        {video.id && (
                            <iframe
                                width="100%"
                                height="250px" // Set the desired fixed height for the videos
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                frameborder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            // className='frame'
                            ></iframe>
                        )}
                        {!video.id && (
                            <div className="placeholder-image">
                                <img src="https://i.imgur.com/RtvGnRL.png" alt="Error" />
                            </div>
                        )}
                        <h3>{video.snippet.title}</h3>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default YouTubeVideosPage;
