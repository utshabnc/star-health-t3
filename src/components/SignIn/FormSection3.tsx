import type { InputProps } from "../FormComponents/InputFieldProps.model";


const Section3 : React.FC<InputProps> = ({ register, errors}) => {

    return (
    <>
        <div className="w-full md:w-1/2 px-3">
            <div className="col">
                <label htmlFor="grid-linkedin" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    LinkedIn
                </label>
                <input
                    {...register("linkedin")}
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-linkedin"
                />
                {errors.linkedin && (
                    <p className="text-red-500 pb-2 text-small">{`${errors.linkedin.message}`}</p>
                )}
            </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
            <div className="col">
                <label htmlFor="grid-twitter" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Twitter
                </label>
                <input
                    {...register("twitter")}
                    type="text"
                    name="twitter"
                    placeholder="Twitter"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-twitter"
                />
                {errors.twitter && (
                    <p className="text-red-500 pb-2 text-small">{`${errors.twitter.message}`}</p>
                )}
            </div>
        </div>

        <div className="w-full md:w-1/2 px-3">
            <div className="col">
                <label htmlFor="grid-educational-background" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Educational Background
                </label>
                <textarea
                    {...register("educationalBackground")}
                    name="educationalBackground"
                    placeholder="Educational Background"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-32 resize-none"
                    id="grid-educational-background"
                ></textarea>
                {errors.educationalBackground && (
                    <p className="text-red-500 pb-2 text-small">{`${errors.educationalBackground.message}`}</p>
                )}
            </div>
        </div>
        
        <div className="w-full md:w-1/2 px-3">
            <div className="col">
                <label htmlFor="grid-comments" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Comments
                </label>
                <textarea
                    {...register("comments")}
                    name="comments"
                    placeholder="Comments"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-32 resize-none"
                    id="grid-comments"
                ></textarea>
                {errors.comments && (
                    <p className="text-red-500 pb-2 text-small">{`${errors.comments.message}`}</p>
                )}
            </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
            <div className="col">
                <label htmlFor="grid-medical-history" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Medical History
                </label>
                <textarea
                    {...register("medicalHistory")}
                    name="medicalHistory"
                    placeholder="Medical History"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-indigo-500/75 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-32 resize-none"
                    id="grid-medical-history"
                ></textarea>
                {errors.medicalHistory && (
                    <p className="text-red-500 pb-2 text-small">{`${errors.medicalHistory.message}`}</p>
                )}
            </div>
        </div>
    </>
    )
}

export default Section3;