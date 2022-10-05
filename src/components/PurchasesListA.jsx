import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PurchasesListA = ({ product }) => {
    const productsAll = useSelector(state => state.products)

    const urlImg = productsAll.find(current => current.id === product.id)
    const navigate = useNavigate()


    return (
        <article className="purchases-product" onClick={() => navigate(`/product/${product.id}`)}>
            <img src={urlImg?.productImgs[0]} alt="photo oh the product" />
            <p>{product?.title}</p>
            <p>{product.productsInCart?.quantity}</p>
            <b>$ {product?.price}</b>
        </article>
    );
};

export default PurchasesListA;