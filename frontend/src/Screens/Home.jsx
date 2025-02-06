import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'


const Home = () => {

  const [search, setSearch] = useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);


  const loadData = async () => {

    let response = await fetch("https://foodfront.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      }
    })
    response = await response.json();

    
    setfoodItem(response[0])
    setFoodCat(response[1])

  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
              <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* //carousel */}

      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName)
                    && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                  ).map(filterItem => {
                    return (
                      <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                        <Card
                         foodItem={filterItem}
                          options={filterItem.options[0]}
                        />
                      </div>
                    )
                  }) : <div> No Search data Found </div>}
                </div>
              )
            })
            : ""
        }
        {/* <Card /> */}

      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
