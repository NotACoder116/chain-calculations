import React, { useState, ChangeEvent } from 'react';
import EquationDropdown from './EquationDropdown';

interface FunctionCardProps {
  index: number; // Index of the function card
  equation: string; // The equation displayed in the input field
  onUpdate: (index: number, newEquation: string) => void; // Function to handle updates
  result: number | null; // Result of the function (can be null initially)
  nextFunction: string; // The next function to display in the dropdown
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  index,
  equation,
  onUpdate,
  result,
  nextFunction
}) => {
  const [input, setInput] = useState<string>(equation);
  const [error, setError] = useState<string>(''); 

  const isValidEquation = (equation: string): boolean => {
    const validPattern = /^[0-9x+\-*/^\s]*$/; // Allow only valid characters
    return validPattern.test(equation);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    if (isValidEquation(value)) {
      setError('');
      setInput(value);
      onUpdate(index, value);
    } else {
      setError('Invalid input! Only numbers, x, +, -, *, /, ^, (, ) are allowed.');
    }
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-lg">
      <h2 className="font-bold">Function {index + 1}</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="border p-2 w-full mt-2 rounded"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <EquationDropdown nextFunction={nextFunction} />
      <div className="text-gray-600 mt-2">Result: {result}</div>
    </div>
  );
};

export default FunctionCard;