import { fireEvent, screen } from "@testing-library/react"
import { renderWithProvider } from "../../../utils/test-util/test.util"
import ProductCard from "../product-card.component"


describe("Product Card Test", () => {

    test("add product item when button clicked", async () => {
        const mockProduct = {
            id: 1,
            imageUrl: 'test',
            name: 'Item A',
            price: 10
        }
        const { store } = renderWithProvider(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart: {
                    cartItems: []
                },

            }
        });

        const buttonElement = screen.getByText(/add to card/i);
        await fireEvent.click(buttonElement);

        expect(store.getState().cart.cartItems.length).toBe(1);

    })
})