
const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative z-10 container mx-auto px-4">{children}</main>
  );
};

export default MainWrapper;
