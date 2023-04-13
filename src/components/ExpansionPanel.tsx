import { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineMinusCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
export default function ExpansionPanel ({title, content} : {title: string | null, content: JSX.Element | null}) {
  const [togglePanel, setTogglePanel] = useState(true)
  return (
    <div
      className='border-b-[1px] border-violet-700 mt-[20px] pb-3 cursor-pointer'
      onClick={() => {setTogglePanel(!togglePanel)}}
    >
      <div className='flex justify-between'>
        <h3 className='font-bold text-lg'>{title}</h3>
        {togglePanel ? content ? <AiFillPlusCircle color={'#6D28D9'}/> : <IoMdAddCircleOutline/> : content ?  <AiFillMinusCircle  color={'#6D28D9'}/> : <AiOutlineMinusCircle/>}
      </div>
      <div className={`${togglePanel ? 'hidden' : 'block'} pt-3`}>
        {content}
      </div>
    </div>
  )
}
