import React from 'react';

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
}

export function CometCard({ children, className = "" }: CometCardProps) {
  return (
    <div className={`comet-card ${className}`}>
      {children}
    </div>
  );
}
