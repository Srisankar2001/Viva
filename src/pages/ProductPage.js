import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { isAuthenticated, logout } from "../services/Auth"
import { Navigate, useNavigate } from "react-router-dom"
import './ProductPage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../services/Auth";

function ProductPage() {
    const [brands, setBrands] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);

    ////T/////////
    const navigate= useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseBrand = await axios.get("http://localhost:8080/brand");
                const responseMobile = await axios.get("http://localhost:8080/products");
                setBrands(responseBrand.data);
                setMobiles(responseMobile.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [selectedBrand]);
    ///////////Tharsi//////////////
    const logoutUser=()=>{
        logout();
        navigate('/login')
    }
    //////////////////////

    const handleBrandClick = (brandId) => {
        setSelectedBrand(brandId);
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.querySelector('.button-container').style.display = 'flex';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.querySelector('.button-container').style.display = 'none';
    };

    return (
        <div>
            <NavBar logoutUser={logoutUser}/>
            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-left col-2" id="navbar">
                        <div className="container-fluid flex-column">
                            <a className="navbar-brand" href="#">Brands</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon bg-primary"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-column">
                                    {brands.map((brand) => (
                                        <li key={brand.id} className="nav-item">
                                            <a className="nav-link" href="#" onClick={() => handleBrandClick(brand.id)}>
                                                <img className="mx-2" src={`image/logos/${brand.location}`} height="30px" width="30px" alt={brand.name} />
                                                {brand.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="col-10">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {mobiles.filter(mobile => selectedBrand ? mobile.brand_id === selectedBrand : true).map((mobile, index) => (
                                <div key={index} className="col">
                                    <div className="card" style={{ width: "18rem", position: "relative" }}>
                                        <img src={`image/mobile/${mobile.location}`} className="card-img-top p-2" alt={mobile.name} height="120px" width="70px" />
                                        <div className="card-body" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                            <h5 className="card-title">{mobile.name}</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <div className="button-container" style={{ display: "none", position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
                                                {isAuthenticated() ?
                                                    <Link to='/cart'>
                                                        <button className="btn btn-secondary">Cart</button>
                                                    </Link>
                                                    :
                                                    <Link to='/login'>
                                                        <button className="btn btn-secondary">Cart</button>
                                                    </Link> }
                                                <Link to={`${mobile.id}`}>
                                                    <button className="btn btn-secondary">View</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
