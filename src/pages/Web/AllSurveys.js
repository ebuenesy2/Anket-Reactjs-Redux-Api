import React, { useEffect, useState } from 'react';
import api from '../../shared/utils/api'; //! Ortak fonksiyondan veri çekme
import Header from "../../components/Header"; //! Menu Listesi
import SurveysCart from '../../components/SurveysCart'; //! Anket Components 
import {FiCommand} from "react-icons/fi"; //! icon


function AllSurveys(props){

    const [ loading, setLoading] = useState(false); //! Loading
    const [surveyData, setSurveyData] = useState([]); //! Verileri Tutuyor

    useEffect(() => {
      
        //! Api
        const fetchData = async () => {
          try {

            const response = await api.get("survey/all"); //! Apiden Verileri Okuma Yapıyor
            //console.log("response:",response);;

            //! Veriler
            if(response.data.status) { 
              setSurveyData(response?.data.DB?.data.rows); //! Verileri State içine alıyor
              setLoading(true); 
            } //! Veriler Son 
          
          } catch (error) { console.log("error:",error); }
        }  //! Api Son
  
        if(!loading) { fetchData(); } //! Fonksiyon Çağırma
    });


    //! Anket Silme
    const deleteButton = (deleteId) => {

      //! Anket Api Silme
      const deleteApiData = async () => {
        try {

          const response = await api.post("survey/delete/"+deleteId,{}); //! Apiden Verileri Okuma Yapıyor
          //console.log("response:",response);
          if(response.data.status) { setSurveyData( surveyData.filter(a => a.id !== deleteId ) ); } //! Tüm Anket Verileri Güncelliyor
        
        } catch (error) { console.log("error:",error); }
      }  //! Anket Api Silme Son

      deleteApiData(); //! Fonksiyon Çağırma

    } //! Anket Silme Son

    
    return (
      <>
          <Header />
           
          <div className='flex cloumn gap-2 flex-wrap p-3'>
                 
              { !loading &&<FiCommand className='loading-icon'  /> }
              { !loading && <p> Veriler Yükleniyor </p> }
           
              {Array(surveyData.length).fill(0).map((el, i) => 
                 <SurveysCart id={surveyData[i].id} title={surveyData[i].title} time={new Date(surveyData[i].created_at).toLocaleDateString()}  deleteButton = {() => { deleteButton(surveyData[i].id); }}  />
              )} 
             
            
          </div>

          
      </>
    )
}

export default AllSurveys;