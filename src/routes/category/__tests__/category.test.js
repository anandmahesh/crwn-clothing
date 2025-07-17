import { useParams } from "react-router-dom";
import { renderWithProvider } from "../../../utils/test-util/test.util"
import Category from "../category.component"
import { screen } from "@testing-library/react";

// Mock the useDispatch hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => {
        return {
            category: 'mens'
        }
    }
}));

describe("Category Test", () => {

    test("render spinner when isLoading true", () => {

        renderWithProvider(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        });

        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });

    test("not render spinner and render categories when isLoading false", () => {

        renderWithProvider(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [
                        {
                            title: 'mens',
                            items: [
                                {
                                    id: 1,                                    
                                    name: 'Product 1'
                                },
                                {
                                    id: 2,                                    
                                    name: 'Product 2'
                                }
                            ]
                        }
                    ]
                }
            }
        });

        const spinner = screen.queryByTestId('spinner');
        expect(spinner).toBeNull();

        const product1ELM = screen.getByText(/product 1/i);
        expect(product1ELM).toBeInTheDocument();
    });

    
})