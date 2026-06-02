import { useTheme } from '../../context/ThemeContext';

export default function ThemedCard({ title, children }) {
  const { colors } = useTheme();

  return (
    <div 
      className="card shadow-sm mb-4 border-1 rounded-3 overflow-hidden transition"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        color: colors.text,
        transition: 'all 0.3s ease'
      }}
    >
      {title && (
        <div 
          className="card-header fw-bold py-3"
          style={{ 
            backgroundColor: colors.background, 
            borderBottom: `1px solid ${colors.border}`,
            color: colors.text 
          }}
        >
          {title}
        </div>
      )}
      <div className="card-body p-4">
        {children}
      </div>
    </div>
  );
}
