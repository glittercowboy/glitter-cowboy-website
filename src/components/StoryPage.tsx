import React from 'react';

const StoryPage: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Content container */}
      <div className="relative h-full w-full z-10">
        {/* Story Content */}
        <div className="absolute inset-0 flex flex-col items-center">
          {/* Content Container */}
          <div className="w-full h-full pt-52 px-8 pb-36 overflow-y-auto">
            <div className="max-w-3xl mx-auto text-[#2D1B00]">
              <div className="prose prose-lg">
                <p className="font-['EB_Garamond'] text-xl leading-relaxed mb-8 tracking-wide">
                  GLITTER COWBOY was founded in 2017 by TÂCHES as a testament to creative independence and 
                  artistic authenticity. Established with a desire to break free from industry constraints, 
                  the label merges electronic and organic elements, pushing the boundaries of contemporary music.
                </p>
                
                <p className="font-['EB_Garamond'] text-xl leading-relaxed mb-8 tracking-wide">
                  At its core, GLITTER COWBOY is driven by a philosophy rooted in self-awareness, optimism, 
                  and the pursuit of inner peace through artistic expression. This vision is deeply intertwined 
                  with a connection to nature, creativity, and the simplicity of living—values reflected not only 
                  in our sound but in everything we do.
                </p>

                <p className="font-['EB_Garamond'] text-xl leading-relaxed mb-8 tracking-wide">
                  The label's journey began with the inaugural release, To Move Mountains, in September 2017. Since 
                  then, GLITTER COWBOY has grown into a platform where artists are empowered to explore their creativity 
                  without limits, blending genres like deep house, melodic techno, and organic textures to craft music 
                  that tells rich, emotive stories.
                </p>

                <p className="font-['EB_Garamond'] text-xl leading-relaxed tracking-wide">
                  More than just a record label, GLITTER COWBOY represents a movement toward authentic expression and 
                  creative freedom, where art, nature, and individuality unite to form something truly original.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(200)].map((_, index) => (
          <div
            key={index}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + (index % 3 === 0 ? 2 : 0.5)}px`,
              height: `${Math.random() * 2 + (index % 3 === 0 ? 2 : 0.5)}px`,
              opacity: Math.random() * 0.2 + (index % 4 === 0 ? 0.3 : 0.1),
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
