import { signIn } from "next-auth/react";

interface EmailSignInButtonProps{
  onClick: () => void;
}
const EmailSignInButton : React.FC<EmailSignInButtonProps> = ({onClick}) => {


  return (

    <>
      <button
      onClick={() => onClick()}
      className="flex items-center justify-center  text-dark border-solid border-2 border-dark-500 rounded-md py-2 px-4 md:py-3 md:px-6 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope h-6 w-6 md:h-8 md:w-8 mr-2" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
        <span className="hidden md:block">Sign Up with Email</span>
      </button>
    </>
  );
}; 

export default EmailSignInButton;
