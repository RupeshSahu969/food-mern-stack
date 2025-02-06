import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';
const Card = (props) => {

    const [qty, setQty] = useState(1)
    const [size, setSIze] = useState("")

    let data = useCart();
    const dispatch = useDispatchCart();

    let navigate = useNavigate()
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const handleClick = () => {
        if (!localStorage.getItem("authToken")) {
          navigate("/login")
        }
      }

    const handleAddCart = async () => {
        await dispatch({
            type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice,img: props.foodItem.img,
            qty: qty,
            size: size
        })
        return
    
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSIze(priceRef.current.value)
    }, [])
    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="imgSrc" style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name} </h5>

                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' 
                        onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSIze(e.target.value)}>
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data} </option>
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={"btn btn-success justify-center ms-2"} onClick={handleAddCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card
