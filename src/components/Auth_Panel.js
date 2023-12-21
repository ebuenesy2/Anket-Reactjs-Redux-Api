import React, { useState } from 'react';
import Swal from 'sweetalert2'; //! Alert Kullanımı
import api from '../shared/utils/api'; //! Ortak fonksiyondan veri çekme

function Auth_Panel(props){
    const [ singup, setSingUp] = useState(false); //! Kayıt Olma Paneline gitmek için
    const [ authData, setAuthData] = useState({ name:"",surname:"", email:"", password:"", repassword:"" }); //! Bilgileri tutuyor
    
    //! Bilgileri değiştirme fonksiyonu
    const onChangeFunc = (e) => {   setAuthData({...authData, [e.target.name] : e.target.value})} 

    //! İşlemleri yapan fonksiyon
    const authFunc = (e) => {

       //! Kayıt işlemleri
       if(singup) { 

            //! Api
            const fetchData = async () => {
                try {

                    //! Şifreler uyuşmuyorsa
                    if(authData.password !== authData.repassword) {

                        //! Alert
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Şifreler Uyuşmuyor',
                            showConfirmButton: false,
                            timer: 2000
                        }); //! Alert Son

                    } //! Şifreler uyuşmuyorsa son

                    //! Şifreler uyuşuyorsa
                    else {

                        //! Api'ye gönderilecek veriler
                        const postData={
                            name:authData.name,
                            surname:authData.surname,
                            email: authData.email,
                            password:authData.password,
                            repassword:authData.repassword,
                            img_url:null,
                            departman:null,
                            role:null,
                            created_byId:null,
                        }; //! Api'ye gönderilecek veriler Son

                        //console.log("postData:",postData);
                        
                        const response = await api.post("users/add",postData); //! Api Post Gönderme ve Okuma
                        console.log("response:",response);

                        //! Return
                        if(response.data.status) { 
                               
                            //! Alert
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Kullanıcı Kayıdı Tamamlandı',
                                showConfirmButton: false,
                                timer: 2000
                            }); //! Alert Son
                        
                            setSingUp(false);  //! Giriş Panelini açıyor
                        }
                        else {   console.log("Kayıt Hata");

                            //! Alert
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: response.data.msg,
                                showConfirmButton: false,
                                timer: 2000
                            }); //! Alert Son

                        }


                    } //! Şifreler uyuşuyorsa son

                
                } catch (error) { console.log("error:",error); }
            }  //! Api Son


            fetchData(); //! Fonksiyon Çağırma
        
       }
       //! Kayıt işlemleri son

       //! Giriş işlemleri
       else { 
        
            //! Api
            const fetchData = async () => {
                try {
                    
                    //! Api'ye gönderilecek veriler
                    const postData={
                        email: authData.email,
                        password:authData.password
                    }; //! Api'ye gönderilecek veriler Son

                    //! console.log("postData:",postData);

                    const response = await api.post("users/login",postData); //! Api Post Gönderme ve Okuma
                    //console.log("response:",response);

                    //! Kullanıcı girişi başarılı ise
                    if(response.data.status) { 
                        localStorage.setItem("auth",response.data.token);  //! Local veri tutuyor
                        window.location.href = "/"; //! Anasayfaya yönlendirme yapıyor
                    } //! Kullanıcı girişi başarılı ise Son

                    //! Kullanıcı girişi başarısız ise
                    else {

                        //! Alert
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Giriş Başarısız',
                            showConfirmButton: false,
                            timer: 2000
                        }); //! Alert Son

                    }

                
                } catch (error) { console.log("error:",error); }
            }  //! Api Son
        
        
            fetchData(); //! Fonksiyon Çağırma

       }
       //! Giriş işlemleri Son
       
    }  //! İşlemleri yapan fonksiyon Son
    
   
    return (
        <div className='w-full h-screen  flex items-center justifty-center' style={{backgroundColor:'gray'}}>
           <div className='w-1/3 bg-white p-3 border-3 m-auto'>
               <h1 className='text-2xl text-gray-700 font-bold' style={{ marginBottom:'30px' }}> {singup ? "Kayıt Ol" : "Giriş Yap"} </h1>
               <div className='flex flex-col space-y-3 my-2'>
                  { singup && <input type='text' className='p-3 border-2' value={authData.name} name='name' onChange={onChangeFunc}  placeholder='Adı'  /> }
                  { singup && <input type='text' className='p-3 border-2' value={authData.surname} name='surname' onChange={onChangeFunc}  placeholder='Soyadı'  /> }
               
                  <input type='text' className='p-3 border-2'  value={authData.email} name='email' onChange={onChangeFunc} placeholder='Email'  />
                  <input type='password' className='p-3 border-2' value={authData.password} name='password' onChange={onChangeFunc} placeholder='Şifre Giriniz.'  />
                  { singup && <input type='password' className='p-3 border-2' value={authData.repassword} name='repassword' onChange={onChangeFunc} placeholder='Tekrar Şifre Giriniz.'  /> }
                   
                   <div className='text-red-500 text-xs cursor-pointer mb-4'>
                     {
                        singup ? <span onClick={() => setSingUp(false)} >Kullanıcı varsa, giriş yapınız</span> : <span onClick={() => setSingUp(true)} >Kullanıcı yoksa, kayıt yapınız</span>
                     }
                   </div>

                   <button type="submit" className="cursor-pointer w-full p-2 text-center text-white" onClick={authFunc} style={singup ? { backgroundColor:'brown' } : { backgroundColor:'yellowgreen' }} > {singup ? "Kayıt Ol" : "Giriş Yap"}  </button>
                  
               </div>
           </div>
        </div>
    )
}

export default Auth_Panel;