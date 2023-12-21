import React from 'react';
import AboutComponents from "../../components/AboutComponents"; //! Hakkımızda
import Header from "../../components/Header"; //! Menu Listesi


function About(props){

    return (
      <>
           <Header />
           <AboutComponents />
      </>
    )
}

export default About;