const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>

    </div>
  );
};

export default Navbar;