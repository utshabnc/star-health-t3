import { useState } from "react";

const options = [{ name: "Doctors" }, { name: "Manufacturers" }];

function SearchBar() {
  const [inputText, setInputText] = useState("Search Doctors/Companies");
  const inputHandler = (e: { target: { value: string } }) => {
    //convert input text to lower case
    const text = e.target.value;
    setInputText(text);
  };

  return (
    <>
      <div className="flex h-10 flex-row">
        <input
          type="text"
          onChange={inputHandler}
          className="text-md block w-full rounded-md border-gray-300 pl-3 pr-3 focus:border-purple-400 focus:ring-purple-400"
          placeholder={inputText}
        />
        <button
          type="button"
          onClick={undefined}
          className="flex rounded bg-purple-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default SearchBar;
