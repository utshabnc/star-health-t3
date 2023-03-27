import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  AiOutlineMinusCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
export default function FAQ({
  title,
  content,
}: {
  title: string | null;
  content: string | null;
}) {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <div
      className="mt-[20px] cursor-pointer border-b-[1px] border-violet-700 pb-3"
      onClick={() => {
        setToggleDropdown(!toggleDropdown);
      }}
    >
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        {toggleDropdown ? (
          content ? (
            <AiFillPlusCircle color={"#6D28D9"} />
          ) : (
            <IoMdAddCircleOutline />
          )
        ) : content ? (
          <AiFillMinusCircle color={"#6D28D9"} />
        ) : (
          <AiOutlineMinusCircle />
        )}
      </div>
      <p className={`${toggleDropdown ? "hidden" : "block"} pt-3`}>{content}</p>
    </div>
  );
}
