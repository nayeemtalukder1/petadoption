'use client'

import React, { useEffect, useState } from 'react'

const Card = () => {
  const [petData, setPetData] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/petadoption')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setPetData(data)
      })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {
        petData.map((pet) => (
          <div key={pet._id} className="card bg-base-100 shadow-sm">
            <figure>
              <img
                className="h-60 w-full object-cover"
                src={pet.petImage}
                alt={pet.petname}
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {pet.petname}
                <div className="badge badge-secondary">
                  {pet.gender}
                </div>
              </h2>

              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age}</p>

              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  {pet.species}
                </div>

                <div className="badge badge-outline">
                  {pet.healthStatus}
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Card