import React, { useEffect } from 'react';


function AuthExit(props){
  
    useEffect(() => {

        //! Kullanıcı Girişi Kontrol Ediyor
        const userControl = localStorage.getItem('auth'); //! Localdeki veriyi alıyor
        if(userControl) { localStorage.removeItem("auth"); } //! Localdeki veriyi siliyor 
         
        window.location.href="/auth";
     });
   
    return (
      <div>
          Çıkış Yapma
      </div>
    )
}

export default AuthExit;