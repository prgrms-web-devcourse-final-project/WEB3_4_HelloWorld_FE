export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className=" px-[5vw] md:px-0 mx-auto w-full max-w-screen-2xl">
      {children}
    </section>
  );
}
