import React, {useEffect, useState} from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'



const CheckoutForm = ({cart, setCart, setShowItem, showItem}) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  })


  const onSubmit = async(e) => {
    e.preventDefault(e)

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        address: {city: formData.city, country: 'US', state: 'eaea'},
        email: formData.email,
        name: formData.name,
        phone: formData.phone
      }
    })

    console.log(error, paymentMethod)

    if(error) {
      console.log('yawa')
    }

    if(!error) {
      try{
        const {id} = paymentMethod
        const response = await axios.post("https://ford-petshop-api.herokuapp.com/payment", {
          amount: cart.total * 100,
          id
        })

        if(response.data.success){
          console.log('successful payment')
          setSuccess(true)
        }
      }catch(e){
        console.log('error', e)
      }
    }else{
      console.log(error.message)
      setError(error.message)
    }

  }

  const formHandler = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }


  return (
    <div className=''>

  {!success ? 
  <div className='d-flex justify-content-between pt-5'>
    <div className=' m-auto rounded shadow-lg '>
      <div className=''>
        {cart.german ? <div className=' '>
        <div className='d-flex justify-content-between'>
        <span className='m-2'>
        <img className='pb-1' src='German.jpg' width={60}/>
         <span className='p-3'> German Shepherd({cart.german})</span>
        </span>
        <span className='p-3'>${cart.germanPrice}</span>
        </div>
        </div> : null}
        {cart.retriever ? <div className=' '>
        <div className='d-flex justify-content-between'>
        <span className='m-2'>
        <img className='pb-1' src='Retriever.png' width={60}/>
         <span className='p-3'> Golden Retriever({cart.retriever})</span>
        </span>
        <span className='p-3'>${cart.retrieverPrice}</span>
        </div>
        </div> : null}
        {cart.pomeranian ? <div className=' '>
        <div className='d-flex justify-content-between'>
        <span className='m-2'>
        <img className='pb-1' src='Pomeranian.jpg' width={60}/>
         <span className='p-3'> Pomeranian({cart.pomeranian})</span>
        </span>
        <span className='p-3'>${cart.pomeranianPrice}</span>
        </div>
        </div> : null}
        {cart.bulldog ? <div className=' '>
        <div className='d-flex justify-content-between'>
        <span className='m-2'>
        <img className='pb-1' src='Bulldog.jpeg' width={60}/>
         <span className='p-3'> Bulldog({cart.bulldog})</span>
        </span>
        <span className='p-3'>${cart.bulldogPrice}</span>
        </div>
        </div> : null}
        {cart.poodle ? <div className=' '>
        <div className='d-flex justify-content-between'>
        <span className='m-2'>
        <img className='pb-1' src='Poodle.jpg' width={60}/>
         <span className='p-3'> Poodle({cart.poodle})</span>
        </span>
        <span className='p-3'>${cart.poodlePrice}</span>
        </div>
        </div> : null}
        {cart.husky ? <div className=' '>
        <div className='d-flex justify-content-between'>
        <span className='m-2'>
        <img className='pb-1' src='Husky.jpg' width={60}/>
         <span className='p-3'> Siberian Husky({cart.husky})</span>
        </span>
        <span className='p-3'>${cart.huskyPrice}</span>
        </div>
        </div> : null}
        <div className='d-flex justify-content-between m-4 border-top'>
          <div>Total: </div>
          <div>${cart.total}</div>
        </div>

    </div>
  </div>
    <div className='m-auto w-50'>
    <form  onSubmit={onSubmit} className="p-5 rounded shadow-lg">
      <div class="form-row pt-5">
          <div class="form-group  ">
            <label for="inputEmail4">Email</label>
            <input onChange={(e)=>formHandler('email', e.target.value)} required type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
          </div>
          <div class="form-group ">
            <label for="inputEmail4">Name</label>
            <input onChange={(e)=>formHandler('name', e.target.value)} required type="text" class="form-control" placeholder="Name"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="inputCity">City</label>
            <input onChange={(e)=>formHandler('city', e.target.value)} required type="text" class="form-control" placeholder="City" id="inputCity"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group ">
            <label for="inputCity">Phone</label>
            <input onChange={(e)=>formHandler('phone', e.target.value)} required type="numbers" class="form-control" placeholder="Phone" id="inputCity"/>
          </div>
        </div>
        <CardElement className='p-3 my-3 border rounded' />
        <div>{error}</div>
        <button type="submit" class="my-3 btn btn-primary">Purchase</button>
      </form>
      </div>
  </div>
   : 
   <div className='m-auto w-50 pt-5'>
    Congratulations! You are now a furrrparent! Thank you for purchasing!
    <Button className='m-3' variant='outline-secondary' onClick={()=>setShowItem(!showItem)}> Go back </Button>
    </div>
    }
  </div>
  );
};

export default CheckoutForm;
