import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './video-tutorial-index.css';
import { VideoTutorialHome } from './video-tutorial-home';
import { AdminLogin } from './admin-login';
import { AdminDashboard } from './admin-dashboard';
import { AddVideos } from './add-videos';
import { EditVideos } from './edit-video';
import { DeleteVideo } from './delete-video';
import { UserLogin } from './user-login';
import { UserRegister } from './user-register';
import {UserDashboard} from './user-dashboard';


export function VideoTutorialIndex(){

    return(
        <div className="container-fluid bg-image">
         <BrowserRouter>
            <header className='text-white text-center'>
<div className='fs-1 fw-bold'><Link className='btn btn-light' to="/"><span className='bi bi-house-door'></span></Link>Vedeo Tutorials</div>  
                <div>[React, Java, AWs]</div>        
                     </header>
                     
                     <section className='mt-4'>
                        <Routes>
                     <Route path='/'element={<VideoTutorialHome/>}/>
                     <Route path='admin-login' element={<AdminLogin/>}/>
                    <Route path='admin-dashboard'element={<AdminDashboard/>}/>
                       <Route path='add-videos'element={<AddVideos/>}/>
                        <Route path='edit-video'element={<EditVideos/>}/>
                         <Route path='delete-video'element={<DeleteVideo/>}/>
                          <Route path='user-login'element={<UserLogin/>}/>
                           <Route path='user-register'element={<UserRegister/>}/>
                            <Route path='user-dashboard'element={<UserDashboard/>}/>
                    </Routes>
                     </section>
            </BrowserRouter>
        
            </div>
    )
}