import { Fragment, useContext, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase.utils";

import './navigation.styles.scss';

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handlerSignOut = async () => {
        await signOutUser();
        setCurrentUser(null);
    }
    //console.log("currentUser: ", currentUser);
    
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            (<span className="nav-link" onClick={handlerSignOut}>Sign Out</span>) :
                            (<Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>)
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;