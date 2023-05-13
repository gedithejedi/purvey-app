
export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <main className="min-h-screen px-4 py-2">
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default PrimaryLayout;