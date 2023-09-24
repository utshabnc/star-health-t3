import { signIn } from "next-auth/react";

interface Props {
  phrase : string;
  classNameProp : string
}

const GoogleSignInButton = ({ phrase, classNameProp } : Props) => {
  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <button
    onClick={handleGoogleSignIn}
    className={`${classNameProp} flex items-center justify-center bg-blue-600 text-white rounded-md py-2 px-4 md:py-3 md:px-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="currentColor"
      className="bi bi-google h-6 w-6 md:h-8 md:w-8 mr-2 "
      viewBox="0 0 16 16"
    >
    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
    </svg>
    <span className="hidden md:block ">{phrase}</span>
  </button>
  );
};

export default GoogleSignInButton;