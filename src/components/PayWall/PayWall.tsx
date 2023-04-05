import { signIn, useSession } from "next-auth/react";
import React from "react";

export const PayWall = () => {
  const session = useSession();

  if (session?.data?.user) {
    return (<div className="absolute bottom-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center">
      {/* Sign in block */}
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 shadow-lg rounded-lg border">
        <div className="flex items-center">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sign In to Access</h3>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={() => signIn("google")} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            <span className="absolute right-0 inset-y-0 flex items-center pr-3">
              <svg className="h-6 w-6 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </div>
      {/* Sign in block */}
    </div>);
  }
  return <></>
};
