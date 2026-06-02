import { useCounter } from '../../context/CounterContext';

export default function CounterDisplay() {
  const { count } = useCounter();

  return (
    <div className="card text-center my-3 shadow-sm border-0 bg-light">
      <div className="card-body">
        <h5 className="card-title text-muted mb-3 uppercase tracking-wider text-xs">Current Count</h5>
        <h1 className="display-1 fw-bold text-primary mb-0">{count}</h1>
      </div>
    </div>
  );
}
