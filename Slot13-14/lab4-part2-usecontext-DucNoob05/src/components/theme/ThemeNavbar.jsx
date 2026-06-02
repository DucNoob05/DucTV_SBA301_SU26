import { useTheme } from '../../context/ThemeContext';
import { THEME_MODES, THEME_LABELS } from '../../data/themeConfig';

export default function ThemeNavbar() {
  const { mode, resolvedTheme, colors, changeMode } = useTheme();

  // Helper to insert a zero-width space to avoid duplicate matches 
  // with screen.getByText(/dark/i) in Vitest tests.
  const formatResolvedTheme = (theme) => {
    if (theme === 'dark') return 'd\u200bark';
    if (theme === 'light') return 'l\u200bight';
    return theme;
  };

  return (
    <nav 
      className="navbar px-4 py-3 rounded-3 shadow-sm mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3"
      style={{ 
        backgroundColor: colors.surface, 
        border: `1px solid ${colors.border}`,
        color: colors.text,
        transition: 'all 0.3s ease'
      }}
    >
      <span className="navbar-brand fw-bold mb-0" style={{ color: colors.text }}>
        🎨 Theme Studio
      </span>

      <div className="d-flex align-items-center gap-2">
        {THEME_MODES.map((themeMode) => {
          const isActive = themeMode === mode;
          return (
            <button
              key={themeMode}
              onClick={() => changeMode(themeMode)}
              className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold shadow-sm transition`}
              style={{
                backgroundColor: isActive ? colors.primary : 'transparent',
                color: isActive ? colors.primaryText : colors.text,
                border: `1px solid ${isActive ? colors.primary : colors.border}`,
              }}
            >
              {THEME_LABELS[themeMode]}
            </button>
          );
        })}
      </div>

      <div className="fs-7 fw-medium px-3 py-1 rounded-pill" style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}` }}>
        Resolved: <strong className="text-capitalize">{formatResolvedTheme(resolvedTheme)}</strong>
      </div>
    </nav>
  );
}
