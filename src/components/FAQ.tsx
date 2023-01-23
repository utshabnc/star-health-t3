import {useState} from 'react'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {AiOutlineMinusCircle, AiFillMinusCircle, AiFillPlusCircle} from 'react-icons/ai'
export default function FAQ ({title, content} : {title: string | null, content: string | null}) {
  const [toggleDropdown, setToggleDropdown] = useState(true)
  return (
   
    <div className='border-b-[1px] border-violet-700 mt-[20px] pb-3 cursor-pointer' onClick={() => {setToggleDropdown(!toggleDropdown)}}>
    <div className='flex justify-between'>
      <h3 className='font-bold text-lg'>{title}</h3>
      {toggleDropdown ? content ? <AiFillPlusCircle color={'#6D28D9'}/> : <IoMdAddCircleOutline/> : content ?  <AiFillMinusCircle  color={'#6D28D9'}/> : <AiOutlineMinusCircle/>}
    </div>
    <p className={`${toggleDropdown ? 'hidden' : 'block'} pt-3`}>{content}</p>
    
    </div>
  )
}