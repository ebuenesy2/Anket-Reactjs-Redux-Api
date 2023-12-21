import React from 'react';

function AboutComponents(props){

    return (
      <div>
         
          
           <div className='flex row gap-2 p-3 col-12 col-md-6'  >
              <div className='font-bold text-xl text-slate-500' > Hakkımızda  </div>
              <div className='flex column gap-2' > 
                <div className='font-bold text-xl text-slate-500' > Kodlayan:  </div>
                <div className='font-bold text-xl text-slate-900' > Ebu Enes Yıldırım  </div>
              </div>
              <div className='flex column gap-2' > 
                <div className='font-bold text-xl text-slate-500' > Gmail:  </div>
                <div className='font-bold text-xl text-slate-900' > ebuenesy2@gmail.com  </div>
              </div>
              <div className='flex column gap-2' > 
                <div className='font-bold text-xl text-slate-500' > Tarih:  </div>
                <div className='font-bold text-xl text-slate-900' > 2024 </div>
              </div>
              <div className='flex column gap-2' > 
                <div className='font-bold text-xl text-slate-500' > Tel:  </div>
                <div className='font-bold text-xl text-slate-900' > 0551 032 05 01 </div>
              </div>
            
          </div>

      </div>
    )
}

export default AboutComponents;