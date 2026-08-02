export default function Section({ children, className = "" }) {
  return (
    <section className={`py-8 md:py-12 ${className}`}>
      {children}
    </section>
  );
}