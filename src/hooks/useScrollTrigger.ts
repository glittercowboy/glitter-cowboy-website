import { useState, useEffect } from 'react';

const useScrollTrigger = (triggerPercentage: number = 25) => {
  const [triggered, setTriggered] = useState(false);
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasBeenTriggered) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = (scrolled / scrollHeight) * 100;

      if (scrollPercentage >= triggerPercentage) {
        setTriggered(true);
        setHasBeenTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerPercentage, hasBeenTriggered]);

  return triggered;
};

export default useScrollTrigger;
