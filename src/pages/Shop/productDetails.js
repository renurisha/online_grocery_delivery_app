import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productimage1 from "../../images/product-img-1.jpg";
import productimage2 from "../../images/product-img-2.jpg";
import productimage3 from "../../images/product-img-3.jpg";
import productimage4 from "../../images/product-img-4.jpg";
import productimage5 from "../../images/product-img-5.jpg";
import { MagnifyingGlass } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { getItemDetails } from "../../api";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});

  console.log("itemsmsdetailslls", id);
  // loading
  const [loaderStatus, setLoaderStatus] = useState(true);
  useEffect(() => {
    if (id && Object.values(data).length == 0) {
      getItemDetails(id)
        .then((res) => {
          console.log("responsnsnsns", res);
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
    setTimeout(() => {
      setLoaderStatus(false);
    }, 1500);
  }, [id]);

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
              <ScrollToTop />
            </>
            <>
              <div>
                {/* section*/}

                {/* section */}
                <section className="mb-lg-14 mb-8 mt-8">
                  <div className="container">
                    {/* row */}
                    <div className="row">
                      <div className="col-12">
                        {/* card */}
                        <div className="card py-1 border-0 mb-8">
                          <div>
                            <h1 className="fw-bold">Product Details</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* row */}
                    <div className="row">
                      <div className="col-lg-8 col-md-7">
                        <div className="col">
                          {/* card */}
                          <div className="card card-product">
                            <div className="card-body">
                              {/* badge */}
                              <div className="text-center position-relative">
                                <Link to="#!">
                                  <img
                                    src={data?.image_url}
                                    alt="Grocery Ecommerce Template"
                                    className="mb-3 img-fluid"
                                  />
                                </Link>
                                {/* action btn */}
                                <div className="card-product-action">
                                  <Link
                                    to="#!"
                                    className="btn-action"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal"
                                  >
                                    <i
                                      className="bi bi-eye"
                                      data-bs-toggle="tooltip"
                                      data-bs-html="true"
                                      title="Quick View"
                                    />
                                  </Link>
                                  <Link
                                    to="#!"
                                    className="btn-action"
                                    data-bs-toggle="tooltip"
                                    data-bs-html="true"
                                    title="Wishlist"
                                  >
                                    <i className="bi bi-heart" />
                                  </Link>
                                  <Link
                                    to="#!"
                                    className="btn-action"
                                    data-bs-toggle="tooltip"
                                    data-bs-html="true"
                                    title="Compare"
                                  >
                                    <i className="bi bi-arrow-left-right" />
                                  </Link>
                                </div>
                              </div>
                              {/* heading */}
                              <div className="text-small mb-1">
                                <Link
                                  to="#!"
                                  className="text-decoration-none text-muted"
                                >
                                  <small>{data?.description}</small>
                                </Link>
                              </div>
                              <h2 className="fs-6">
                                <Link
                                  to="#!"
                                  className="text-inherit text-decoration-none"
                                >
                                  {data?.name}
                                </Link>
                              </h2>
                              <div className="text-warning">
                                {/* rating */}
                                <small>
                                  {" "}
                                  <i className="bi bi-star-fill" />
                                  <i className="bi bi-star-fill" />
                                  <i className="bi bi-star-fill" />
                                  <i className="bi bi-star-fill" />
                                  <i className="bi bi-star-fill" />
                                </small>{" "}
                                <span className="text-muted small">
                                  5 (469)
                                </span>
                              </div>
                              {/* price */}
                              <div className="d-column justify-content-center align-items-center mt-3">
                                <div>
                                  <span className="">
                                    &#8377; {data?.price}
                                  </span>
                                </div>
                                {/* btn */}
                                <div
                                  onClick={() => {
                                    navigate(`/ShopCart/${data?.id}`);
                                  }}
                                >
                                  <Link
                                    to="#"
                                    className="btn btn-primary btn-sm"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={100}
                                      height={16}
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-plus"
                                    >
                                      <line x1={12} y1={5} x2={12} y2={19} />
                                      <line x1={5} y1={12} x2={19} y2={12} />
                                    </svg>{" "}
                                    Add
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
