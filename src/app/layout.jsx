import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers> 
        <Toaster position="top-right" />
      </body>
    </html>
  );
}