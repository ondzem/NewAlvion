import React from 'react';

interface ReadingTextProps {
  text: string;
  progress: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ReadingText: React.FC<ReadingTextProps> = ({ text, progress, className = "", style }) => {
  // Rozdělíme text na jednotlivé znaky včetně mezer
  const chars = text.split('');
  
  return (
    <div className={className} style={style}>
      {chars.map((char, index) => {
        // Vypočítáme progress pro každý znak - pomalejší přechod
        const charProgress = Math.max(0, Math.min(1, (progress * chars.length * 1.2) - index));
        
        // Interpolace barvy mezi světle šedou a černou - plynulejší přechod
        const grayValue = Math.round(160 - (charProgress * 160)); // Od 160 (světle šedá) do 0 (černá)
        
        const color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        
        return (
          <span
            key={index}
            style={{
              color,
              transition: 'color 0.2s ease-out',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};