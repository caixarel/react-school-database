
import React,{ Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const Context = React.createContext(); 
//componenet containing the global state for the app 
export class Provider extends Component{
    constructor(){
        super();
        //cookie containing the user's information .allows user to keep logged in after refreshing the page
        this.cookie = Cookies.get('authenticatedUser');
        this.state={
            //variable containing the user's' information
            authenticatedUser:this.cookie ? JSON.parse(this.cookie) : null,
            //variables containing the user's authorizations credentials
            username:this.cookie ? JSON.parse(this.cookie).config.auth.username : null,
            password:this.cookie ? JSON.parse(this.cookie).config.auth.password : null,
        }
    }
    render(){
        const value={
            actions:{
                signIn:this.signIn,
                signOut:this.signOut
            },
            state:this.state
        }
        return(
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        )
    }
    //function that will make the log in request to the server
    signIn =async(emailaddress,password)=>{
        const user = await axios.get('https://school-database-bruno.herokuapp.com/api/users',{
            auth: {
              password:password,
              username:emailaddress
            }}).catch(error => {
              });
              //if the user is successfully logged in his data will be so=tored on the global variables 
            if(user){
                this.setState(()=>{
                    return{
                        authenticatedUser:user,
                        username:emailaddress,
                        password:password,
                    }
                })
                //creates a cookie for the user with a expiration of 1 day
                Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
            }
        return user;
        
    }
    //function to perform the log out. Sets the global variables to null and deletes the user's cookie
    signOut=()=>{
        this.setState(()=>{
            return{
                authenticatedUser:null,
                username:null,
                password:null,
            }
        });
        Cookies.remove('authenticatedUser');
    }

}
export const Consumer = Context.Consumer;
export default Context;