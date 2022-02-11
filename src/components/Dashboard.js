import React,{useState} from 'react';
import StripeContainer from './StripeContainer';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap'

const Dashboard = () => {
    const [showItem, setShowItem] = useState(false)
    const [cart, setCart] = useState(
        {
            quantity: 0,
            german: 0,
            germanPrice: 0,
            retriever: 0,
            retrieverPrice: 0,
            pomeranian: 0,
            pomeranianPrice: 0,
            bulldog: 0,
            bulldogPrice: 0,
            poodle: 0,
            poodlePrice: 0,
            husky: 0,
            huskyPrice: 0,
            total: 0,
        }
    )


    const pets = [
        {
        id: 1,
        breed: 'German Shepherd',
        img: '/German.jpg',
        price: 2000,
        },
        {
        id: 2,
        breed: 'Golden Retriever',
        price: 1500,
        img: '/Retriever.png'
        },
        {
        id: 3,
        breed: 'Pomeranian',
        price: 2000,
        img: '/Pomeranian.jpg'

        },
        {
        id: 4,
        breed: '',
        price: 30000,
        },
        {
        id: 5,
        breed: 'Bulldog',
        price: 2500,
        img: '/Bulldog.jpeg'

        },
        {
        id: 6,
        breed: 'Poodle',
        price: 4000,
        img: '/Poodle.jpg'

        },
        {
        id: 7,
        breed: 'Siberian Husky',
        price: 1500,
        img: '/Husky.jpg'
        },

]


    const onSubmit = (id, price) => {
        setCart({
            quantity: cart.quantity + 1,
            german: id === 1 ? cart.german + 1 : cart.german,
            germanPrice: id === 1 ? cart.germanPrice === 0 ? price : cart.germanPrice + price : cart.germanPrice,
            retriever:  id === 2 ? cart.retriever + 1 : cart.retriever,
            retrieverPrice: id === 2 ? cart.retrieverPrice === 0 ? price : cart.retrieverPrice + price : cart.retrieverPrice,
            pomeranian: id === 3 ? cart.pomeranian + 1 : cart.pomeranian,
            pomeranianPrice: id === 3 ? cart.pomeranianPrice === 0 ? price : cart.pomeranianPrice + price : cart.pomeranianPrice,
            bulldog: id === 5 ? cart.bulldog + 1 : cart.bulldog,
            bulldogPrice: id === 5 ? cart.bulldogPrice === 0 ? price : cart.bulldogPrice + price : cart.bulldogPrice,
            poodle: id === 6 ? cart.poodle + 1 : cart.poodle,
            poodlePrice: id === 6 ? cart.poodlePrice === 0 ? price : cart.poodlePrice + price : cart.poodlePrice,
            husky: id === 7 ? cart.husky + 1 : cart.husky,
            huskyPrice: id === 7 ? cart.huskyPrice === 0 ? price : cart.huskyPrice + price : cart.huskyPrice,
            total: cart.total === 0 ? price : cart.total + price,

        })

    }

    const removeCart = (id, price) => {
        setCart({
            quantity: cart.quantity - 1,
            german: id === 1 ? cart.german - 1: cart.german,
            germanPrice: id === 1 ? cart.germanPrice - price : cart.germanPrice,
            retriever: id === 2 ? cart.retriever - 1: cart.retriever,
            retrieverPrice: id === 2 ? cart.retrieverPrice - price : cart.retrieverPrice,
            pomeranian: id === 3 ? cart.pomeranian - 1: cart.pomeranian,
            pomeranianPrice:  id === 3 ? cart.pomeranianPrice - price : cart.pomeranianPrice,
            bulldog: id === 4 ? cart.bulldog - 1: cart.bulldog,
            bulldogPrice: id === 4 ? cart.bulldogPrice - price : cart.bulldogPrice,
            poodle: id === 5 ? cart.poodle - 1: cart.poodle,
            poodlePrice: id === 5 ? cart.poodlePrice - price : cart.poodlePrice,
            husky: id === 6 ? cart.husky - 1: cart.husky,
            huskyPrice: id === 6 ? cart.huskyPrice - price : cart.huskyPrice,
            total: cart.total - price,
        })
    }


  return (
      <>
  {showItem ? <StripeContainer setCart={setCart} cart={cart} setShowItem={setShowItem} showItem={showItem} /> : <div className=' min-vh-100 bg-dark position-relative'>
      <div className='w-75 m-auto bg-dark text-white h-100 pt-5' >
            <Card.Body className='pt-5'>
                <div className='pt-3 row'>
               {pets.map((pet) => ( pet.id === 4 ? <div key={pet.id} className='w-100'></div> :
                   <Card key={pet.id} id="pet-card" className='border-0 shadow-lg m-4 p-4 col m-1'>
                       <img className=' m-auto' src={pet.img} width={150} height={100}/>
                       <div>
                        <h5 className='mt-2 pt-5'>
                        {pet.breed}
                        </h5>
                        <h6 className='m-2'>
                        Price: ${pet.price}
                        </h6>
                       </div>
                        <Button onClick={()=>onSubmit(pet.id, pet.price, pet.breed)}>Add to Cart</Button>
                   </Card>
               ))}
               </div>
            </Card.Body>
      </div>
        <nav id="nav-bar" className="navbar text-white fixed-top p-3">
            <div className="container-fluid">
                <form className="d-flex justify-content-between w-75 m-auto position-relative">
                    <h3 className='py-2'>Ford's Pet Shop</h3>
                    <Dropdown>
                    <Dropdown.Toggle variant="muted" className='text-white d-flex p-2' id="dropdown-basic">
                            <h4 className='mx-1 my-1'>Cart</h4>
                            <img className='m-1 my-1' src="cart.png" width={25} height={25}/>
                            <div className='position-absolute top-0 end-0 bg-primary rounded px-2'>
                            {cart.quantity ? cart.quantity : ''}
                            </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant='dark' className=''>
                        {cart.quantity === 0 ? <div className='p-3 '>The cart is empty</div> : null}
                        {cart.german ? <div className='d-flex px-5 py-2 position-relative border-bottom border-secondary'>
                                <img src="German.jpg" width={50} height={40}/> 
                                <div className='px-3'>German Shepherd({cart.german}) </div>
                                <span className='position-absolute top-0 end-0 mx-4' onClick={()=>removeCart(1, 2000)} style={{cursor: 'pointer'}}>x</span>
                            </div> : null}
                        {cart.retriever ? <div className='d-flex px-5 py-2 position-relative border-bottom border-secondary'>
                                <img src="Retriever.png" width={50} height={40}/> 
                                <div className=' px-3'>Golden Retriever({cart.retriever})</div>
                                <span className='position-absolute top-0 end-0 mx-4' onClick={()=>removeCart(2, 1500)} style={{cursor: 'pointer'}}>x</span>
                            </div> : null}
                        {cart.pomeranian ? <div className='d-flex px-5 py-2 position-relative border-bottom border-secondary'>
                                <img src="Pomeranian.jpg" width={50} height={40}/> 
                                <div className='px-3'>Pomeranian({cart.pomeranian})</div>
                                <span className='position-absolute top-0 end-0 mx-4' onClick={()=>removeCart(3, 2000)} style={{cursor: 'pointer'}}>x</span>

                            </div> : null}
                        {cart.bulldog ? <div className='d-flex px-5 py-2 position-relative border-bottom border-secondary'>
                                <img src="Bulldog.jpeg" width={50} height={40}/> 
                                <div className='px-3'>Bulldog({cart.bulldog})</div>
                                <span className='position-absolute top-0 end-0 mx-4' onClick={()=>removeCart(4, 2500)} style={{cursor: 'pointer'}}>x</span>

                            </div> : null}
                        {cart.poodle ? <div className='d-flex px-5 py-2 position-relative border-bottom border-secondary'>
                                <img src="Poodle.jpg" width={50} height={40}/> 
                                <div className=' px-3'>Poodle({cart.poodle})</div>
                                <span className='position-absolute top-0 end-0 mx-4' onClick={()=>removeCart(5, 4000)} style={{cursor: 'pointer'}}>x</span>

                            </div> : null}
                        {cart.husky ? <div className='d-flex px-5 py-2 position-relative border-bottom border-secondary'>
                                <img src="Husky.jpg" width={60} height={40}/> 
                                <div className='px-3'>Siberian Husky({cart.husky})</div>
                                <span className='position-absolute top-0 end-0 mx-4' onClick={()=>removeCart(6, 1500)} style={{cursor: 'pointer'}}>x</span>

                            </div> : null}
                        {cart.quantity > 0 ? <div className='w-100 p-3'>
                            <div className='d-flex justify-content-between pb-2'>
                                <div>TOTAL</div>
                                <div>${cart.total}</div>
                            </div> 
                            <Button className='btn-sm m-auto w-100' onClick={()=>setShowItem(!showItem)}>Check Out</Button>
                            </div>  : null }
                    </Dropdown.Menu>
                    </Dropdown>
                </form>
            </div>
            </nav>
    </div>}
    </>
    );
};


export default Dashboard;
