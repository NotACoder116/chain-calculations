import React, { ChangeEvent } from "react";

interface InitialInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

const InitialInput: React.FC<InitialInputProps> = ({ value, onChange }) => {

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? Number(e.target.value) : "";
    onChange(newValue);
  };

  return (
    <div className="mb-6 flex items-center w-11/12">
      <label className="block text-lg w-1/4 font-semibold">Initial Value of x:</label>
      <input
        type="number"
        value={value}
        onChange={handleInput}
        className="border p-2 mt-2 w-full rounded"
      />
    </div>
  );
};

export default InitialInput;
