import React, { useState, useEffect, useCallback } from "react";
import FunctionCard from "./components/FunctionCard";
import InitialInput from "./components/InitialInput";
import OutputDisplay from "./components/OutputDisplay";

// Type definition for equations and results
type Equation = string;
type Results = (number | null)[];

const nextFunctionDetails: string[] = ["2", "4", "-", "5", "4"];

const AtlysParentApp: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number | "">(2); // Starting input value
  const [results, setResults] = useState<Results>(Array(5).fill(null)); // Store results of each function

  // Default equations for each function
  const defaultEquations: Equation[] = ["x^2", "2x+4", "x-2", "x/2", "x^2+20"];
  const [equations, setEquations] = useState<Equation[]>(defaultEquations);

  // Handle equation changes from user input
  const updateEquation = (index: number, newEquation: string): void => {
    const updated = [...equations];
    updated[index] = newEquation;
    setEquations(updated);
  };

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
  }, [initialValue, equations]); // Dependencies of useCallback

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

  const evaluateEquation = (equation: string, x: number | ""): number => {
    if (!isValidEquation(equation)) {
      throw new Error(
        "Invalid equation: Only numbers, x, +, -, *, /, ^, (, ) are allowed."
      );
    }

    try {
      const preprocessed = preprocessEquation(equation);
      return Function("x", `return ${preprocessed}`)(x);
    } catch (error) {
      throw new Error("Invalid equation format");
    }
  };

  const functionCardDetal = (keyIndex: number, equation: any, resultIndex: any, nextFunctionIndex: any) => {
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
        <div className="grid grid-cols-3 gap-6">
          {defaultEquations.slice(0, 3).map((_, index) => (
            functionCardDetal(index, equations[index], results[index], nextFunctionDetails[index])
            // <div key={index} className="relative m-6 z-10">
            //   <FunctionCard
            //     index={index}
            //     equation={equations[index]}
            //     onUpdate={updateEquation}
            //     result={results[index]}
            //     nextFunction={nextFunctionDetails[index]}
            //   />
            // </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 place-items-center mt-10">
          {defaultEquations.slice(3, 5).map((_, index) => (
            functionCardDetal(index + 3, equations[index], results[index], nextFunctionDetails[index])
            // <div key={index + 3} className="relative z-10">
            //   <FunctionCard
            //     index={index + 3}
            //     equation={equations[index + 3]}
            //     onUpdate={updateEquation}
            //     result={results[index + 3]}
            //     nextFunction={nextFunctionDetails[index + 3]}
            //   />
            // </div>
          ))}
        </div>

        {/* SVG Lines for Connections */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <line
            x1="12%"
            y1="25%"
            x2="49%"
            y2="25%"
            stroke="blue"
            strokeWidth="2"
          />
          <line
            x1="55%"
            y1="25%"
            x2="35%"
            y2="63%"
            stroke="blue"
            strokeWidth="2"
          />
          <line
            x1="35%"
            y1="75%"
            x2="70%"
            y2="75%"
            stroke="blue"
            strokeWidth="2"
          />
          <line
            x1="75%"
            y1="60%"
            x2="80%"
            y2="35%"
            stroke="blue"
            strokeWidth="2"
          />
        </svg>
      </div>
      <OutputDisplay result={results[2]} /> {/* Final output from function 3 */}
    </div>
  );
};

export default AtlysParentApp;
