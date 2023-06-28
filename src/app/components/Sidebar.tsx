export default function SideBar({
  showSidebar,
  closeSidebar,
}: {
  showSidebar: boolean;
  closeSidebar: <HTMLButtonElement>() => void;
}) {
  return (
    <nav
      className={`fixed -left-28 top-0 overflow-hidden z-10 bg-blue-500 min-h-screen pl-10 pr-10 pt-10 border-t-2 border-r-2 border-l-0 border-b-2 rounded-r-3xl ease-in-out duration-300
      ${showSidebar ? "translate-x-full" : ""}`}
    >
      <div className="flex items-center justify-center mb-6">
        <button onClick={closeSidebar}>
          <div className="absolute left-0 flex items-center justify-center mb-6 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-black cursor-pointer pb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </button>
      </div>
      <ul className="relative m-0 list-none text-black">
        <li className="p-2 font-medium ">Home</li>
        <li className="p-2 font-medium">Modifier</li>
        <li className="p-2 font-medium">Modifier</li>
        <li className="p-2 font-medium">Modifier</li>
        <li className="p-2 font-medium">Modifier</li>
        <li className="p-2 font-medium">Modifier</li>
        <li className="p-2 font-medium">Modifier</li>
        <li className="p-2 font-medium">Modifier</li>
      </ul>
    </nav>
  );
}
