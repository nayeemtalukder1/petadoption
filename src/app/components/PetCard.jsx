"use client";

import Link from 'next/link';
import { Heart, MapPin, Calendar, Clock } from 'lucide-react';

const PetCard = ({ pet }) => {
  return (
    <div className="group bg-[#1E2937] border border-gray-800 hover:border-purple-500 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
      
      {/* Pet Image */}
      <div className="relative">
        <img
          src={pet.petImage || pet.image}
          alt={pet.petname || pet.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Species Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
            {pet.species}
          </span>
        </div>

        {/* Gender Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            pet.gender?.toLowerCase() === 'male' ? 'bg-blue-500' : 'bg-pink-500'
          } text-white`}>
            {pet.gender}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-1">
          {pet.petname || pet.name}
        </h3>
        
        <p className="text-gray-400 mb-4">{pet.breed}</p>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-purple-400" />
            <span>{pet.age} years old</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-purple-400" />
            <span>{pet.location}</span>
          </div>

          {pet.healthStatus && (
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-purple-400" />
              <span>{pet.healthStatus}</span>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div>
            <p className="text-xs text-gray-500">Adoption Fee</p>
            <p className="text-2xl font-semibold text-white">
              ${pet.adoptionFee || 0}
            </p>
          </div>

          <Link
            href={`/pet/${pet._id}`}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-2xl font-medium transition-all active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;