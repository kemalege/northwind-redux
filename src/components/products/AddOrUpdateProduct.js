import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import GetProductId from "./GetProductId";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props // mevcut propları genişletiyoruz. fonksiyona bu propları eklemiş oluyoruz.
}) {
  // const {productId} = useParams();
  const [product, setProduct] = useState({ ...props.product }); // productu setProduct ile set ediyoruz
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // componentsDidMounth kapsıyor
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]); // props.product doma yerleştiği zaman lifecycle ı biti böylece sonsuz döngüye girmesini engelle.

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
    validate(name, value);
  }

  function validate(name,value) {
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün ismi olmalıdır"
      }));
    }else{
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: ""
      })); 
    }
  }

  function handleSave(event) {
    event.preventDefault(); // sayfanın refresh olmasını engeller
    saveProduct(product).then(() => {
      history.push("/"); // history bilgisini getirir
    });
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function MapStateToProps(state, ownProps) {
  const { productId } = useParams();
  // const productId = ownProps.productId;
  console.log(productId);

  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId) //o id deki productı ver
      : {}; // aksi takdirde yeni bir üründür boş nesne
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}
const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(MapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
