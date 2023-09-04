import GoogleSignInButton from "./GoogleSignIn";
import EmailSignInButton from "./EmailSignIn";

const SignInFlow = () => { 
  return (
    <div className="absolute top-0left-0 w-full h-full backdrop-blur-sm flex justify-center items-start">
      {/* Sign in block */}
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 shadow-lg rounded-lg border p-">
        <div className="flex items-center place-items-center justify-center">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center px-24">
          <div>
            <h1 className="text-4xl text-center mb-16">
              Join <span className="text-purple-500">S</span>tarhealth
            </h1>
            <div className="m-8">
              <GoogleSignInButton />
            </div>
            <div className="m-8">
              <EmailSignInButton />
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <div className="text-center">
              Already have an account?{" "}
              <a href="/signin" className="text-purple-500 text-center">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Sign in block */}
    </div>
  );
};

export default SignInFlow;
