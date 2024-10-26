import React from 'react';

interface OutputDisplayProps {
  result: number | null; // The result can be a number or null initially
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => (
  <div className="mt-6">
    <h2 className="text-2xl font-bold">Final Output: {result || '-'}</h2>
  </div>
);

export default OutputDisplay;
