"use client";

import { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  TextArea,
} from "@heroui/react";

import { Edit, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function EditModal({ pet, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    petname: pet?.petname || "",
    species: pet?.species || "",
    breed: pet?.breed || "",
    age: pet?.age || "",
    gender: pet?.gender || "",
    petImage: pet?.petImage || "",
    healthStatus: pet?.healthStatus || "",
    vaccinationStatus: pet?.vaccinationStatus || "",
    location: pet?.location || "",
    adoptionFee: pet?.adoptionFee || pet?.fee || "",
    description: pet?.description || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/petadoption/${pet._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Pet updated successfully!");
        setIsOpen(false);

        if (onUpdate) {
          onUpdate(formData);
        }
      } else {
        toast.error("No changes made");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 py-3 border border-gray-600 rounded-2xl hover:bg-gray-800 transition flex items-center justify-center gap-2"
      >
        <Edit size={18} />
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E2937] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Edit Pet Listing
              </h2>

              <Form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <TextField name="petname" isRequired>
                  <Label>Pet Name</Label>
                  <Input
                    value={formData.petname}
                    onChange={handleChange}
                    placeholder="Pet name"
                  />
                  <FieldError />
                </TextField>

                <TextField name="species" isRequired>
                  <Label>Species</Label>
                  <Input
                    value={formData.species}
                    onChange={handleChange}
                    placeholder="Dog / Cat"
                  />
                </TextField>

                <TextField name="breed" isRequired>
                  <Label>Breed</Label>
                  <Input
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Golden Retriever"
                  />
                </TextField>

                <TextField name="age" isRequired>
                  <Label>Age</Label>
                  <Input
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="2"
                  />
                </TextField>

                <TextField name="gender" isRequired>
                  <Label>Gender</Label>
                  <Input
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Male / Female"
                  />
                </TextField>

                <TextField name="petImage" isRequired>
                  <Label>Pet Image</Label>
                  <Input
                    value={formData.petImage}
                    onChange={handleChange}
                    placeholder="Image URL"
                  />
                </TextField>

                <TextField name="healthStatus" isRequired>
                  <Label>Health Status</Label>
                  <Input
                    value={formData.healthStatus}
                    onChange={handleChange}
                    placeholder="Good"
                  />
                </TextField>

                <TextField name="vaccinationStatus" isRequired>
                  <Label>Vaccination Status</Label>
                  <Input
                    value={formData.vaccinationStatus}
                    onChange={handleChange}
                    placeholder="Vaccinated"
                  />
                </TextField>

                <TextField name="location" isRequired>
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Dhaka"
                  />
                </TextField>

                <TextField name="adoptionFee" isRequired>
                  <Label>Adoption Fee</Label>
                  <Input
                    value={formData.adoptionFee}
                    onChange={handleChange}
                    placeholder="100"
                  />
                </TextField>

                <TextField name="description" isRequired>
                  <Label>Description</Label>

                  <TextArea
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Pet description"
                  />

                  <FieldError />
                </TextField>

                <div className="flex gap-3 mt-4">
                  <Button
                    type="button"
                    onPress={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" variant="solid">
                    <Check size={18} />
                    Update Pet
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}