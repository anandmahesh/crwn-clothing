import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectorCategoriesMap,
} from "../../store/categories/categories.selectore";
import Spinner from "../../components/spinner/spinner.component";
import { CategoryItem } from "../../store/categories/categories.types";

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;

  const categoriesMap = useSelector(selectorCategoriesMap);

  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
