'use client'

import { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';

const AllPets = () => {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/petadoption')
      .then(res => res.json())
      .then(data => setPetData(data))
      .catch(err => console.error("Error fetching pets:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Available Pets</h1>
        <p className="text-gray-400 text-center mb-12">Find your perfect companion</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {petData.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPets;