import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { Consumer} from '../Context';
import ReactMarkdown from 'react-markdown'
import Context from '../Context';

function CourseDetail(props){
    //variable containing the information about the selected course
    const [data,setData] = useState()
    //database ID from the selected course
    let {id} = useParams();
    //variables to store the password and username that will be used to verify the user authentication
    let password ='';
    let username = '';
    const context =useContext(Context)
    
    //when the compoent launch all the details about the selected course will be stored in a variable
    useEffect( ()=>{
          axios.get(`https://school-database-bruno.herokuapp.com/api/courses/${id}`)
            .then(response => {
                setData(response.data)
            })//in case of errors the user will be redirected to another page
            .catch(error => {
                if(error.response.status===404){
                    props.history.push('/notfound');
                  }
                  else if(error.response.status===500){
                    props.history.push('/error');
                  }
            });
      },[id,props.history])
      //function that allows the user to delete a course that is owned by that user
        function deleteCourse(){
            //stores the password and username retreived from the Context component
            password=context.state.password;
            username=context.state.username;
            axios.delete(`https://school-database-bruno.herokuapp.com/api/courses/${id}`,{
                auth: {
                  password:password,
                  username:username
                }})
            .then(response => {
                props.history.push('/');
                
            })
            .catch(error => {
                props.history.push('/error');
            });
        }
      
        return (
            <Consumer>
                { context =>{
                        return(
                        <div id="root">
                            <main>
                                <div className="actions--bar">
                                    <div className="wrap">
                                        {/* If the user isn't the owner of this course we will not have acess to the delete or update buttons */}
                                        {context.state.authenticatedUser && data?.User.id && context.state.authenticatedUser.data?.id===data.User.id &&<>
                                            <Link to={`/courses/${id}/update`} className="button" >Update Course</Link>
                                            <button className="button"  onClick={deleteCourse}>Delete Course</button>
                                        </>
                                        }
                                        <Link to ='/'className="button button-secondary" >Return to List</Link>
                                    </div>
                                </div>
                                <div className="wrap">
                                    <h2>Course Detail</h2>
                                    <form>
                                        <div className="main--flex">
                                            <div>
                                                <h3 className="course--detail--title">Course</h3>
                                                <h4 className="course--name">{data?.title}</h4>
                                                <p>{data?.User.firstName} {data?.User.lastName}</p>
                                                <ReactMarkdown>
                                                    {data?.description}
                                                </ReactMarkdown>
                                            </div>
                                            <div>
                                                <h3 className="course--detail--title">Estimated Time</h3>
                                                <p>{data?.estimatedTime}</p>                       
                                                <h3 className="course--detail--title">Materials Needed</h3>
                                                <ul className="course--detail--list">
                                                <ReactMarkdown>
                                                    {data?.materialsNeeded}
                                                </ReactMarkdown>
      
                                                </ul>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </main>
                        </div>
                    )
                    }
                }
            </Consumer>
            )
}

export default CourseDetail;