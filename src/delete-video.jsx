import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function DeleteVideo(){
     const[video, setVideo] =  useState({title:null,description:null,comments:null,url:null,likes:0,dislikes:0, views:0,category_id:0});
     const[categories,setCategories] = useState([{category_id:0,vat}]);
    
     let navigate = useNavigate();
     let parms = useParams();
    
     function LoadCategories(){
        axios.get(`http://localhost:400/categories`)
        .then(response=>{
            response.data.unshift({category_id:-1,category_name:'select category'});
            setCategories(response.data);
            
        })
     }
     function LoadVideos(){
        axios.get(`http://localhost:400/categories`)
        .then(response=>{
            response.data.unshift({category_id:-1,category_name:'select category'});
            setVideo(response.data);
        })
        }
        useEffect(()=>{
            LoadCategories();
            LoadVideos();
        },[])
        
        function handleYesClick(){
            axios.delete(`http://loacalhost:400/videos/${parms.id}`)
            .then(()=>{console.log('Deleted')});
            alert('Deleted successfully');
            navigate('admin-dashboard');
        }
       
        return(
            <div className=" bg-light p-2">
                <h2>Delete video</h2>
                <h4>Are you sure,   Want to Delete?</h4>
                <dl>
                    <dt>Title</dt>
                    <dd>{video.title}</dd>
                    <dt>Preview</dt>
                    <dd>
                        <iframe src={video.url} width="200" height="200"></iframe>
                    </dd>
                </dl>
                <button onClick={handleYesClick}className="btn btn-danger mx-2">Yes</button>
                <Link to ={'/admin-dashboard'}className="btn btn-warning">No</Link>

            </div>
        )
}