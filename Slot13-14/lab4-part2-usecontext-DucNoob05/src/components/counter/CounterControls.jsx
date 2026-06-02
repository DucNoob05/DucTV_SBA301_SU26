import { useCounter } from '../../context/CounterContext';

export default function CounterControls() {
  const { increment, decrement, reset } = useCounter();

  return (
    <div className="d-flex justify-content-center gap-3 my-3">
      <button 
        onClick={decrement} 
        className="btn btn-outline-danger btn-lg px-4 rounded-pill shadow-sm"
      >
        −
      </button>
      <button 
        onClick={reset} 
        className="btn btn-outline-secondary btn-lg px-4 rounded-pill shadow-sm"
      >
        Reset
      </button>
      <button 
        onClick={increment} 
        className="btn btn-outline-success btn-lg px-4 rounded-pill shadow-sm"
      >
        +
      </button>
    </div>
  );
}
