import { useFormContext } from '../../context/FormContext';

export default function FormField({ name, label, type = 'text', placeholder }) {
  const { state, dispatch } = useFormContext();

  const value = state.values[name] || '';
  const error = state.errors[name] || '';
  const touched = state.touched[name] || false;

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE', field: name, value: e.target.value });
  };

  const handleBlur = () => {
    dispatch({ type: 'BLUR', field: name });
  };

  // Determine Bootstrap classes based on validation state
  const inputClass = `form-control form-control-lg rounded-3 fs-6 ${
    touched ? (error ? 'is-invalid' : 'is-valid') : ''
  }`;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold text-muted text-xs uppercase mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && error && (
        <div className="invalid-feedback text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
