import {useEffect,useContext} from 'react'
import Context from '../Context';

function UserSignOut(props){
    const context =useContext(Context)
    //when the user signs out he will be redirected to the main page and 
    //the cookie containing his authentication will be deleted
    useEffect(()=>{
        context.actions.signOut();
        props.history.push('/');
    },[context.actions,props.history])
    return null;

}
export default UserSignOut;