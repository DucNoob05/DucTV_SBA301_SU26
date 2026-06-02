import CounterProvider from '../context/CounterContext';
import CounterDisplay from '../components/counter/CounterDisplay';
import CounterControls from '../components/counter/CounterControls';
import StatusMessage from '../components/counter/StatusMessage';

export default function Ex01CounterPage() {
  return (
    <CounterProvider>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-gradient bg-primary text-white text-center py-4">
                <h2 className="mb-0 fw-bold fs-4">Context Counter</h2>
                <p className="mb-0 text-white-50 small">Exercise 1: Shared Counter State via React Context</p>
              </div>
              <div className="card-body p-4 bg-white">
                <CounterDisplay />
                <CounterControls />
                <StatusMessage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CounterProvider>
  );
}
