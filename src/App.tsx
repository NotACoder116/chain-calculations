import React, { useState, useEffect, useCallback } from "react";
import ChainingFunctions from "./components/ChainingFunctions";
import FunctionCard from "./components/FunctionCard";
import InitialInput from "./components/InitialInput";
import OutputDisplay from "./components/OutputDisplay";

// Type definition for equations and results
type Equation = string;
type Results = (number | null)[];

const nextFunctionDetails: string[] = ["2", "4", "-", "5", "3"];

const App: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number | "">(2); // Starting input value
  const [results, setResults] = useState<Results>(Array(5).fill(null)); // Store results of each function
  const defaultEquations: Equation[] = ["x^2", "2x+4", "x-2", "x/2", "x^2+20"]; // Default equations
  const [equations, setEquations] = useState<Equation[]>(defaultEquations); // Current all equations

  // Handle equation changes from user input
  const updateEquation = (index: number, newEquation: string): void => {
    const updated = [...equations];
    updated[index] = newEquation;
    setEquations(updated);
  };

  const evaluateEquation = useCallback((equation: string, x: number | ""): number => {
    if (!isValidEquation(equation)) {
      throw new Error(
        "Invalid equation: Only numbers, x, +, -, *, /, ^ are allowed."
      );
    }

    try {
      const preprocessed = preprocessEquation(equation);
      return Function("x", `return ${preprocessed}`)(x);
    } catch (error) {
      throw new Error("Invalid equation format");
    }
  }, []);

  const calculateChain = useCallback(() => {
    try {
      let value = initialValue;
      const newResults: (number | null)[] = [];
      [0, 1, 3, 4, 2].forEach((index) => {
        value = evaluateEquation(equations[index], value);
        newResults[index] = value;
      });

      setResults(newResults);
    } catch (error) {
      console.error("Invalid equation:", error);
    }
  }, [initialValue, equations, evaluateEquation]);

  useEffect(() => {
    calculateChain();
  }, [calculateChain]);

  const isValidEquation = (equation: string): boolean => {
    const validPattern = /^[0-9x+\-*/^()\s]*$/;
    return validPattern.test(equation);
  };

  const preprocessEquation = (equation: string): string => {
    const withMultiplication = equation.replace(/(\d)(x)/g, "$1 * $2");
    const validEquation = withMultiplication.replace(/\^/g, "**");
    return validEquation;
  };

  const functionCardDetal = (keyIndex: number, equation: string, resultIndex: number | null, nextFunctionIndex: string) => {
    return (
      <div key={keyIndex} className="relative m-6 z-10">
        <FunctionCard
          index={keyIndex}
          equation={equation}
          onUpdate={updateEquation}
          result={resultIndex}
          nextFunction={nextFunctionIndex}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 w-full flex items-center flex-col px-64">
      <InitialInput value={initialValue} onChange={setInitialValue} />
      <div className="relative">

        {/* Starting code for showing cards */}
        <div className="grid grid-cols-3 gap-6">
          {defaultEquations.slice(0, 3).map((_, index) => (
            functionCardDetal(index, equations[index], results[index], nextFunctionDetails[index])))}
        </div>

        <div className="grid grid-cols-2 gap-6 place-items-center mt-10">
          {defaultEquations.slice(3, 5).map((_, index) => {
            const keyIndex = index + 3;
            return functionCardDetal(keyIndex, equations[keyIndex], results[keyIndex], nextFunctionDetails[keyIndex])}
          )}
        </div>
        {/* Ending code for showing cards */}

        {/* SVG Lines for Connections */}
        <ChainingFunctions />
      </div>
      <OutputDisplay result={results[2]} /> {/* Final Output */}
    </div>
  );
};

export default App;
