import { useSession } from "next-auth/react";
import React, {FormEvent, useState} from "react";
import { useEffect } from "react";
import GoogleSignInButton from "./GoogleSignIn";
import EmailSignInButton from "./EmailSignIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSectionA from "./FormSection1";
import FormSectionB from "./FormSection2";
import FormSectionC from "./FormSection3";
import { FieldValues } from "react-hook-form"




import { z } from 'zod'





const signUpSchema = z.object({
  firstName : z.string().min(1,"First Name is required"),
  lastName: z.string().min(1,"Last Name is required"),
  email: z.string().email().min(1,"Email is required"),
  dob: z.string().min(1,"Date of Birth is required"),
  contactNumber: z.string().min(1,"Contact Number is required"),
  address: z.string().min(1,"Address is required"),
  profession: z.string().min(1,"Profession is required"),
  company: z.string().optional(),
  specialization: z.string().min(1, "Specialization is required"),
  licenseNumber: z.string().min(1, "Licence Number is required"),
  insuranceInformation: z.string().min(1, "Insurance Information is required"),
  gender: z.string(),
  medicalHistory: z.string().optional(),
  educationalBackground: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  comments: z.string().optional(),
  hashedPassword: z.string().min(8, "Passwords must be at least 8 characters")
})


type ValidationSchema = z.infer<typeof signUpSchema>




export const SignIn = () => {
  const {data : session, status , update} = useSession();
  const [showEmailSignUp, setShowEmailSignUp] = useState<boolean>(false);
  const [isEmailSent , setIsEmailSent] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [emailSignIn, setEmailSignIn] = useState<Record<string , string>>({
    verifyEmail : ''
  })
  const {
    register , 
    watch,
    handleSubmit, 
    getValues, 
    trigger,
    formState : { errors }, 
    reset
  } = useForm({
    resolver : zodResolver(signUpSchema),
    mode : "onSubmit"
  })




  const onSubmit =  (data : FieldValues) => {
    alert('success!')
    console.log(data)
  
    /*try{
      const response = await fetch("/api/update-auth/update-user-field",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          userId :  session?.data?.user?.id,
          formData : formData
        })
      })
      if(!response.ok){
        console.log("Registration couldn't be completed sucessfully")
      }
      else {
        setFormSubmited(true)
      }
    }
    catch(error) {
      setError(error)
    }*/
  }



  useEffect(() => {
    setProgress((activeSection + 2) * 25)
  }, [activeSection])

  useEffect(() => {
    console.log(errors)
  }, [errors])


  const handleEmailSignUp = () => {
    setShowEmailSignUp(true)
  }
 
  const handlePrevious = (e : FormEvent) => {
    if (activeSection === 0) {
      return;
    }
    setActiveSection((prev) => prev - 1);
  }


   // Email Verification
   const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setEmailSignIn({
        ...emailSignIn,
        [e.target.name] : e.target.value
      })
   }

   /*const handleEmailSubmitForm = (e : FormEvent) => {
    e.preventDefault()
    signIn("email", { 
      email: emailSignIn.verifyEmail, 
      redirect: false, // Prevent the default redirection

    })
    setIsEmailSent(true)
  }*/


  

  const handleNext = async (e : FormEvent) => {
    e.preventDefault()
    const fieldKeys = Object.keys(getValues())
    console.log(fieldKeys)
    const isValid = await trigger(fieldKeys)

      if(isValid){
        setActiveSection((prev) => prev + 1)
      }
    }



 
    return (

      <>
      {(session?.user && !session?.user?.isRegistered && !showEmailSignUp) || (!session?.user && !showEmailSignUp) || showEmailSignUp ? (
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-start">
      {/* Sign in block */}
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 shadow-lg rounded-lg border">
        <div className="flex items-center place-items-center justify-center">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
    
        {session?.user && !session?.user?.isRegistered && !showEmailSignUp &&(<>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left py-12">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sign In to Access</h3>
          </div>
    
          <div className="">
            <ol className="flex items-center p-4 text-sm font-medium text-center justify-center text-white-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base white:bg-gray-800 white:border-gray-700">
              {activeSection === 0 && (
                <li className="flex items-center justify-center text-purple-600 dark:text-purple-500 text-center">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-purple-600 rounded-full shrink-0 dark:border-purple-500">
                    1
                  </span>
                  Personal <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                  <svg className="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                  </svg>
                </li>
              )}
              {activeSection === 1 && (
                <li className="flex items-center justify-center text-purple-600 dark:text-purple-500 text-center">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-purple-500 rounded-full shrink-0 dark:border-purple-400">
                    2
                  </span>
                  Profession <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                  <svg className="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                  </svg>
                </li>
              )}
              {activeSection === 2 && (
                <li className="flex items-center justify-center text-purple-600 dark:text-purple-500 text-center">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-purple-500 rounded-full shrink-0 dark:border-purple-400">
                    3
                  </span>
                  Additional Info
                </li>
              )}
            </ol>
            <div className="w-full bg-gray-200 rounded-full dark:bg-white-700">
              <div className="bg-purple-600 text-xs font-medium text-blue-100 text-center p-0.1 leading-none rounded-full" style={{ width: `${progress}%` }}>{progress}%</div>
            </div> 
          </div>
    
          <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3 mb-6 p-8">
              {activeSection === 0 && <FormSectionA  register={register} errors={errors}/>}
              {activeSection === 1 && <FormSectionB  register={register} errors={errors}/>}
              {activeSection === 2 && <FormSectionC  register={register} errors={errors}/>}
            </div> 
            <div className="mt-2 flex items-center justify-center gap-4">
              {activeSection !== 0 && (
                <button onClick={handlePrevious} type="button" className="group relative w-5/12 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-6 w-6 text-purple-500 group-hover:text-purple-400 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                    </svg>
                  </span>
                  Previous
                </button>
              )}
              {activeSection !== 2 && (
                <button onClick={handleNext}  type="button" className="group relative w-5/12 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out">
                  <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                    <svg className="h-6 w-6 text-purple-500 group-hover:text-purple-400 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </span>
                 Next
                </button>
              )}
              {activeSection === 2 && (
                <button type="submit" className="group relative w-5/12 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out">
                  <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                    <svg className="h-6 w-6 text-purple-500 group-hover:text-purple-400 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Submit
                </button>
              )}
            </div>

          </form>
        </>)}
        {!session?.user && !showEmailSignUp && (
          <>
            <div className="mt-2 flex items-center justify-center px-24">
              <div>
                <h1 className="text-4xl text-center mb-16">
                  Join <span className="text-purple-500">S</span>tarhealth
                </h1>
                <div className="m-8">
                  <GoogleSignInButton />
                </div>
                <div className="m-8">
                  <EmailSignInButton onClick={handleEmailSignUp} />
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
          </>
        )}
        {showEmailSignUp && (
          <>
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-start">
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
                  {!isEmailSent ? (
                    <>
                      <h1 className="text-center text-3xl mb-16">Create an Account</h1>
        
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="col">
                            <label htmlFor="email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Enter Email</label>
                            <input
                                type="email"
                                name="verifyEmail"
                                placeholder="Email Address"
                                value={emailSignIn.verifyEmail}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className=" mt-16 mb-16 group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out">
                          {/* Submit button */}
                          <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                            <svg className="h-6 w-6 text-purple-500 group-hover:text-purple-400 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
        
                          Continue
                        </button>
                      </form>
                    </>
                  ) : (
                    <div>
                      <h1 className="text-center text-3xl mb-16">Verify your Email</h1>
        
                      <p className="text-1xl">
                        We sent an email to {emailSignIn.verifyEmail}<br />
                        Click the link inside to get started.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Sign in block */}
          </div>
        </>)}
      </div>
    </div>
    ) : null}   
    </>   
    );  
};
