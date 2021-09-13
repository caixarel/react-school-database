import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import Context from '../Context';


function UserSignIn(props){
    //variables containing the login information
    const [password,setPassword]=useState('');
    const [emailaddress,setEmailAddress]=useState('');

    const context =useContext(Context)
    const [errors,setErrors]=useState([]);
    //when the form is submit the login information will be sent to the server'api' to check if there is a user with the matching credentials
    function handleSubmit(e){
        e.preventDefault();
        const { from } = props.location.state || { from: { pathname: '/' } };
        context.actions.signIn(emailaddress,password)
        .then( user => {
            if (user) {
                //if the user is succesfully loged in he 
                //will be redirected to the main page or to the page he was trying to acess
                props.history.push(from);
            }else{
              setErrors('The username or password are not correct')
            }
          })
          .catch( error => {
            if(error.response.status===404){
                props.history.push('/notfound');
              }
              else if(error.response.status===500){
                props.history.push('/error');
              }
          })        
    }
    function changeEmail(e){
        setEmailAddress(e.target.value)
    }
    function changePassword(e){
        setPassword(e.target.value);
    }
    return (
        <div className="form--centered">
                <h2>Sign In</h2>
                {/* Form errors will be shown here */}
                {
                        errors.length>0
                        ?<><div className="validation--errors">
                            <h3>Validation Errors</h3>
                                <ul>
                                    <li >{errors}</li>
                    
                                </ul>
                            </div>
                        </>
                        :null
                    }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue=""onChange={changeEmail}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue=""onChange={changePassword}/>
                    <button className="button" type="submit" >Sign In</button><Link to='/' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>
                
            </div>
    )
}

export default UserSignIn;