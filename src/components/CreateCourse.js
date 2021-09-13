import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import Context from '../Context';

function CreateCourse(props){
    const context =useContext(Context)
    //variables to store the new course information
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [estimatedTime,setTime]=useState('');
    const [materialsNeeded,setMaterials]=useState('');
    //storing possible errors when filling the course form
    const [errors,setErrors]=useState([]);

    async function handleSumit (e){
        e.preventDefault();
        //create new course 
        await axios.post('https://school-database-bruno.herokuapp.com/api/courses',{
            title,description,estimatedTime,materialsNeeded
        },{
            auth: {
              password:context.state.password,
              username:context.state.username
            }})
        .then(response=>{
            props.history.push('/');
        }
        )
        .catch(error => {
            if(error.response.status===400){
                 setErrors(error.response.data.errors);
            }
            else if(error.response.status===404){
                props.history.push('/notfound');
              }
              else if(error.response.status===500){
                props.history.push('/error');
  
              }
          });
    }
    //when the user writes on any of the form inputs or text area,that value will be stored on the
    //respective variables
    function change(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name==="title"){
            setTitle(value)
        }
        else if(name==='description'){
            setDescription(value)

        }else if(name==='estimatedTime'){
            setTime(value)
        }else if(name==='materialsNeeded'){
            setMaterials(value)
        }

    }
    return(
        <div id="root">
            <main>
                <div className='wrap'>
                    <h2>Create Course</h2>
                    {/* Form errors will be shown here */}
                        {
                            errors.length>0
                            ?<><div className="validation--errors">
                            <h3>Validation Errors</h3>
                                <ul>
                                    {(errors.map((error,index)=>{
                                    return(
                                        <li key={index}>{error}</li>
                                    )
                                }))}
                                </ul></div>
                            </>
                            :null
                        }
                    <form onSubmit={handleSumit}>
                        <div className="main--flex">
                            <div>
                                 <label htmlFor="courseTitle">Course Title</label>
                                 <input id="courseTitle" name="title" type="text" defaultValue="" onChange={change}/>
                                 <p>By Joe Smith</p>

                                 <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="description" onChange={change}></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue=""onChange={change}/>
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" onChange={change}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit" >Create Course</button><Link to='/' className="button button-secondary" >Cancel</Link>
                    </form>
                </div>
            </main>
        </div>
    )
}
export default CreateCourse;