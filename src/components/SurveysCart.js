import React from 'react';
import { MdDeleteForever, MdRemoveRedEye,MdEditSquare } from "react-icons/md"; //! icon

function SurveysCart(props){

    
   
    return (
      <div className='relative  border p-3 rounded-md bg-gray-50'>
        <div className='font-bold text-sm text-slate-500' > {props.title} </div>
        <div className='text-gray-700 text-sm' >{props.time} </div>

        <div className='absolute -top-2 -right-2 flex items-center space-x-3'>

          <MdDeleteForever size={22} onClick={() => { props.deleteButton(); }} className='bg-red-500 rounden-full text-white p-1 cursor-pointer' style={{border: '1px solid red', borderRadius: '30px'}} />
          <MdEditSquare  size={22} onClick={() => { window.location.href="edit-surveys/"+props.id; }} className='bg-blue-500 rounden-full text-white p-1 cursor-pointer' style={{border: '1px solid blue', borderRadius: '30px'}} />
          <MdRemoveRedEye  size={22} onClick={() => { window.location.href="survey/view/"+props.id; }} className='bg-green-500 rounden-full text-white p-1 cursor-pointer' style={{border: '1px solid red', borderRadius: '30px'}} />
        </div>

      </div>
      
    )
}

export default SurveysCart;