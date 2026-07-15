import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import  {useCookies} from "react-cookie";
import { useEffect } from "react";



export function AdminLogin(){
    const [cookies, setCookie, removeCookie] = useCookies(['admin_id']);

    let navigate= useNavigate();
    
    const formik= useFormik({
    initialValues:{
        admin_id: '',
        password: ''

    },
    onSubmit :(admin)=>{
        axios.get('http://localhost:3000/admin')
       
        .then(response=>{
            var adminuser = response.data.find(item=> item.admin_id===admin.admin_id);
            if(adminuser){
                if(adminuser.password===admin.password){
                    setCookie('admin_id', adminuser.admin_id);
                    navigate('/admin-dashboard')
                }
                else{
                    alert('Invalid Password')
                }

            }else{
                alert('Invalid Admin ID')
            }
        })

    }
})
useEffect(()=>{
    if(cookies['admin_id']){
        navigate('/admin-dashboard');

    }
},[])

    return(
        <div className="bg-light p-3 w-25">
            <h2>Admin Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text"name="admin_id" className="form-control"onChange={ formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="text" name="password"className="form-control"onChange={formik.handleChange}/></dd>
                </dl>
                <button type="submit" className="btn btn-warning mx-2">Login</button>
                <Link to="/" className="btn btn-danger">cancel</Link>
            </form>

        </div>
    )
}
