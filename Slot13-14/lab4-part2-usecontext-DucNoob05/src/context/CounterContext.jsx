import { createContext, useState, useContext } from 'react';

// TODO 1: Tạo CounterContext bằng createContext()
export const CounterContext = createContext(null);

// TODO 2: Tạo CounterProvider component
export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  );
}

// TODO 3: Tạo custom hook useCounter()
export function useCounter() {
  const context = useContext(CounterContext);
  if (context === undefined || context === null) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}

export default CounterProvider;
