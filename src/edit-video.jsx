
import axios from "axios";
import {useFormik} from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditVideos(){
    const[categories, setCategories] = useState([{category_id:0,category_name:null}]);
    const [video, setVideo] =useState({
        title:null,
        description:null,
        url:null,
        comments:null,
        likes:0,
        dislikes:0,
        views:0,
        category_id:0
    })
    
    let navigate = useNavigate();
    let parmas = useParams();
    
    const formik = useFormik({
        initialValues:{
            title: video.title,
            description:video.description,
            url:video.url,
            comments:video.comments,
            likes:video.likes,
            dislikes: video.dislikes,
            views: video.views,
            category_id:video.category_id
        },
        
        onSubmit:(video)=>{
            var parseVideo={
         title:video.title,
         description: video.description,
         url:video.url,
         comments:video.comments,
         likes:pareseInt(video.likes),
         dislikes: pareseInt(video.dislikes),
         views: parseInt(video.views),
         category_id: parseInt(video.category_id)
        
        }
        axios.put(`http://localhost:400/video/${parmas.id}`,parseVideo)
        .then(()=>{console.log('Updated...')})
        alert('video Updated Successfully');
        navigate('/admin-dashboard');
    },
    enableReinitialize:true
    })

    function LoadCatgories(){
     axios.get(`http://localhost:400/categories`)
     .then(response=>{
        response.data.unshift({category_id:-1,category_name: 'Select category'});
        setCategories(response.data);
     })
    }
    function Loadvideos(){
        axios.get(`http://localhost:400/videos/${parmas.id}`)
     .then(response=>{
        setVideo(response.data);
    })
}
useEffect(()=>{
    LoadCatgories();
    Loadvideos();

},[])

return(
     <div className=" bg-light w-50">
        <h3>Edit Item</h3>
        <form onSubmit={formik.handleSubmit}>
            
            <dl className="row">
            <dt className="col-6">Title</dt>
            <dd className="col-6"><input  onChange={formik.handleChange} value={formik.values.title} type= "text"name="title"/></dd>
               
            <dt className="col-6">Description</dt>
        <dd className="col-6"><input  onChange={formik.handleChange} value={formik.values.description} type= "text"name="description"/></dd>
           
            <dt className="col-6">Url</dt>
            <dd className="col-6"><input  onChange={formik.handleChange} value={formik.values.url} type= "text"name="url"/></dd>
               
            <dt className="col-6">View</dt>
            <dd className="col-6"><input  onChange={formik.handleChange} value={formik.values.views} type= "text"name="view"/></dd>
               
            <dt className="col-6">Likes</dt>
            <dd className="col-6"><input  onChange={formik.handleChange} value={formik.values.likes} type= "text"name="likes"/></dd>
               
            <dt className="col-6">Dislikes</dt>
            <dd className="col-6"><input  onChange={formik.handleChange} value={formik.values.dislikes} type= "text"name="dislikes"/></dd>
               
            <dt className="col-6">Category</dt>
            <dd className="col-6">
                <Select name="category_id" value={formik.values.category_id} onChange={formik.handleChange}>
                           {
                            categories.map(category=>
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>

                            )

                            }
                        </Select>
                    </dd>
                    <dt className="col-6">Comments</dt>
         <dd className="col-6"><input type="text" onChange={formik.handleChange} value={formik.values.comments} name="comments"/></dd>
                </dl>
                <Button  className="btn btn-success mx-2"type="submit">Save</Button>
                <Link to="/admin-dashboard" className="btn btn-danger">Cancel</Link>
                 </form>
            </div>
)
}


   
            
