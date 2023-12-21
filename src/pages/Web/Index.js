import React from "react";
import AboutComponents from "../../components/AboutComponents"; //! Hakkımızda
import Header from "../../components/Header"; //! Menu Listesi

const App = () => {

  return (
    <>
      
      <Header/>
      
      <div className="flex row gap-2 p-3 font-bold text-xl" style={{ color:"blue" }} > Tüm Linkler </div>
      
      <ul className="flex row gap-2 p-3">
         <li> <a  className="font-bold text-xl mt-auto mb-auto"  href="all-surveys" >Tüm Anketleri Gör</a> </li>
         <li> <a  className="font-bold text-xl mt-auto mb-auto"  href="add-surveys" >Yeni Anket Oluştur</a> </li>
      </ul>

      <AboutComponents />

    </>
  );
};

export default App;
