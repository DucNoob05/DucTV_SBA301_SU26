import { useTheme } from '../../context/ThemeContext';

export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  const { colors } = useTheme();

  const isPrimary = variant === 'primary';

  const buttonStyle = {
    backgroundColor: isPrimary ? colors.primary : 'transparent',
    color: isPrimary ? colors.primaryText : colors.primary,
    border: `1px solid ${colors.primary}`,
    transition: 'all 0.3s ease',
  };

  return (
    <button 
      onClick={onClick} 
      className="btn px-4 py-2 rounded-pill fw-semibold shadow-sm"
      style={buttonStyle}
    >
      {children}
    </button>
  );
}
