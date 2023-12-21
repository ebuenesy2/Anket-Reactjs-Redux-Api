import React from 'react';
import { useParams } from "react-router-dom"; //! Router
import Header from "../../components/Header"; //! Menu Listesi
import SurveysViewCart from "../../components/SurveysViewCart"; //! Anket Sonuç Components

function SurveysView(props){

    const { surveyId } = useParams(); //! Url Veri Alma
    
    return (
      <div>
          <Header />
          
          <div className='flex column gap-2 p-3 col-12 col-md-6'  >
             <div className='font-bold text-xl text-slate-500' > Anket Sonuçları  </div>
             <div style={{ margin:"auto"}} > <div className='font-bold text-sm cursor-pointer' onClick={() => { window.location.href="/surveys/"+ surveyId+"/vote" }} >Ankete Oy Ver</div> </div>
             <button className='btn btn-info' onClick={() => {  window.location.href="/edit-surveys/"+surveyId; }} > Anketi Düzenle </button>
          </div>

          <SurveysViewCart surveyId={surveyId} />
          
      </div>
    )
}

export default SurveysView;