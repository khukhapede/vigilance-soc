export const chartColors = {
    // Backgrounds
    surface: '#16202e',
    input: '#121c2a',

    // Text
    textPrimary: '#d9e3f7',
    textSecondary: '#bdc9c5',

    // Grid / axis lines
    border: '#3e4946',

    // Accent (used for primary series, e.g. Total Alerts line)
    accent: '#008170',
    accentBright: '#75d8c4',

    // Severity
    critical: '#f85149',
    high: '#ff8c42',
    medium: '#e3b341',
    info: '#58a6ff',
};

// Convenience array for the Severity Distribution donut, in the same
// order as the legend: Critical, High, Medium, Info
export const severityColors = [
    chartColors.critical,
    chartColors.high,
    chartColors.medium,
    chartColors.info,
];