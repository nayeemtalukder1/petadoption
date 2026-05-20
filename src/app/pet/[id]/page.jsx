"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, MapPin, Calendar, User } from 'lucide-react';
import toast from 'react-hot-toast';

const PetDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No pet ID provided");
      setLoading(false);
      return;
    }

    console.log("Fetching pet with ID:", id); // For debugging

    fetch(`http://localhost:5000/petadoption/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Pet Data Received:", data); // For debugging
        setPet(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setError(err.message);
        setLoading(false);
        toast.error("Failed to load pet details");
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="text-2xl">Loading pet details...</div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold mb-4">Pet Not Found</h2>
          <p className="text-gray-400 mb-8">
            The pet you're looking for might have been adopted or doesn't exist.
          </p>
          <Link 
            href="/all-pets"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-medium"
          >
            ← Browse All Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to All Pets
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <img
              src={pet.petImage || pet.image}
              alt={pet.petname || pet.name}
              className="w-full rounded-3xl shadow-2xl object-cover h-[580px]"
            />
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-2">{pet.petname || pet.name}</h1>
              <p className="text-2xl text-gray-400">{pet.breed}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1E2937] p-6 rounded-2xl">
                <p className="text-gray-400">Age</p>
                <p className="text-4xl font-bold mt-2">{pet.age} years</p>
              </div>
              <div className="bg-[#1E2937] p-6 rounded-2xl">
                <p className="text-gray-400">Gender</p>
                <p className="text-4xl font-bold mt-2 capitalize">{pet.gender}</p>
              </div>
            </div>

            <div className="bg-[#1E2937] p-6 rounded-2xl flex items-center gap-4">
              <MapPin className="text-purple-400" size={28} />
              <div>
                <p className="text-gray-400">Location</p>
                <p className="text-lg">{pet.location}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">About this pet</h3>
              <p className="text-gray-300 leading-relaxed text-[17px]">
                {pet.description || "This wonderful pet is looking for a loving forever home."}
              </p>
            </div>

            <button
              onClick={() => toast.success("Adoption request feature coming soon!")}
              className="w-full py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-xl font-semibold hover:brightness-110 transition"
            >
              <Heart className="inline mr-3" /> Adopt Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;