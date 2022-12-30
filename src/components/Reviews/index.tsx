import Image from "next/image";
import { useState } from "react";
import ReactStars from "react-star-rating-component";
import type { DoctorResponse } from "../../server/trpc/router/db";

interface Review {
  // user: string;
  rating: number;
  text: string;
  createdAt: Date;
}

type Props = {
  reviews: DoctorResponse["reviews"];
};
const Reviews = ({ reviews }: Props) => {
  return (
    <>
      <div className=" flex h-full flex-col py-4 px-8">
        <div
          style={{ height: "500px" }}
          className="overflow-auto rounded-md p-2 shadow-md"
        >
          {reviews?.map((data) => (
            <div
              key={data.id}
              className="ring-purp-3 my-4 mx-1 justify-center rounded-lg bg-white px-3 py-2 ring-2"
            >
              <>
                {/* <div className='flex flex-row'>
                  <label>User: </label>
                  <p>&nbsp;{data.user}</p>
                </div> */}

                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 rounded-full border border-gray-200">
                    <Image
                      className="h-8 w-8 rounded-full object-cover"
                      src={data.user?.image || "/images/user.png"}
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-5 text-gray-900">
                      {data.user?.name || "Anonymous"}
                    </span>
                    <p className="text-sm">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row">
                  <ReactStars
                    name="rating"
                    editing={false}
                    value={data.rating}
                    starCount={5}
                    starColor='#ffd700'
                  />
                </div>

                <div className="flex flex-col">
                  <p>{data.text}</p>
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
