"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PawPrint, Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const MyListings = async () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      name: "Max",
      species: "Dog",
      breed: "Labrador Retriever",
      image: "https://i.ibb.co.com/5YkVv3k/dog1.jpg",
      status: "available",
      requests: 4,
      fee: 250,
      location: "Dhaka"
    },
    {
      id: 2,
      name: "Luna",
      species: "Cat",
      breed: "Persian",
      image: "https://i.ibb.co.com/0jK7Z3L/cat1.jpg",
      status: "adopted",
      requests: 7,
      fee: 150,
      location: "Chittagong"
    },
    {
      id: 3,
      name: "Tweety",
      species: "Bird",
      breed: "Budgerigar",
      image: "https://i.ibb.co.com/3zN7vKp/bird1.jpg",
      status: "available",
      requests: 2,
      fee: 0,
      location: "Sylhet"
    }
  ]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(pet => pet.id !== id));
      toast.success("Listing deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#1E2937] border-r border-gray-800 min-h-screen p-6 fixed">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <PawPrint className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold">PetNest</h1>
        </div>

        <div className="space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition">
            Dashboard
          </Link>
          
          <Link href="/add-pet" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition">
            <Plus size={20} />
            Add Pet
          </Link>

          <Link href="/my-listings" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 text-white font-medium">
            My Listings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">My Listings</h1>
              <p className="text-gray-400 mt-2">Manage all your pet listings</p>
            </div>
            <Link
              href="/add-pet"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-2xl hover:brightness-110 transition"
            >
              <Plus size={20} />
              Add New Pet
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((pet) => (
              <div key={pet.id} className="bg-[#1E2937] rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500 transition">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold">{pet.name}</h3>
                      <p className="text-gray-400">{pet.breed}</p>
                    </div>
                    <span className={`px-4 py-1 text-xs font-medium rounded-full ${
                      pet.status === 'available' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {pet.status}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    <p>Location: {pet.location}</p>
                    <p>Fee: ${pet.fee}</p>
                    <p>Requests: <span className="text-purple-400 font-medium">{pet.requests}</span></p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 py-3 border border-gray-600 rounded-2xl hover:bg-gray-800 transition flex items-center justify-center gap-2">
                      <Eye size={18} /> View
                    </button>
                    <button className="flex-1 py-3 border border-gray-600 rounded-2xl hover:bg-gray-800 transition flex items-center justify-center gap-2">
                      <Edit size={18} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(pet.id)}
                      className="flex-1 py-3 border border-red-500/30 text-red-400 rounded-2xl hover:bg-red-500/10 transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {listings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">You haven't added any pets yet.</p>
              <Link href="/add-pet" className="text-purple-400 hover:underline mt-4 inline-block">
                Add your first pet →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListings;