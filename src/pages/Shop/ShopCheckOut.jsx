import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import productimage1 from '../../images/product-img-1.jpg'
import productimage2 from '../../images/product-img-2.jpg'
import productimage3 from '../../images/product-img-3.jpg'
import productimage4 from '../../images/product-img-4.jpg'
import { MagnifyingGlass } from 'react-loader-spinner'
import ScrollToTop from "../ScrollToTop";


const ShopCheckOut = () => {

  const data = JSON.parse(localStorage.getItem("productData"))||"";
  const [address,setAddress]=useState({})
  const [addressSubmit,setAddressSubmit]=useState(false)
  const [paymentMethod,setPaymentMethod]=useState("")
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  const [errorMessage,setErrorMessage]=useState("")
  const [orderPlaced,setOrderPlaced]=useState(false)

  const [paymentDetails,setPaymentDetails]=useState({})
   // loading
   const [loaderStatus, setLoaderStatus] = useState(true);
   useEffect(() => {
     setTimeout(() => {
       setLoaderStatus(false);
     }, 1500);
   }, []);

   const totalPrice=(cartData)=>{
    const total =  cartData?.reduce((sum, item) => sum + item.price, 0)
  return total
    }
 

    console.log("setPaymentDetails",paymentDetails)
  return (
    <div>
      <div>
      {loaderStatus ? (
        <div className="loader-container">
          {/* <PulseLoader loading={loaderStatus} size={50} color="#0aad0a" /> */}
          <MagnifyingGlass
  visible={true}
  height="100"
  width="100"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperclassName="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#0aad0a"
  />
        </div>
      ) : (
        <>
         <>
            <ScrollToTop/>
            </>
      <>
        {/* section */}
        <section className="mb-lg-14 mb-8 mt-8">
          <div className="container">
            {/* row */}
            <div className="row">
              {/* col */}
              <div className="col-12">
                <div>
                  <div className="mb-8">
                    {/* text */}
                    <h1 className="fw-bold mb-0">Checkout</h1>
                    <p className="mb-0">
                      Already have an account? Click here to{" "}
                      <Link to="/MyAccountSignIn">Sign in</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* row */}
              <div className="row">

                {orderPlaced && <div  className="col-lg-7 col-md-12 text-primary fs-5 text-center shadow p-3 mb-5 bg-white rounded border d-flex justify-content-center align-items-center">Order Placed Successfully...</div>}
                {!orderPlaced && 
                <div className="col-lg-7 col-md-12">
                  {/* accordion */}
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    {/* accordion item */}
                    <div className="accordion-item py-4">
                      <div className="d-flex justify-content-between align-items-center">
                        {/* heading one */}
                        <Link
                          to="#"
                          className="fs-5 text-inherit collapsed h4"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="true"
                          aria-controls="flush-collapseOne"
                        >
                          <i className="feather-icon icon-map-pin me-2 text-muted" />
                          Add delivery address
                        </Link>
                        {/* btn */}
                        <Link
                          to="#"
                          className="btn btn-outline-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#addAddressModal"
                        >
                          Add a new address{" "}
                        </Link>
                        {/* collapse */}
                      </div>
                      {addressSubmit && 
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="mt-5">
                          <div className="row">
                            <div className="col-lg-6 col-12 mb-4">
                              {/* form */}
                              <div className="border p-6 rounded-3">
                                <div className="form-check mb-4">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="homeRadio"
                                    defaultChecked
                                  />
                                  <label
                                    className="form-check-label text-dark"
                                    htmlFor="homeRadio"
                                  >
                                    Home
                                  </label>
                                </div>
                                {/* address */}
                                <address>
                                  {" "}
                                  <strong>{address?.first_name} {address?.last_name}</strong> <br /> 
                                  {address?.address_1} <br />
                                 {address?.address_2}
                                  <br />
                                  <abbr title="Phone">{address?.pincode}</abbr>
                                </address>
                                
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>}
                    </div>


                    {/* accordion item */}
                    <div className="accordion-item py-4">
                      <Link
                        to="#"
                        className="text-inherit h5"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                      >
                        <i className="feather-icon icon-credit-card me-2 text-muted" />
                        Payment Method
                        {/* collapse */}{" "}
                      </Link>
                      <div
                        id="flush-collapseFour"
                        className="accordion-collapse collapse "
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="mt-5">
                          <div>
                            <div className="card card-bordered shadow-none mb-2">
                              {/* card body */}
                              <div className="card-body p-6">
                                <div className="d-flex">
                                  <div className="form-check">
                                    {/* checkbox */}
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="paypal"
                                      onChange={()=>{
                                        setPaymentMethod("PAYPAL")
                                      }}
                                    />
                                    <label
                                      className="form-check-label ms-2"
                                      htmlFor="paypal"
                                    ></label>
                                  </div>
                                  <div>
                                    {/* title */}
                                    <h5 className="mb-1 h6">
                                      {" "}
                                      Payment with Paypal
                                    </h5>
                                    <p className="mb-0 small">
                                      You will be redirected to PayPal website
                                      to complete your purchase securely.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* card */}
                            <div className="card card-bordered shadow-none mb-2">
                              {/* card body */}
                              <div className="card-body p-6">
                                <div className="d-flex mb-4">
                                  <div className="form-check ">
                                    {/* input */}
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="creditdebitcard"
                                      onChange={()=>{
                                        setPaymentMethod("CREDIT")
                                      }}
                                    />
                                    <label
                                      className="form-check-label ms-2"
                                      htmlFor="creditdebitcard"
                                    ></label>
                                  </div>
                                  <div>
                                    <h5 className="mb-1 h6">
                                      {" "}
                                      Credit / Debit Card
                                    </h5>
                                    <p className="mb-0 small">
                                      Safe money transfer using your bank accou
                                      k account. We support Mastercard tercard,
                                      Visa, Discover and Stripe.
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    {/* input */}
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Card Number
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="1234 4567 6789 4321"

                                        onClick={(e)=>{
                                          setPaymentDetails({...paymentDetails,"card_number":e.target.value})
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-12">
                                    {/* input */}
                                    <div className="mb-3 mb-lg-0">
                                      <label className="form-label">
                                        Name on card{" "}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your first name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-12">
                                    {/* input */}
                                    <div className="mb-3  mb-lg-0 position-relative">
                                      <label className="form-label">
                                        Expiry date{" "}
                                      </label>
                                      <input
                                        className="form-control flatpickr "
                                        type="text"
                                        placeholder="Select Date"
                                        onClick={(e)=>{
                                          setPaymentDetails({...paymentDetails,"expiry_date":e.target.value})
                                        }}
                                      />
                                      <div className="position-absolute bottom-0 end-0 p-3 lh-1">
                                        <i className="bi bi-calendar text-muted" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-12">
                                    {/* input */}
                                    <div className="mb-3  mb-lg-0">
                                      <label className="form-label">
                                        CVV code{" "}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder={312}
                                        onClick={(e)=>{
                                          setPaymentDetails({...paymentDetails,"cvv":e.target.value})
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* card */}
                            
                            {/* card */}
                            <div className="card card-bordered shadow-none">
                              <div className="card-body p-6">
                                {/* check input */}
                                <div className="d-flex">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="cashonDelivery"
                                                                            onChange={()=>{
                                        setPaymentMethod("CASH")
                                      }}
                                    />
                                    <label
                                      className="form-check-label ms-2"
                                      htmlFor="cashonDelivery"
                                    ></label>
                                  </div>
                                  <div>
                                    {/* title */}
                                    <h5 className="mb-1 h6">
                                     
                                      Cash on Delivery
                                    </h5>
                                    <p className="mb-0 small">
                                      Pay with cash when your order is
                                      delivered.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Button */}
                            <div className="mt-5 d-flex justify-content-end">
                             <div className="text-danger fs-5">{errorMessage}</div>
                              <div  className="btn btn-primary ms-2" onClick={()=>{
                                if(address){

                                  if (!paymentMethod){
                                    setErrorMessage("Please Select payment Method")

                                  }
                               else if (paymentMethod=="CASH" ){
                                  if(errorMessage.length){
                                    setErrorMessage("")
                                    setOrderPlaced(true)

                                  }
                                }

                                else if (paymentMethod=="CREDIT" ){
                                  if(Object.values(paymentDetails).length==0){
                                    setErrorMessage("Please Enter Card Details")
                                   
                                  }
                                  else{
                                    if(errorMessage.length){
                                      setErrorMessage("")
                                      setOrderPlaced(true)
                                    }

                                  }
                                }

                                else if (paymentMethod=="PAYPAL" ){
                                 
                                    if(errorMessage.length){
                                      setErrorMessage("")
                                      setOrderPlaced(true)
                                    

                                  }
                                }
                              
                              }

                              else{
                              
                                  setErrorMessage("Please Enter Address Details")
                                 
                                
                              }
                                
                              }}>
                                Place Order
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
                <div className="col-12 col-md-12 offset-lg-1 col-lg-4">
                  <div className="mt-4 mt-lg-0">
                    <div className="card shadow-sm">
                      <h5 className="px-6 py-4 bg-transparent mb-0">
                        Order Details
                      </h5>
                      <ul className="list-group list-group-flush">
                        {/* list group item */}

                        {cartData?.map((data)=>(                        <li className="list-group-item px-4 py-3">
                          <div className="row align-items-center">
                            <div className="col-2 col-md-2">
                              <img
                                src={data?.image_url}
                                alt="Ecommerce"
                                className="img-fluid"
                              />
                            </div>
                            <div className="col-5 col-md-5">
                              <h6 className="mb-0">{data?.description}</h6>
                              <span>
                                <small className="text-muted">{data?.name}</small>
                              </span>
                            </div>
                            <div className="col-2 col-md-2 text-center text-muted">
                              <span>1</span>
                            </div>
                            <div className="col-3 text-lg-end text-start text-md-end col-md-3">
                              <span className="fw-bold">&#8377;{data?.price}</span>
                            </div>
                          </div>
                        </li>))}





                        {/* list group item */}
                        <li className="list-group-item px-4 py-3">
                          <div className="d-flex align-items-center justify-content-between fw-bold">
                            <div>Subtotal</div>
                            <div>{totalPrice(cartData)}</div>
                           
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      <>
        <div>
          {/* Modal */}
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex={-1}
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">
                    Delete address
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <h6>Are you sure you want to delete this address?</h6>
                  <p className="mb-6">
                    Jitu Chauhan
                    <br />
                    4450 North Avenue Oakland, <br />
                    Nebraska, United States,
                    <br />
                    402-776-1106
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-gray-400"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
          <div
            className="modal fade"
            id="addAddressModal"
            tabIndex={-1}
            aria-labelledby="addAddressModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                {/* modal body */}
                <div className="modal-body p-6">
                  <div className="d-flex justify-content-between mb-5">
                    {/* heading */}
                    <div>
                      <h5 className="h6 mb-1" id="addAddressModalLabel">
                        New Shipping Address
                      </h5>
                      <p className="small mb-0">
                        Add new shipping address for your order delivery.
                      </p>
                    </div>
                    <div>
                      {/* button */}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                  </div>
                  {/* row */}
                  <div className="row g-3">
                    {/* col */}
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        aria-label="First name"
                        required
                        id="first_name"
                        onChange={(e) => setAddress({...address,first_name:e.target.value})} 
                        // setAddress
                      />
                    </div>
                    {/* col */}
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        aria-label="Last name"
                        required
                        id="last_name"
                        onChange={(e) => setAddress({...address,last_name:e.target.value})} 
                      />
                    </div>
                    {/* col */}
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                        id="address_1"
                        onChange={(e) => setAddress({...address,address_1:e.target.value})} 
                      />
                    </div>
                    <div className="col-12">
                      {/* button */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 2"
                        id="address_2"
                        onChange={(e) => setAddress({...address,address_2:e.target.value})} 
                      />
                    </div>
                    <div className="col-12">
                      {/* button */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        id="city"
                        onChange={(e) => setAddress({...address,city:e.target.value})} 
                      />
                    </div>

                   
                    <div className="col-12">
                      {/* button */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Zip Code"
                        id="pincode"
                        onChange={(e) => setAddress({...address,pincode:e.target.value})} 
                      />
                    </div>

                    {/* button */}
                    <div className="col-12 text-end">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-primary" onClick={(()=>{
                        localStorage.setItem("address",JSON.stringify(
                          
                        ))
                        setAddressSubmit(true)
                      })}>
                        Save Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
     </>
    )}
  </div>
    </div>
  );
};

export default ShopCheckOut;
