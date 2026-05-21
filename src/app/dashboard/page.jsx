"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  PawPrint,
  Plus,
  List,
  Heart,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  AlertDialog,
  Button,
} from "@heroui/react";

const Dashboard = () => {
  const [activeTab, setActiveTab] =
    useState("listings");

  const [myListings, setMyListings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // Fetch pets
  useEffect(() => {
    fetch("http://localhost:5000/petadoption")
      .then((res) => res.json())
      .then((data) => {
        setMyListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load pets");
        setLoading(false);
      });
  }, []);

  // Fake request data
  const myRequests = [
    {
      id: 1,
      petName: "Charlie",
      status: "pending",
      date: "2026-05-15",
      pickupDate: "2026-05-25",
    },
    {
      id: 2,
      petName: "Bella",
      status: "approved",
      date: "2026-05-10",
      pickupDate: "2026-05-20",
    },
  ];

  // Delete pet
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/petadoption/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setMyListings((prev) =>
          prev.filter((pet) => pet._id !== id)
        );

        toast.success(
          "Pet deleted successfully"
        );
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 text-white font-medium"
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition"
          >
            My Listings
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="ml-72 flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">
                Dashboard
              </h1>

              <p className="text-gray-400 mt-2">
                Manage your pets and adoption
                requests
              </p>
            </div>

            <Link
              href="/add-pet"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:brightness-110 transition font-medium"
            >
              <Plus size={20} />
              Add New Pet
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#1E2937] p-6 rounded-3xl border border-gray-700">
              <p className="text-gray-400">
                My Listings
              </p>

              <p className="text-5xl font-bold mt-3">
                {myListings.length}
              </p>
            </div>

            <div className="bg-[#1E2937] p-6 rounded-3xl border border-gray-700">
              <p className="text-gray-400">
                Pending Requests
              </p>

              <p className="text-5xl font-bold text-orange-500 mt-3">
                {
                  myRequests.filter(
                    (r) => r.status === "pending"
                  ).length
                }
              </p>
            </div>

            <div className="bg-[#1E2937] p-6 rounded-3xl border border-gray-700">
              <p className="text-gray-400">
                Successful Adoptions
              </p>

              <p className="text-5xl font-bold text-green-500 mt-3">
                {
                  myListings.filter(
                    (p) =>
                      p.status === "adopted"
                  ).length
                }
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-8">
            <button
              onClick={() =>
                setActiveTab("listings")
              }
              className={`px-8 py-4 font-medium flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "listings"
                  ? "border-purple-500 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <List size={20} />
              My Listings
            </button>

            <button
              onClick={() =>
                setActiveTab("requests")
              }
              className={`px-8 py-4 font-medium flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "requests"
                  ? "border-purple-500 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <Heart size={20} />
              My Requests
            </button>
          </div>

          {/* Listings */}
          {activeTab === "listings" ? (
            loading ? (
              <p className="text-center text-xl py-20">
                Loading pets...
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((pet) => (
                  <div
                    key={pet._id}
                    className="bg-[#1E2937] rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500 transition"
                  >
                    <img
                      src={
                        pet.petImage ||
                        pet.image
                      }
                      alt={
                        pet.petname ||
                        pet.name
                      }
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-semibold">
                            {pet.petname ||
                              pet.name}
                          </h3>

                          <p className="text-gray-400">
                            {pet.breed}
                          </p>
                        </div>

                        <span
                          className={`px-4 py-1 text-sm font-medium rounded-full ${
                            pet.status ===
                            "adopted"
                              ? "bg-gray-500/20 text-gray-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {pet.status ||
                            "available"}
                        </span>
                      </div>

                      <div className="mt-4 text-sm text-gray-400">
                        <p>
                          Location:{" "}
                          {pet.location}
                        </p>

                        <p>
                          Fee: $
                          {pet.adoptionFee ||
                            pet.fee ||
                            0}
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="mt-8 flex gap-3">
                        {/* View */}
                        <Link
                          href={`/pet/${pet._id}`}
                          className="flex-1 py-3 border border-gray-600 rounded-2xl hover:bg-gray-800 transition flex items-center justify-center gap-2"
                        >
                          <Eye size={18} />
                          View
                        </Link>

                        {/* Edit */}
                        <button className="flex-1 py-3 border border-gray-600 rounded-2xl hover:bg-gray-800 transition flex items-center justify-center gap-2">
                          <Edit size={18} />
                          Edit
                        </button>

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
                                    Delete pet?
                                  </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body>
                                  <p>
                                    Are you sure
                                    you want to
                                    delete{" "}
                                    <strong>
                                      {pet.petname ||
                                        pet.name}
                                    </strong>
                                    ?
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
                                    Delete
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
            )
          ) : (
            /* Requests */
            <div className="bg-[#1E2937] rounded-3xl overflow-hidden border border-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-6">
                      Pet Name
                    </th>

                    <th className="text-left p-6">
                      Request Date
                    </th>

                    <th className="text-left p-6">
                      Pickup Date
                    </th>

                    <th className="text-left p-6">
                      Status
                    </th>

                    <th className="p-6 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {myRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="border-b border-gray-700 hover:bg-gray-800/50"
                    >
                      <td className="p-6 font-medium">
                        {req.petName}
                      </td>

                      <td className="p-6 text-gray-400">
                        {req.date}
                      </td>

                      <td className="p-6 text-gray-400">
                        {req.pickupDate}
                      </td>

                      <td className="p-6">
                        <span
                          className={`px-5 py-2 text-sm rounded-full ${
                            req.status ===
                            "approved"
                              ? "bg-green-500/20 text-green-400"
                              : req.status ===
                                "rejected"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td className="p-6 text-center">
                        <button className="text-purple-400 hover:text-purple-300 font-medium">
                          View Pet →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;