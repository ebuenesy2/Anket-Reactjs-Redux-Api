import React, { useEffect , useState } from 'react';
import { useParams } from "react-router-dom"; //! Router
import api from '../../shared/utils/api'; //! Ortak fonksiyondan veri çekme
import {FiX} from "react-icons/fi"; //! icon
import Header from "../../components/Header"; //! Menu Listesi
import Swal from 'sweetalert2'; //! Alert Kullanımı


function SurveysEdit(props){
  
    const { surveyId } = useParams(); //! Url Veri Alma
    const [ loading, setLoading] = useState(false); //! Loading
    const [ newSurvey, setNewSurvey ] = useState(''); //! Anket Adı
    const onChangeSurveyFunc = (e) => { setNewSurvey(e.target.value);  }  //! Yeni Seçenek Kontrol

    const [ surveyOptions,setSurveyOptions ] = useState([]); //! Anket Seçenekleri
    const [ newSurveyOptions, setNewSurveyOptions ] = useState(''); //! Yeni Seçenek Verisi
    const onChangeFunc = (e) => { setNewSurveyOptions(e.target.value);  }  //! Yeni Seçenek Kontrol

    //! Başlangıç
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

                setNewSurvey(response?.data.surveyTitle); //! Anket Başlık Verileri
                setSurveyOptions(response?.data.DB?.data.rows); //! Verileri State içine alıyor
            } 
            else {
                //console.log("Veri Bulunamadı");
                setLoading(false); 
                setNewSurvey("Veri Bulunamadı"); //! Anket Başlık Verileri
            }
            //! Veriler Son 

         } catch (error) { console.log("error:",error); }
      }  //! Api Son
 
      if(!loading) { fetchData(); } //! Fonksiyon Çağırma
 
    }); //! Başlangıç Son

    //! Anket Güncelle
    const surveyEdit = (item) => {
      
        //! Anket Ekle
        const fetchData = async () => {
            try {
                
                //! Api'ye gönderilecek veriler
                const postData={
                    id: Number(surveyId),
                    title: newSurvey,
                    updated_byToken:localStorage.getItem('auth')
                }; //! Api'ye gönderilecek veriler Son

                //console.log("postData:",postData);

                const response = await api.post("survey/edit/token",postData); //! Api Post Gönderme ve Okuma
                //console.log("response:",response);

                //! Durum Başarılı
                if(response.data.status) { 

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'İşleminiz Başarılı',
                        showConfirmButton: false,
                        timer: 2000
                    });

                } //! Durum Başarılı Son

                //! Durum Hatalı
                else {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'İşleminiz Hatalı',
                        showConfirmButton: false,
                        timer: 2000
                      });

                } //! Durum Hatalı Son
            
            } catch (error) { console.log("error:",error); }
        }  //! Anket Ekle Son
    
        fetchData(); //! Fonksiyon Çağırma

    } //! Anket Güncelle Son

    //! Yeni Veri Ekle
    const surveyOptionsAdd = (item) => {
        
        //! İşlem
        const fetchData = async () => {
            try {

                //! Api'ye gönderilecek veriler
                const postData={
                    survey_id: Number(surveyId),
                    title: newSurveyOptions,
                    created_byToken:localStorage.getItem('auth')
                }; //! Api'ye gönderilecek veriler Son

                //console.log("postData:",postData);

                const response = await api.post("survey/options/add/token",postData); //! Api Post Gönderme ve Okuma
                //console.log("response:",response);

                //! Durum Başarılı
                if(response.data.status) { 

                    //! Bilgiler
                    var newData = {
                        surveyOptionsId:response?.data.DB.id,
                        surveyOptionsTitle: newSurveyOptions
                    } //! Bilgiler Son

                    setSurveyOptions([...surveyOptions,newData]); //! Verileri Ekleme
                    setNewSurveyOptions(''); //! Seçenek Temizle

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'İşleminiz Başarılı',
                        showConfirmButton: false,
                        timer: 2000
                    });

                } //! Durum Başarılı Son

                //! Durum Hatalı
                else {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'İşleminiz Hatalı',
                        showConfirmButton: false,
                        timer: 2000
                      });

                } //! Durum Hatalı Son

            } catch (error) { console.log("error:",error); }
        }  //! İşlem Son
    
        fetchData(); //! Fonksiyon Çağırma


    } //! Yeni Veri Ekle Son

    //! Veri Silme
    const surveyOptionsDelete = (item) => { 
        
        var deleteId = surveyOptions[item]["surveyOptionsId"];

        //! İşlem
        const fetchData = async () => {
            try {

                const response = await api.post("survey/options/delete/"+deleteId,{}); //! Api Post Gönderme ve Okuma
                //console.log("response:",response);

                //! Durum Başarılı
                if(response.data.status) { 

                    surveyOptions.splice(item,1); //! Siliniyor
                    setSurveyOptions([...surveyOptions] ); //! Güncelleniyor

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'İşleminiz Başarılı',
                        showConfirmButton: false,
                        timer: 2000
                    });

                } //! Durum Başarılı Son

                //! Durum Hatalı
                else {

                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'İşleminiz Hatalı',
                        showConfirmButton: false,
                        timer: 2000
                      });

                } //! Durum Hatalı Son

            } catch (error) { console.log("error:",error); }
        }  //! İşlem Son
    
        fetchData(); //! Fonksiyon Çağırma
      
    } //! Veri Silme Son
   
   
    return (
      <div>

        <Header />
        
        <div className='flex row  gap-2 p-3 '  >
            <div className='font-bold text-xl text-slate-500' color={'red'} size={'10'}  > Anket Güncelle (#{surveyId} )  </div>

            <div className='flex row gap-3'>
            
                <div className='flex column gap-2'  >
                    <input type='text' placeholder='Soru' className='border p-3 roundend-lg col-8' value={newSurvey} onChange={onChangeSurveyFunc} />
                    <button type="button"  className="cursor-pointer w-100"  onClick={()=> { surveyEdit(); }}   style={{ backgroundColor:"blue",color:"white", border:"1px solid", borderRadius:"12px" }} > Başlık Güncelle  </button>
                </div>

                <div className='flex column gap-2' >
                    <input type='text' placeholder='Seçenek' className='border p-3 roundend-lg col-8' value={newSurveyOptions} onChange={onChangeFunc} />
                    <button type="button"  className="cursor-pointer w-100"  onClick={()=> { surveyOptionsAdd(); }}   style={{ backgroundColor:"green",color:"white", border:"1px solid", borderRadius:"12px" }} > Seçenek Ekle  </button>
                </div>

                <div className='flex row gap-2' style={{margin:"auto"} } >
                    <div className='font-bold text-xl text-slate-500' style={{ margin:"auto" }} > Seçenekler </div>

                    {Array(surveyOptions.length).fill(0).map((el, i) => 
                        <div className='flex column col-12 border-1' style={{ margin:"auto" }}>
                            <div className='font-bold text-xl text-slate-500 col-8'> {surveyOptions[i]["surveyOptionsTitle"]} </div>
                            <FiX className='col-4 cursor-pointer' size={'25'} color={'red'}  onClick={() => { surveyOptionsDelete(i); }} />
                        </div>
                    )} 
                    
                </div>

               
        
            </div>
        </div>
          
      </div>
    )
}

export default SurveysEdit;