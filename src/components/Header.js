import React from 'react'
import {Link} from 'react-router-dom'
import { Consumer } from '../Context'


function Header(){
    return(
        <Consumer>
            {context=>{
                    return(
                        <header>
                        <div className="wrap header--flex">
                            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                            <nav>
                                <ul className="header--signedin">  
                                    {/* if the user is logged in,his name will be shown on the header of the page,otherwise a link to the sign page is displayed */}
                                    {
                                        context.state.authenticatedUser
                                        ? (<>
                                            <li>{context.state.authenticatedUser.data.firstName}</li>
                                            <li><Link to="/signout">Sign Out</Link></li></>
                                        )
                                        :(<>
                                            <li><Link to="/signin">Sign In</Link></li>
                                             <li><Link to="/signup">Sign Up</Link></li></>
                                        ) 
                                        }
                                </ul>
                            </nav>
                        </div>
                        </header>
                    )
                
                }
                }
                
        </Consumer>
        
    )
}

export default Header;