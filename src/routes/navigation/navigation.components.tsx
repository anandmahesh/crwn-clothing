import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { NavigationContainer, NavLinks, NavLink, LogoContainer, NavButton } from "./navigation.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";


const Navigation = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);

    const handleSignOut = () => dispatch(signOutStart());

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
                            <NavButton onClick={handleSignOut}>
                                SIGN OUT
                            </NavButton>
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