import React, { useState } from 'react';
import api from '../../shared/utils/api'; //! Ortak fonksiyondan veri çekme
import {FiX,FiCheckCircle} from "react-icons/fi"; //! icon
import Header from '../../components/Header'; //! Menu Listesi


function SurveysAdd(props){

    const [ status, setStatus] = useState(false); //! Durum
    const [ newSurvey, setNewSurvey ] = useState(''); //! Anket Adı
    const onChangeSurveyFunc = (e) => { setNewSurvey(e.target.value);  }  //! Yeni Seçenek Kontrol

    const [ surveyOptions,setSurveyOptions ] = useState([]); //! Anket Seçenekleri
    const [ newSurveyOptions, setNewSurveyOptions ] = useState(''); //! Yeni Seçenek Verisi
    const onChangeFunc = (e) => { setNewSurveyOptions(e.target.value);  }  //! Yeni Seçenek Kontrol

    const [ Disabled, setDisabled ] = useState(true); //! [ true -> pasif ] [ false -> aktif ]
     
    //! Yeni Veri Ekle
    const surveyOptionsAdd = (item) => {
        setSurveyOptions([...surveyOptions,newSurveyOptions]); //! Verileri Ekleme
        setNewSurveyOptions(''); //! Seçenek Temizle

        surveyOptions.length > 0 ? setDisabled(false) : setDisabled(true); //! Disabled Seçim yapıyor
    } //! Yeni Veri Ekle Son

    //! Veri Silme
    const surveyOptionsDelete = (deleteId) => { 
        surveyOptions.splice(deleteId,1); //! Siliniyor
        setSurveyOptions([...surveyOptions] ); //! Güncelleniyor
        surveyOptions.length > 1 ? setDisabled(false) : setDisabled(true); //! Disabled Seçim yapıyor
    } //! Veri Silme Son

    //! Anket Oluştur
    const surveyAdd = (item) => {
      
        //! Anket Ekle
        const fetchData = async () => {
            try {
                
                //! Api'ye gönderilecek veriler
                const postData={
                    title: newSurvey,
                    optionsData: surveyOptions,
                    created_byToken:localStorage.getItem('auth')
                }; //! Api'ye gönderilecek veriler Son

                //console.log("postData:",postData);

                const response = await api.post("survey/add/options",postData); //! Api Post Gönderme ve Okuma
                //console.log("response:",response);
               
                if(response.data.status) { 
                    setStatus(true); 

                    setNewSurvey(''); //! Anket Adı Temizliyor
                    setSurveyOptions([]); //! Seçenekler Temizliyor
                    setDisabled(true); //! Button Pasif

                } //! Durum 
              
              
               
               
            } catch (error) { console.log("error:",error); }
        }  //! Anket Ekle Son
    
    
        fetchData(); //! Fonksiyon Çağırma

    } //! Anket Oluştur Son
   
    return (
      <>
        <Header />

        <div className='flex row  gap-2 p-3 '  >
            <div className='font-bold text-xl text-slate-500' color={'red'} size={'10'}  style={status ? {display:'none'} : {display:''} } > Anket Oluştur  </div>

            <div className='flex row gap-3'>
            
            <div className='flex row gap-2' style={status ? {display:'none'} : {display:'', margin:"auto"} } >
                <input type='text' placeholder='Soru' className='border p-3 roundend-lg '  value={newSurvey} onChange={onChangeSurveyFunc} />
            </div>

            <div className='flex column gap-2' style={status ? {display:'none'} : {display:''} } >
                <input type='text' placeholder='Seçenek' className='border p-3 roundend-lg col-8' value={newSurveyOptions} onChange={onChangeFunc} />
                <button type="button"  className="cursor-pointer w-100"  onClick={()=> { surveyOptionsAdd(); }}   style={{ backgroundColor:"green",color:"white", border:"1px solid", borderRadius:"12px" }} > Seçenek Ekle  </button>
            </div>

            <div className='flex row gap-2' style={status ? {display:'none'} : {display:'', margin:"auto"} } >
                <div className='font-bold text-xl text-slate-500' style={{ margin:"auto" }} > Seçenekler </div>

                {Array(surveyOptions.length).fill(0).map((el, i) => 
                    <div className='flex column col-12 border-1' style={{ margin:"auto" }}>
                        <div className='font-bold text-xl text-slate-500 col-8'> {surveyOptions[i]} </div>
                        <FiX className='col-4 cursor-pointer' size={'25'} color={'red'}  onClick={() => { surveyOptionsDelete(i); }} />
                    </div>
                )} 
                
            </div>

            <div className='flex column gap-2' style={status ? {display:'none'} : {display:''} }   >
                <button type="button"  className="w-100"  disabled={Disabled} onClick={()=> { surveyAdd(); }}   style={Disabled ? { backgroundColor:"gray",color:"white", border:"1px solid", borderRadius:"12px",height:"45px",cursor:'no-drop' } : { backgroundColor:"green",color:"white", border:"1px solid", borderRadius:"12px",height:"45px", cursor:'pointer' } } > Anket Oluştur   </button>
            </div>

            <div className='flex row gap-2 p-3'  style={status ? {display:''} : {display:'none'} } >
                
                <div className='flex column gap-2 p-3'>
                    <FiCheckCircle  size={'45'} color={'green'}  />
                    <p className='font-bold text-xl mt-auto mb-auto'> Anket Oluşturuldu  </p>
                </div>

                <div className='flex column gap-2 p-3'>
                    <button className='btn btn-success' onClick={() => { setStatus(false);  }} > Yeni Anket Oluştur </button>
                    <button className='btn btn-info' onClick={() => {  window.location.href="all-surveys"; }} > Tüm Anketler </button>
                </div>

            </div>

            </div>
        </div>

      </>
    )
}

export default SurveysAdd;