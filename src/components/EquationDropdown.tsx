import React from 'react';

interface EquationDropdownProps {
  nextFunction: string;
}

const EquationDropdown: React.FC<EquationDropdownProps> = ({ nextFunction }) => {
  return (
    <div className="w-full mt-3">
      <h2 className="font-bold">Next function</h2>
      <select
        disabled
        className="
          w-full 
          px-3 
          py-2 
          bg-gray-100 
          text-gray-500 
          rounded 
          border border-gray-300 
          focus:outline-none 
          focus:ring-2 
          focus:ring-gray-200
          cursor-not-allowed
          mt-2">
        <option>Function: {nextFunction}</option>
      </select>
    </div>
  );
};

export default EquationDropdown;
