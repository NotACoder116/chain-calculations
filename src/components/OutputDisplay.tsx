import React from 'react';

interface OutputDisplayProps {
  result: number | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold">Final Output: {(result || result === 0) ? result : '-'}</h2>
  </div>
);

export default OutputDisplay;
