export default function SideBar({
  showSidebar,
  closeSidebar,
  chooseOptions,
}: {
  showSidebar: boolean;
  closeSidebar: <HTMLButtonElement>() => void;
  chooseOptions: (option: string) => void;
}): JSX.Element {
  const options = ["Black & White", "Blur", "Stabalize", "Reverse", "Vignette"];
  return (
    <nav
      className={`fixed -left-28 top-0 overflow-hidden z-10 bg-blue-500 min-h-screen pr-10 pt-10 border-t-2 border-r-2 border-l-0 border-b-2 rounded-r-3xl ease-in-out duration-300
      ${showSidebar ? "translate-x-full" : ""}`}
    >
      <div className="flex  mb-6">
        <button onClick={closeSidebar}>
          <div className="absolute left-2 flex text-xl mb-6 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-14 text-black cursor-pointer pb-2"
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
      <ul className="relative m-0 pt-8 list-none text-black">
        {options.map((item) => {
          return (
            <li className="p-2 font-medium" key={item}>
              <button
                data-item={item}
                className="cursor-pointer"
                onClick={(e) => {
                  chooseOptions(e.currentTarget.dataset.item || "");
                }}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
