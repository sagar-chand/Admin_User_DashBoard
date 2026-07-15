import axios from "axios"
import {useFormik} from 'formik';
import {useEffect,useState} from 'react';
import { Link,useNavigate } from "react-router-dom";

export function AddVideos(){
    const[categories, setCategories] = useState([{category_id:0, category_name:null}]);
    let navigate= useNavigate();
    const formik= useFormik({
        initialValues:{
            title: "",
            description:'',
            url: '',
            likes:0,
            views:0,
            category_id: 0,
            Comments:''
        },
        onSubmit: (video)=>{
            var parseVideo={
                title:video.title,
                description:video.description,
                url:video.url,
                likes:parseInt(video.likes),
                dislikes:parseInt(video.views),
                category_id:parseInt(video.category_id),
                comments: video.Comments
            }
            axios.post('http://localhost:400/videos',parseVideo)
            .then(()=>{
                console.log('video added')
            })
            alert('video added successfully....');
            navigate('admin-dashboard');
        }

    })

    useEffect(()=>{
         axios.get(`http://localhost:400/categories`)
            .then(()=>{
                response.data.unshift({category_id: -1, category_name:'Select Category'});
                setCategories(response.data);
            })
        

    },[])


    return(
        <div className="bg-light p-2 w-50">
            <h2> Add Video</h2>
           
            <form onSubmit={formik.handleSubmit}>
                <h5 className="mb-5 fst-italic border-bottom border-warning pb-4 pt-0 tex-center text-warning">New Video Add</h5>
               
                <dl className="row">
                    
        <dt className="col-6">Title</dt>
       <dd className="col-6">
        <input type="text" onChange={formik.handleChange} name="title" className="form-control"placeholder="title"/></dd>
                    
                    
        <dt className="col-6">Description</dt>
         <dd className="col-6">
        <input type="text" onChange={formik.handleChange} name="description" className="form-control" placeholder="description"/></dd>
                    
        <dt className="col-6">Url</dt>
        <dd className="col-6">
        <input type="text" onChange={formik.handleChange} name="url" className="form-control" placeholder="url"/></dd>
                
                    
        <dt className="col-6">View</dt>
        <dd className="col-6">
        <input type="text" onChange={formik.handleChange} name="view" className="form-control" placeholder="view"/></dd>
                
                    
        <dt className="col-6">Like</dt>
        <dd className="col-6">
        <input type="text" onChange={formik.handleChange} name="like" className="form-control" placeholder="like"/></dd>
                
                    
        <dt className="col-6">Dislike</dt>
        <dd className="col-6">
        <input type="text" onChange={formik.handleChange} name='dislike' className="form-control" placeholder='dislike'/></dd>
                    
                    
        <dt className="col-6">Category</dt>
        <dd className="col-6">
        <select name="category_id" onChange={formik.handleChange} className="form-select">
                            {
                                categories.map(category=>{
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                })
                            }
                            </select>
                        </dd>
                
                     
        <dt className="col-6">Comments</dt>
        <dd className="col-6">
        <input type="text" onChange={formik.handleChange} name="comments" className="form-control" placeholder="comments"/></dd>
                
                    

                </dl>
                <button className="btn btn-warning mx-2" type="submit">Add</button>
                <Link className="btn btn-warning" to="/admin-dashboard">Cancel</Link>
            </form>

        </div>


    )
}

