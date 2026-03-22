// pages/_app.js
import '../styles/globals.css';
import { Toaster, useToaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function ToasterWithTheme() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: isDark ? '#181828' : '#FFFFFF',
          color:      isDark ? '#EDE8DF' : '#1A1410',
          border:     '1px solid rgba(255,107,0,0.3)',
          fontFamily: 'DM Sans, sans-serif',
          fontSize:   '0.9rem',
          boxShadow:  isDark
            ? '0 8px 32px rgba(0,0,0,0.5)'
            : '0 8px 32px rgba(0,0,0,0.12)',
        },
        success: { iconTheme: { primary: '#FF6B00', secondary: isDark ? '#080810' : '#FAF7F2' } },
        error:   { iconTheme: { primary: '#ff5555', secondary: isDark ? '#080810' : '#FAF7F2' } },
      }}
    />
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ToasterWithTheme />
    </ThemeProvider>
  );
}
