import React, { useEffect,useState } from 'react';
import api from '../shared/utils/api'; //! Ortak fonksiyondan veri çekme
import {FiCommand} from "react-icons/fi"; //! icon


function SurveysViewCart(props){

    const [ loading, setLoading] = useState(false); //! Loading
    const [surveyName, setSurveyName] = useState(''); //! Anket Başlık Verisi
    const [surveyVoteCount, setSurveyVoteCount] = useState(0); //! Anket Katılım Sayısı
    const [surveyData, setSurveyData] = useState([]); //! Anket Sonuçları
  
    useEffect(() => {
      
      //! Api
      const fetchData = async () => {
         try {

            const response = await api.get("survey/find/detail/"+props.surveyId); //! Apiden Verileri Okuma Yapıyor
            //console.log("response:",response);

            //! Veriler
            if(response.data.status) { 
               //console.log("veri okundu");
               setLoading(true); 

               setSurveyName(response?.data.surveyTitle); //! Anket Başlık Verileri
               setSurveyVoteCount(response?.data.voteTotal); //! Anket Toplam Oy Sayısı
               setSurveyData(response?.data.DB?.data.rows); //! Verileri State içine alıyor

            } 
            else {
               //console.log("Veri Bulunamadı");
               setLoading(true); 

               setSurveyName("Veri Bulunamadı"); //! Anket Başlık Verileri
            }
            //! Veriler Son 
           
            
         
         } catch (error) { console.log("error:",error); }
      }  //! Api Son
 
      if(!loading) { fetchData(); } //! Fonksiyon Çağırma
      
    });
   
    return (
      <>
         
         <div className='flex column gap-2 p-2 justifty-center' style={!loading ? {display:''} : {display:'none'} } >
            <FiCommand className='loading-icon'  />
            <p className='font-bold text-sm text-slate-500' > Veriler Yükleniyor </p>
          </div>

          <div className='flex row gap-3 p-3' style={!loading ? {display:'none'} : {display:''} } >

             <div className='font-bold col-12' > {surveyName} </div>

             <div className='flex row gap-1 col-12 col-md-6'>

              {Array(surveyData.length).fill(0).map((el, i) => 
                 <div className='flex column gap-2' >  
                    <div style={{ width:'50px', color:'#447538', fontWeight:'bold', textAlign:'right' }} >%{ Number(surveyData[i].percentage).toFixed(2) }</div>
                    <div style={{ position:'relative',width:'100%', display:'flex' }} >
                        <div style={{ position:'absolute', marginLeft:'5px',fontWeight:'bold'}}>{surveyData[i].surveyOptionsTitle}</div>
                        <div style={{ background:'chartreuse', width:surveyData[i].percentage+'%' }}></div>
                    </div>
                    <div style={{ width:'50px', color:'#447538', fontWeight:'bold', textAlign:'right' }} > {surveyData[i].cnt} </div>
                 </div>
               )}
                 
              
             </div>

          </div>
          <div className='flex column gap-2 p-3 '  style={!loading ? {display:'none'} : {display:''} } >
            <p className='font-bold text-sm text-slate-500' >Ankete Katılım: {surveyVoteCount} </p>
          </div>
      </>
    )
}

export default SurveysViewCart;