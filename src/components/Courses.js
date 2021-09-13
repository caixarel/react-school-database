import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

function Courses(props){
    //variable containing the information about all courses
    const [data,setData] = useState([])

    useEffect( ()=>{
        //on the launch of the component all courses in the database will be stored on the data variables
         axios.get(`https://school-database-bruno.herokuapp.com/api/courses`)
            .then(response => {
              setData(response.data)
            })
            .catch(error => {
                 if(error.response.status===404){
                    props.history.push('/notfound');
                  }
                  else if(error.response.status===500){
                    props.history.push('/error');
      
                  }
            });
      },[props.history])

    return(
        <div id="root">
            <main>
                <div className="wrap main--grid">
                {/* iteration over all the courses from the database and create a link to each of them */}
                {data.map((element,index)=>{
                    return (
                        <Link to={`/courses/${element.id}`} className="course--module course--link"  key={index} >
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{element.title}</h3>
                        </Link>
                        )
                })}
                    <Link to='/courses/create' className="course--module course--add--module" >
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Courses;