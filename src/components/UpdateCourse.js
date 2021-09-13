import React,{useState,useEffect,useContext} from "react";
import { useParams,Link } from "react-router-dom";
import { Consumer} from '../Context';
import Context from '../Context';
import axios from "axios";

function UpdateCourse(props){
    const context =useContext(Context)
    //variables to store the new course information
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [estimatedTime,setTime]=useState('');
    const [materialsNeeded,setMaterials]=useState('');
    //data from the course to be updated
    const [data,setData] = useState()
    const [errors,setErrors]=useState([]);
    //id of the course
    let {id} = useParams();

    //when the compoent launch all the details about the selected course will be stored in a variable
    useEffect( ()=>{
         axios.get(`https://school-database-bruno.herokuapp.com/api/courses/${id}`)
          .then(response => {
            setData(response.data);
            //instead of showing empty form fields, the page loads with the existing data for the course
            setMaterials(response.data.materialsNeeded);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setTime(response.data.estimatedTime);
            //if the user tries to update a course that doesn't belong to him he will not be able to acess it
            if(context.state.authenticatedUser.data?.id!==response.data.User.id){
                props.history.push('/forbidden');
            }
          })
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
    },[id,props.history,context.state.authenticatedUser.data?.id])

    async function handleSumit(e){
        e.preventDefault();
        await axios.put(`https://school-database-bruno.herokuapp.com/api/courses/${id}`,{
            title,description,estimatedTime,materialsNeeded
        },{
            auth: {
              password:context.state.password,
              username:context.state.username
            }})
        .then(response=>{
            props.history.push('/');
        }
        ).catch(error => {
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
   
    return (
        <Consumer>
        {context=>{
            return(
                <div className="wrap">
                    <h2>Update Course</h2>
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
                                </ul>
                            </div>
                        </>
                        :null
                    }
                    <form>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="title" type="text" defaultValue={data?.title} onChange={change}/>
                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="description" defaultValue={data?.description} onChange={change}></textarea>
                                
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={data?.estimatedTime} onChange={change}/>
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={materialsNeeded}onChange={change}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit" onClick={handleSumit}>Update Course</button><Link to='/' className="button button-secondary" >Cancel</Link>
                    </form>
                </div>
            )
        }}
    </Consumer>
    )
}
export default UpdateCourse;