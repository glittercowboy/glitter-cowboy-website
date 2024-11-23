import React from 'react';
import OptimizedImage from './OptimizedImage';

interface Artist {
  name: string;
  image: string;
  bio: string;
}

const artists: Artist[] = [
  {
    name: "TÂCHES",
    image: "/artists/taches.jpg",
    bio: "TÂCHES is a producer and DJ known for creating deep, emotive electronic music that blends organic and synthetic elements. With releases on labels like All Day I Dream and Sol Selectas, TÂCHES crafts sonic landscapes that transport listeners to dreamy, ethereal spaces."
  },
  {
    name: "JACKSON ENGLUND",
    image: "/artists/jackson-englund.jpg",
    bio: "Jackson Englund is an electronic music producer and multi-instrumentalist whose sound bridges the gap between organic house and melodic techno. His productions feature intricate sound design and emotionally charged arrangements that create immersive musical experiences."
  },
  {
    name: "EVAN HATFIELD",
    image: "/artists/evan-hatfield.jpg",
    bio: "EVAN HATFIELD creates captivating electronic music that seamlessly blends melodic elements with driving rhythms. His unique approach to production combines innovative sound design with emotive arrangements, resulting in tracks that resonate deeply with listeners."
  }
];

const ArtistsPage: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-full w-full">
        <div className="w-full h-full pt-52 px-8 pb-36 overflow-y-auto" style={{
          maskImage: 'linear-gradient(to top, white 72%, transparent 84%)',
          WebkitMaskImage: 'linear-gradient(to top, white 72%, transparent 84%)'
        }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {artists.map((artist, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                >
                  <div className="w-full aspect-square mb-4 overflow-hidden bg-[#2D1B00]/5">
                    <OptimizedImage
                      src={artist.image}
                      alt={artist.name}
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl text-[#2D1B00] tracking-[0.2em] mb-2 font-['Ocotillo'] uppercase">
                    {artist.name}
                  </h3>
                  <p className="text-[#2D1B00] text-sm leading-relaxed tracking-wider text-center">
                    {artist.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
