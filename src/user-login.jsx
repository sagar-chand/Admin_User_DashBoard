
import axios from "axios";
import {useFormik} from "formik";
import {Link, useNavigate } from "react-router-dom";
import{Button} from "@mui/material";



export function UserLogin(){
    
    const navigate= useNavigate();
    const formik = useFormik({

        initialValues:{
            user_id: '',
            password: ''
        },

        onSubmit: (user)=>{
            axios.get('http://localhost:3000/users')
            .then(response=>{
               
                var result = response.data.find(item=> item.user_id=== user.user_id);
                if(result){
                    if(result.password === user.password){
                        navigate('user-dashboard');
                    }else{
                        alert('Invalid Password');
                    }
                }else{
                    alert('Invalid User_id')
                }
            })
        }

    })
    
return(
    <div className="bg-light">
    <h2>User Login</h2>
        
            <form onSubmit={formik.handleSubmit}>
               
                <dl>
                    <dt>User Id</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="user_id"/></dd>
                    
                    <dt>Password</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="password"/></dd>
                    </dl>
                <Button  type="submit" variant="contained" color="error">Login</Button>
                </form>
            <Link to="/user-register" className="btn btn-link">New User Register</Link>
        </div>
)
}

