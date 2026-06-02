import { useTheme } from '../../context/ThemeContext';

export default function ThemedInput({ placeholder }) {
  const { colors } = useTheme();

  return (
    <input 
      type="text"
      placeholder={placeholder} 
      className="form-control form-control-lg rounded-3 fs-6 transition"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        color: colors.text,
        transition: 'all 0.3s ease'
      }}
    />
  );
}
