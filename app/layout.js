import "./globals.css";
import { AuthProvider } from "./contexts/authContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider> {/* Wrap everything inside AuthProvider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
