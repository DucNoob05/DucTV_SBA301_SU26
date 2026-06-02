import { useCounter } from '../../context/CounterContext';

export default function StatusMessage() {
  const { count } = useCounter();

  let message = 'Bằng 0';
  let badgeColor = 'bg-secondary';

  if (count > 0) {
    message = 'Dương';
    badgeColor = 'bg-success';
  } else if (count < 0) {
    message = 'Âm';
    badgeColor = 'bg-danger';
  }

  return (
    <div className="text-center my-3">
      <span className={`badge ${badgeColor} fs-5 px-3 py-2 rounded-pill shadow-sm`}>
        Trạng thái: {message}
      </span>
    </div>
  );
}
