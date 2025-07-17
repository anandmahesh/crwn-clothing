import { screen, fireEvent } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/test-util/test.util"
import Navigation from "../navigation.components"
import { signOutStart } from "../../../store/user/user.action";

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

describe("Navigation test", () => {

    test("Renader SIGN IN when no current user", () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null,
                }
            }
        });

        const element = screen.getByText(/sign in/i);
        expect(element).toBeInTheDocument();

        const element2 = screen.queryByText(/sign out/i);
        expect(element2).toBeNull();
    })

    test("Renader SIGN OUT when current user present", () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {
                        displayName: 'Mahesh'
                    },
                }
            }
        });

        const element = screen.getByText(/sign out/i);
        const element2 = screen.queryByText(/sign in/i);
        expect(element).toBeInTheDocument();
        expect(element2).toBeNull();
    });

    test("not render cart dropdown when isCartOpen is false", () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        });

        const element = screen.queryByText(/your cart is empty/i);
        expect(element).toBeNull();
    })

    test("render cart dropdown when isCartOpen is true", () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        });

        const element = screen.getByText(/your cart is empty/i);
        expect(element).toBeInTheDocument();
    });

    test("check singout click", async () => {
        // Clear any previous mock calls
        mockDispatch.mockClear();

        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        });

        const element1 = screen.getByText(/sign out/i);
        expect(element1).toBeInTheDocument();

        await fireEvent.click(element1);

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
    });

})