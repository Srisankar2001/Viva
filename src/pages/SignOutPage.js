import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoginApi, SigOutApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/Storage';
import './LoginPage.css';
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function SignOutPage(){
    const navigate= useNavigate;

    const initialStateErrors={
        
        custom_error:null
    };

    const [errors,setErrors]= useState(initialStateErrors);
    
    const [loading,setLoading]=useState(false);

    // const [inputs,setInputs]=useState({
    //     email:"",
    //     password:""
    //     //ithula naama kodukkira name inputs la kuduthuruppame tag nama athe irukkanum appathaan setInputs function ah use pannika mudiyum
    // })//inputs kkaana state

    // const handleInput=(event)=>{
    //     setInputs({...inputs,[event.target.name]:event.target.value})

    // }//ella inputs kku

    const handleSignOut=(event)=>{
        event.preventDefault();//browser can't load

        let errors =initialStateErrors;

        // let hasError=false;
    
        // if(inputs.email==""){
        //     errors.email.required=true;
        //     hasError=true;
        // }
        // if(inputs.password==""){
        //     errors.password.required=true;
        //     hasError=true;
        // }

        // if(!hasError){
            setLoading(true)
            //sending register api request
            SigOutApi().then((response)=>{
                if (response.data.status==200) {
                    if(response.data.data){
                        // Set verification status message
                      setErrors({...errors, verificationStatus:response.data.data});
                      navigate(`/`)
  
                    }
                    if(response.data.error){
                      // Set verification status message
                    setErrors({...errors, verificationStatus:response.data.error});
                  }
  
                  
              } else {
                  // Handle verification failure
                  throw new Error("Verification failed");
              }
              
                
                // navigate(`/`);
            }).catch((err)=>{
                if (err.code=="ERR_BAD_REQUEST") {
                    setErrors({...errors,custom_error:"Invalid Credentials!"})
                }
               
            }).finally(()=>{
                setLoading(false)
            })

        setErrors({...errors});//nama mathina state ah intha function moolama koduthu maathikiram
            //...errors endrathu oru copy value ah thaan kodukkanum error ah 
    }
    const handleCancel = () => {
        navigate(`/`)
      };

//     if (isAuthenticated()){//true/false
//         //Redirecting to Dashboard
//        //ithukku naama react-router-dom endra package ah install pannanum
//        return <Navigate to="/" />
//    }

    return(
        // <div>
        //     <NavBar/>
        // <section className="login-block">
        //     <div className="container">
        //         <div className="row ">
        //             <div className="col login-sec">
        //                 <h2 className="text-center">Are you sure want to SignOut?</h2>
        //                 <form onSubmit={handleSubmit} className="login-form" action="">
                        
        //                 <div className="form-group">
        //                     {
        //                         loading?
        //                         (<div  className="text-center">
        //                             <div className="spinner-border text-primary " role="status">
        //                                 <span className="sr-only">Loading...</span>
        //                             </div>
        //                         </div>):null
        //             }
        //                     <span className="text-danger" >
        //                     {
        //                         errors.custom_error?
        //                         (<p>{errors.custom_error}</p>):null
        //                     }
        //                     </span>
        //                     <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="YES"/>
        //                     <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="NO"/>
        //                 </div>
        //                 <div className="clearfix"></div>
        //                 <div className="form-group">
        //                 Create new account ? Please <Link  to="/register">Register</Link>
        //                 {/* Link endrathu react router ah work panna vaikkum so puthu url vantha athkketha component ah load panna vaikkum  */}
        //                 </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        // </div>
        <div>
      <NavBar />
      <section className="login-block">
        <div className="container">
          <div className="row ">
            <div className="col login-sec">
              <h2 className="text-center">Are you sure want to SignOut?</h2>
              <form className="login-form" action="">
                <div className="form-group">
                  {/* Handle loading state and errors here */}
                  <input
                    type="button"
                    onClick={handleSignOut}
                    className="btn btn-login float-right"
                    value="YES"
                  />
                  <input
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-login float-right"
                    value="NO"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Create new account ? Please <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
        
    )
}