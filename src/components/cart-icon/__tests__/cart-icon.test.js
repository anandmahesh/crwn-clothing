import { screen } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/test-util/test.util";
import CartIcon from "../cart-icon.component";

describe("Cart Icon component tests", () => {

    test("Cart icon preloded state", () => {
        const intialCartItems = [
            { id: 1, name: 'Item A', imageUrl: 'test', price: 10, quantity: 1 },
            { id: 2, name: 'Item A', imageUrl: 'test', price: 10, quantity: 2 }
        ];

         renderWithProvider(<CartIcon />, {
            preloadedState: {
                cart: {
                    cartItems: intialCartItems
                }
            }
        });

        const cartIconElement = screen.getByText('3');

        expect(cartIconElement).toBeInTheDocument();

    })
})