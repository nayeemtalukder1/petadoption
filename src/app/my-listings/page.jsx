"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PawPrint,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";

import toast from "react-hot-toast";

import EditModal from "../components/EditModel";

import {
  AlertDialog,
  Button,
} from "@heroui/react";

const MyListings = () => {
  const [petData, setPetData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pets
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/petadoption`)
      .then((res) => res.json())
      .then((data) => {
        setPetData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pets:", err);
        toast.error("Failed to load listings");
        setLoading(false);
      });
  }, []);

  // Delete pet
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/petadoption/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setPetData((prev) =>
          prev.filter((pet) => pet._id !== id)
        );

        toast.success("Pet deleted successfully");
      } else {
        toast.error("Failed to delete pet");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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

          <h1 className="text-3xl font-bold">
            PetNest
          </h1>
        </div>

        <div className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/add-pet"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Add Pet
          </Link>

          <Link
            href="/my-listings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 text-white font-medium"
          >
            My Listings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">
                My Listings
              </h1>

              <p className="text-gray-400 mt-2">
                Manage all your pet listings
              </p>
            </div>

            <Link
              href="/add-pet"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-2xl hover:brightness-110 transition"
            >
              <Plus size={20} />
              Add New Pet
            </Link>
          </div>

          {/* Loading */}
          {loading ? (
            <p className="text-center text-xl py-20">
              Loading your listings...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {petData.map((pet) => (
                <div
                  key={pet._id}
                  className="bg-[#1E2937] rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500 transition"
                >
                  {/* Image */}
                  <img
                    src={pet.petImage || pet.image}
                    alt={pet.petname || pet.name}
                    className="w-full h-52 object-cover"
                  />

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {pet.petname || pet.name}
                        </h3>

                        <p className="text-gray-400">
                          {pet.breed}
                        </p>
                      </div>

                      <span className="px-4 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                        Available
                      </span>
                    </div>

                    {/* Info */}
                    <div className="mt-4 text-sm text-gray-400 space-y-1">
                      <p>
                        Location: {pet.location}
                      </p>

                      <p>
                        Fee: $
                        {pet.adoptionFee ||
                          pet.fee ||
                          0}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-3">
                      {/* View */}
                      <Link
                        href={`/pet/${pet._id}`}
                        className="flex-1 py-3 border border-gray-600 rounded-2xl hover:bg-gray-800 transition flex items-center justify-center gap-2"
                      >
                        <Eye size={18} />
                        View
                      </Link>

                      {/* Edit */}
                      <EditModal
                        pet={pet}
                        onUpdate={(updatedPet) => {
                          setPetData((prev) =>
                            prev.map((p) =>
                              p._id === pet._id
                                ? {
                                    ...p,
                                    ...updatedPet,
                                  }
                                : p
                            )
                          );
                        }}
                      />

                      {/* Delete */}
                      <AlertDialog>
                        <Button variant="danger">
                          <Trash2 size={18} />
                          Delete
                        </Button>

                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-[400px]">
                              <AlertDialog.CloseTrigger />

                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />

                                <AlertDialog.Heading>
                                  Delete pet permanently?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>

                              <AlertDialog.Body>
                                <p>
                                  This will permanently
                                  delete{" "}
                                  <strong>
                                    {pet.petname}
                                  </strong>
                                  . This action cannot be
                                  undone.
                                </p>
                              </AlertDialog.Body>

                              <AlertDialog.Footer>
                                <Button
                                  slot="close"
                                  variant="tertiary"
                                >
                                  Cancel
                                </Button>

                                <Button
                                  slot="close"
                                  variant="danger"
                                  onPress={() =>
                                    handleDelete(
                                      pet._id
                                    )
                                  }
                                >
                                  Delete Pet
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {petData.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                You haven't added any pets yet.
              </p>

              <Link
                href="/add-pet"
                className="text-purple-400 hover:underline mt-4 inline-block"
              >
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