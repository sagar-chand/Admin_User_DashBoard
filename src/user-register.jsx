import axios from "axios";
import {useFormik} from "formik";
import {useState} from "react";
import {Link, useNavigate } from "react-router-dom";


export function UserRegister(){
    const[ status, setStatus] = useState(null);
    const[statusClass, setStatusClass] = useState(null);

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            user_id:'',
            user_name:'',
            password:'',
            email:''
        },
        onSubmit:(user)=>{
            axios.post(`http://localhost:3000/users`,user)
            .then(()=>{console.log('register')});
            alert('User Register Successfully');
            navigate('/user-login');

        }
    })

    function handleVerifyUserId(e){
        axios.get(`http://localhost:3000/users`)
        .then(response=>{
            
            for(var user of  response.data){
                if(user.id===e.target.value){
                    setStatus('User Id Taken-Try Another');
                    setStatusClass('text-success');
                    break;
                }else{
                    setStatus('User Id Available');
                    setStatusClass('text-success');
                }
            }
        })
    }

return(
    
        <div className="bg-light p-2 w-25">
        <h2>User Register</h2>
        <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onKeyUp={handleVerifyUserId}onChange={formik.handleChange}name="user_id"/></dd>
                <dd className={statusClass}>{status}</dd>
                <dt>User Name</dt>
                <dd><input type="text"onChange={formik.handleChange} name="password"/></dd>
                <dt>Email</dt>
                <dd><input type="text" onChange={formik.handleChange}name="emial"/></dd>
                
            </dl>
            <button type="submit" className="btn btn-warning">Register</button>
        </form>
        <Link to="/user-login" className="btn btn-link">Have Account?</Link>


    </div>
)
    

}
