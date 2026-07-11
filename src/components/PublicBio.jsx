import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPublicProfile, trackLinkClick } from '../services/api.js';

// Icons (Inline SVG)
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2m7 9v-2m-4 0h8M12 4a3 3 0 00-3 3v4a3 3 0 006 0V7a3 3 0 00-3-3z" />
  </svg>
);

const PlatformIcon = ({ platform }) => {
  switch (platform?.toLowerCase()) {
    case 'applemusic':
    case 'apple music':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.305 13.79c-.19.344-.606.49-1.026.34-2.618-1.025-5.59-1.282-7.85-1.01-.482.043-.88-.236-1.004-.614-.125-.38.163-.75.645-.8 2.502-.276 5.795.034 8.675 1.157.42.164.63.567.56.927zm1.182-2.923c-.22.42-.727.65-1.21.5-2.983-1.055-6.643-1.425-9.426-.893-.574.122-1.082-.243-1.21-.77-.128-.528.263-1.01.836-1.124 3.12-.61 7.23-.21 10.59.95.48.164.71.696.42 1.337zm.116-3.136c-3.64-1.39-8.472-1.636-11.455-1.006-.704.145-1.36-.33-1.503-1.03-.143-.7.318-1.34 1.02-1.485 3.51-.745 8.94-.482 13.08 1.135.68.267 1.01.996.74 1.666-.27.67-1.005.99-1.882.72z" />
        </svg>
      );
    case 'soundcloud':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.815 14.654h-1.014v-6.945l1.014.269v6.676zm-2.025 0H8.77v-5.63l1.02.482v5.148zm-1.895 0H6.883V9.754l1.012.632v4.268zm-1.745 0H5.138v-3.2l1.012.766v2.434zm8.685 0h-1.01v-8.232l1.01-.2v8.432zm2.015 0h-1.01v-8.68l1.01-.237v8.917zm2.027 0h-1.01V6l1.01-.482v9.136zm2.025 0h-1.012v-9.584l1.012-.63v10.214zm1.96-1.564c1.173 0 2.13-.96 2.13-2.14 0-1.182-.957-2.14-2.13-2.14-.15 0-.295.016-.437.045-.375-1.994-2.115-3.504-4.23-3.504-1.602 0-2.996.887-3.692 2.185l.18.06V14.66h8.18v-1.57z" />
        </svg>
      );
    case 'tidal':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L8 6l4 4 4-4-4-4zm0 8l-4 4 4 4 4-4-4-4zM8 10l-4 4 4 4 4-4-4-4zm8 0l-4 4 4 4 4-4-4-4zm-8 8l-4 4 4 4 4-4-4-4zm8 0l-4 4 4 4 4-4-4-4z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
  }
};

const PublicBio = ({ username: propUsername }) => {
  const navigate = useNavigate();
  const { username: paramUsername } = useParams();
  const username = propUsername || paramUsername;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setError('Username not provided');
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await fetchPublicProfile(username);
        setData(res);
      } catch (err) {
        setError(err.message || 'Profile not found');
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [username]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLinkClick = (e, url, linkId) => {
    e.preventDefault();
    if (linkId) {
      trackLinkClick(linkId);
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-800 border-t-green-400 rounded-full animate-spin shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
        <p className="mt-4 text-green-400 font-medium tracking-widest text-sm animate-pulse">LOADING...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
        <p className="text-slate-400 mb-6">{error || 'Artist profile could not be located in our database.'}</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-bold transition-colors">
          Go Home
        </button>
      </div>
    );
  }

  const user = data?.user || {};
  const links = data?.links || [];

  const displayName = user.name || user.username || 'Unknown Artist';
  const location = user.country || 'Worldwide';
  const bio = user.bio || 'Musician';
  const avatarUrl = user.avatar_url || 'https://images.unsplash.com/photo-1502701198424-6ab0ebc25433?auto=format&fit=crop&q=80&w=200';

  const ytLink = links.find(l => l.platform?.toLowerCase() === 'youtube');
  const spotifyLink = links.find(l => l.platform?.toLowerCase() === 'spotify');
  const otherLinks = links.filter(l => {
    const p = l.platform?.toLowerCase();
    return p !== 'youtube' && p !== 'spotify';
  });

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans text-white overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/15 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-emerald-400/5 blur-[100px] rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_2px_rgba(74,222,128,0.8)] opacity-70 animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_12px_3px_rgba(192,132,252,0.8)] opacity-60 animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-emerald-300 rounded-full shadow-[0_0_8px_2px_rgba(110,231,183,0.9)] opacity-80 animate-pulse" style={{ animationDuration: '2s' }}></div>
      </div>

      {/* Header Gradient */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-green-500/20 via-purple-600/10 to-transparent z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto w-full px-4 pt-6 pb-12 min-h-screen">
        
        {/* Top Bar */}
        <div className="w-full flex justify-start mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-semibold transition-all backdrop-blur-md"
          >
            <ChevronLeftIcon />
            BACK
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8 w-full">
          <div className="relative mb-5">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-md opacity-75"></div>
            <img 
              src={avatarUrl} 
              alt={displayName} 
              className="relative w-28 h-28 object-cover rounded-full border-2 border-slate-900 shadow-2xl"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1502701198424-6ab0ebc25433?auto=format&fit=crop&q=80&w=200'; }}
            />
          </div>

          <h1 className="text-3xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 text-center">
            {displayName}
          </h1>
          
          <div className="flex flex-col items-center gap-1.5 text-slate-300 text-sm font-medium text-center">
            <div className="flex items-center gap-1.5">
              <MapPinIcon />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <MicIcon />
              <span>{bio}</span>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full flex flex-col gap-5">
          
          {/* YouTube Widget */}
          {ytLink && (
            <div className="w-full rounded-2xl overflow-hidden border border-red-500/30 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]">
              <div className="flex justify-between items-center px-4 py-3 border-b border-red-500/20 bg-red-500/10">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#ef4444">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-xs font-bold tracking-wider text-red-400">YOUTUBE</span>
                </div>
                <button 
                  onClick={(e) => handleLinkClick(e, ytLink.url, ytLink.id)}
                  className="text-xs font-semibold text-white/70 hover:text-white transition-colors"
                >
                  OPEN APP ↗
                </button>
              </div>
              <div className="p-3" onClick={() => trackLinkClick(ytLink.id)}>
                <p className="text-sm font-semibold mb-3 px-1 truncate">{ytLink.title}</p>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <iframe 
                    src={ytLink.url?.includes('watch?v=') ? ytLink.url.replace('watch?v=', 'embed/') : ytLink.url}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* Other Platform Pills (Horizontal Flow) */}
          {otherLinks.length > 0 && (
            <div className="flex flex-wrap w-full gap-3 justify-between mt-2">
              {otherLinks.map(item => {
                let colorClass = 'hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-400';
                if (item.platform?.toLowerCase() === 'applemusic') colorClass = 'hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-rose-400';
                if (item.platform?.toLowerCase() === 'soundcloud') colorClass = 'hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-400';
                if (item.platform?.toLowerCase() === 'tidal') colorClass = 'hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400';
                
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    onClick={(e) => handleLinkClick(e, item.url, item.id)}
                    className={`flex-auto min-w-[30%] flex flex-col items-center justify-center gap-2 py-4 px-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 ${colorClass} group`}
                  >
                    <div className="text-slate-300 group-hover:scale-110 transition-transform duration-300">
                      <PlatformIcon platform={item.platform} />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide text-slate-400 group-hover:text-inherit truncate w-full text-center px-1">
                      {item.platform ? item.platform.toUpperCase() : 'LINK'}
                    </span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Spotify Mini Embed */}
          {spotifyLink && (
            <div className="w-full mt-2 rounded-2xl overflow-hidden border border-green-500/30 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(34,197,94,0.15)]" onClick={() => trackLinkClick(spotifyLink.id)}>
              <div className="flex justify-between items-center px-4 py-2 border-b border-green-500/20 bg-green-500/10">
                <span className="text-xs font-bold tracking-wider text-green-400">SPOTIFY</span>
                <button onClick={(e) => handleLinkClick(e, spotifyLink.url, spotifyLink.id)} className="text-xs font-semibold text-white/70 hover:text-white transition-colors">
                  OPEN APP ↗
                </button>
              </div>
              <iframe 
                  src={spotifyLink.url?.includes('track/') && !spotifyLink.url?.includes('embed') ? spotifyLink.url.replace('track/', 'embed/track/') : spotifyLink.url}
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="w-full mt-1"
                ></iframe>
            </div>
          )}

          {links.length === 0 && (
            <div className="w-full text-center py-8 text-slate-500 text-sm">
              No links available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicBio;
