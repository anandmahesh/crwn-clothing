import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import "./navigation.styles.jsx";
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector.js";
import { selectIsCartOpen } from "../../store/cart/cart.selector.js";


const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>
                                SIGN OUT
                            </NavLink>
                        ) :
                            (
                                <NavLink to="/auth">
                                    SIGN IN
                                </NavLink>
                            )
                    }
                    <CartIcon />
                </NavLinks>
                {
                    isCartOpen && (<CartDropdown />)
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;