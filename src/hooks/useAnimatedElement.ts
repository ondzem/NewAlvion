import { useState, useEffect } from 'react';

interface UseAnimatedElementProps {
  animationClass: string;
  delayClass?: string;
}

export const useAnimatedElement = ({ animationClass, delayClass }: UseAnimatedElementProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    className: isVisible ? `${animationClass} ${delayClass || ''}` : 'opacity-0',
    style: {}
  };
};