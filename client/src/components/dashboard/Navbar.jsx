const Navbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold text-indigo-600">
        Collaborative Space
      </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;