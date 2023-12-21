import React, { useEffect,useState } from 'react';
import { useParams } from "react-router-dom"; //! Router
import api from '../../shared/utils/api'; //! Ortak fonksiyondan veri çekme
import {FiCommand,FiCheckCircle} from "react-icons/fi"; //! icon
import Header from "../../components/Header"; //! Menu Listesi

function SurveysVote(props){

    const { surveyId } = useParams(); //! Url Veri Alma
    const [ loading, setLoading] = useState(false); //! Loading
    const [ checkLoading, setcheckLoading] = useState(false); //! Loading Check
   
    const [surveyName, setSurveyName] = useState(''); //! Anket Başlık Verisi
    const [surveyData, setSurveyData] = useState([]); //! Anket Sonuçları
    const [surveyVoteId, setSurveyVoteId] = useState(0); //! Kullanılan Anket Seçeneği
  
    useEffect(() => {
      
        //! Api
        const fetchData = async () => {
            try {

              const response = await api.get("survey/find/detail/"+surveyId); //! Apiden Verileri Okuma Yapıyor
              //console.log("response:",response);
              
              //! Veriler
              if(response.data.status) { 
                //console.log("veri okundu");
                setLoading(true); 

                setSurveyName(response?.data.surveyTitle); //! Anket Başlık Verileri
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

        //! Fonksiyon Çağırma
        if(!loading) { fetchData(); } //! Fonksiyon Çağırma
    
    });

    //! Anket Oy Kullanımı
    const surveyVoteAdd = async (survey_id,options_id) => {
      try {

        //! Api'ye gönderilecek veriler
        const postData={
          survey_id:survey_id,
          options_id:options_id,
          voter_token:localStorage.getItem('auth'),
        }; //! Api'ye gönderilecek veriler Son

        //console.log("postData:",postData);

        //! Api
        const responseVoter = await api.post("survey/voter/add/token",postData); //! Api Post Gönderme
        console.log("responseVoter:",responseVoter);

        if(responseVoter?.data.status) {
          setcheckLoading(true); //! Loading True
          setSurveyVoteId(options_id); //! Oy seçenek id
        }


        
         
      } catch (error) { console.log("error:",error); }
        
    }  
    //! Anket Oy Kullanımı Son
   
    return (
      <div>
          <Header />

          <div className='flex column gap-2 p-2 justifty-center' style={!loading ? {display:''} : {display:'none'} } >
            <FiCommand className='loading-icon'  />
            <p className='font-bold text-sm text-slate-500' > Veriler Yükleniyor </p>
          </div>

          <div className='flex column gap-2 p-3 col-12 col-md-6'  style={!loading ? {display:'none'} : {display:''} } >
             <div className='font-bold text-xl text-slate-500'> Ankete Oy Ver  </div>
             <div style={{ margin:"auto"}} > <div className='font-bold text-sm cursor-pointer' onClick={() => { window.location.href="/survey/view/"+surveyId; }} >Anket Sonuçları</div> </div>
             <button className='btn btn-info' onClick={() => {  window.location.href="/edit-surveys/"+surveyId; }} > Anketi Düzenle </button>
          </div>
          <div className='flex row gap-3 p-3' style={checkLoading ? {display:'none'} : {display:''} } >
             <div className='font-bold col-12' > {surveyName} </div>
             <div className='flex row gap-1 col-12 col-sm-6'>

              {Array(surveyData.length).fill(0).map((el, i) => 
                 <div className='flex column gap-2' style={{ color:'white' }} >  
                   <div className='col-12 cursor-pointer font-bold text-xl p-2 border-2'  style={ surveyVoteId === surveyData[i].surveyOptionsId ? { backgroundColor:'green'} : { backgroundColor:'gray'}  }  onClick={() => { surveyVoteAdd(surveyData[i].surveyId,surveyData[i].surveyOptionsId); } } >{surveyData[i].surveyOptionsTitle}</div>
                 </div>
               )}
             </div>

          </div>

          <div className='flex column gap-2 p-3'  style={checkLoading ? {display:''} : {display:'none'} } >
              <FiCheckCircle  size={'45'} color={'green'}  />
              <p className='font-bold text-xl mt-auto mb-auto'>Anket oylaması için çok teşekkür ederim.. </p>
          </div>

          <div className='flex row gap-2 p-3'  style={checkLoading ? {display:''} : {display:'none'} } >
            <div style={{ margin:"auto"}} >
               <div className='font-bold text-xl text-slate-500 cursor-pointer ' onClick={() => { window.location.href="/survey/view/"+surveyId; }} >Anket Sonuçları Görmek için Tıklayınız </div> 
            </div>
          </div>

          

      </div>
    )
}

export default SurveysVote;