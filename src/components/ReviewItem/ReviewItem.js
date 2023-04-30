import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = ({product, handleRemoveItem}) => {
    const {id, name, price, quantity, shipping ,img} = product;
    return (

        <div className='review-item'>
           <div className=' '>
                    <img src={img} alt="" />
                     <h2>This is review item</h2>
            </div>
             <div className="review-details-container">
            <div className="review-container">
                <p>{name}</p>
                <p><small>Price: ${price}</small></p>
                <p><small>Shipping: ${shipping}</small></p>
                 <p><small>Quantity: {quantity}</small></p>
            </div>
            <div className="delete-container">
                <button onClick= { () => handleRemoveItem(id)} className='btn-delete'>
                    <FontAwesomeIcon className="delete-icon" icon={faTrashAlt}></FontAwesomeIcon>
                </button>
            </div>
            </div>
        </div>
      
    );
};

export default ReviewItem;