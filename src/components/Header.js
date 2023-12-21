import React, { useState } from 'react';
import { Link } from 'react-router-dom'; //! Sayfa Yönlendirme
import { FiList,FiX} from "react-icons/fi"; //! icon

function Header(props) {

    const [ mobileView , setMobileView] = useState(false);
   
    return (
      <header className='shadow-md' style={ mobileView ? { backgroundColor:'lavenderblush'  } : { backgroundColor:'moccasin'  }  }>
        <div className='flex items-center p-6' style={{  justifyContent:"space-between"}} >
          
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap gap-1'  style={ mobileView ? { display:"none"  } : { display:""  }  }>
              <span className='text-slate-500'>Anket</span>
              <span className='text-slate-700'>Uygulaması</span>
            </h1>

            <ul className='flex gap-4 ' style={{ flexDirection:"row"}} >
              <Link to='/all-surveys' > <li className={mobileView ? 'text-slate-700 hover:underline cursor-pointer' : 'hidden sm:inline text-slate-700 hover:underline cursor-pointer' } >Tüm Anketler</li></Link>
              <Link to='/add-surveys' > <li  className={mobileView ? 'text-slate-700 hover:underline cursor-pointer' : 'hidden sm:inline text-slate-700 hover:underline cursor-pointer' } >Yeni Anket</li> </Link>
              <Link to='/about' ><li className={mobileView ? 'text-slate-700 hover:underline cursor-pointer' : 'hidden sm:inline text-slate-700 hover:underline cursor-pointer' } >Hakkımızda</li> </Link>
              <Link to='/auth-exit' ><li className={mobileView ? 'text-slate-700 hover:underline cursor-pointer' : 'hidden sm:inline text-slate-700 hover:underline cursor-pointer' } >Çıkış Yap</li> </Link>
                
              <li> 
                { mobileView  && <FiX className=' inline sm:hidden cursor-pointer max-w-5xl text-2xl btn-danger ' onClick={() => { setMobileView(false); }}  />  } 
                { !mobileView && <FiList className='inline sm:hidden cursor-pointer max-w-5xl text-2xl' onClick={() => { setMobileView(true); }} />  } 
              </li>
             
            </ul>

        </div>
         
      </header>
    )
}

export default Header;