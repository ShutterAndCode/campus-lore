export default function PageWrapper({ children, className = "" }) {
  return (
    <main className={`min-h-screen bg-background py-8 ${className}`}>
      {children}
    </main>
  );
}