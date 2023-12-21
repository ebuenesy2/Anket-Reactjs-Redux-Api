
import React from 'react';
import './index.css'; //! Css
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"; //! Router - Sayfalandırma
import Home from './pages/Web/Index'; //! Anasayfa
import Auth from './pages/Web/Auth'; //! Kullanıcı işlemleri
import AuthExit from './pages/Web/AuthExit'; //! Kullanıcı Çıkış İşlemi
import userToken from './hooks/userToken'; //! Kullanıcı girişi kontrol ediyor

import AllSurveys from './pages/Web/AllSurveys'; //! Tüm Anketler
import SurveysView from './pages/Web/SurveysView'; //! Anket Sonucu
import SurveysVote from './pages/Web/SurveysVote'; //! Anket Oy Verme
import SurveysAdd from './pages/Web/SurveysAdd'; //! Anket Oluştur
import SurveysEdit from './pages/Web/SurveysEdit'; //! Anket Güncelle
import About from './pages/Web/About'; //! Hakkımızda
import NotFound from './pages/NotFound'; //! Sayfa Bulunamadı


function App() {

 const [token] = userToken(); //! Kullanıcı Verisi Alıyor

  return (
    <div className="App">
    
      <Router>       
         <Routes>                                                                                                                            
             <Route path="/" element={!token ? <Auth /> : <Home /> }  />   
             <Route path="/auth" element={<Auth />}/>
             <Route path="/auth-exit" element={<AuthExit />}/>
             <Route path="/all-surveys" element={<AllSurveys />}/>
             <Route path="/survey/view/:surveyId" element={<SurveysView />}/>
             <Route path="/surveys/:surveyId/vote" element={<SurveysVote />}/>
             <Route path="/add-surveys" element={<SurveysAdd />}/>
             <Route path="/edit-surveys/:surveyId" element={<SurveysEdit />}/>
             <Route path="/about" element={<About />}/>
             <Route path="*" element={<NotFound />}/>                                     
        </Routes>                                  
      </Router>      
      
   </div>
  );
}

export default App;

