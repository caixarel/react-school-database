
import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import Context from '../Context';

function UserSignUp(props){
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState([]);
    const [emailAddress,setEmailAddress]=useState('');
    const context =useContext(Context)



    //the form information will be sent to the server 'api' in order to create a new user
    async function handleSubmit(e){
        e.preventDefault();
        await axios.post(`https://school-database-bruno.herokuapp.com/api/users`,{
            firstName,lastName,emailAddress,password
        })
        .then(response=>{
            context.actions.signIn(emailAddress,password)
            props.history.push('/');
        }
        ).catch(error => {
            if(error.response.status===404){
                props.history.push('/notfound');
              }
              else if(error.response.status===500){
                props.history.push('/error');
  
              }else{
                setErrors(error.response.data.errors);
              }
          });
    }

    //when the user writes on any of the form inputs or text area,that value will be stored on the
    //respective variables
    function change(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name==="firstName"){
            setFirstName(value)
        }
        else if(name==='lastName'){
            setLastName(value)

        }else if(name==='emailAddress'){
            setEmailAddress(value)
        }else if(name==='password'){
            setPassword(value)
        }
    }
    return (
        <div className="form--centered">
                <h2>Sign Up</h2>
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
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue=""onChange={change}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue=""onChange={change}/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue=""onChange={change}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue=""onChange={change}/>
                    <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button><Link to='/' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to='/signin' >sign in</Link>!</p>
            </div>
    )

}
export default UserSignUp;