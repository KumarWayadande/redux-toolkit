import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "The first book i ever wrote",
    description: "Nothing is very special about this book.",
  },
  {
    id: "p2",
    price: 5,
    title: "The second book i ever wrote",
    description: "Nothing is very special about this book.",
  },
  {
    id: "p3",
    price: 10,
    title: "The third book i ever wrote",
    description: "Nothing is very special about this book.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => {
          return (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
