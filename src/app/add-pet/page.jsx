"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PawPrint } from 'lucide-react';
import toast from 'react-hot-toast';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, Select, ListBox, TextArea} from "@heroui/react";


const AddPet = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
  });

 
  const onSubmit = (e) => {
     e.preventDefault();
     const form = e.target;
     const data = new FormData(form);
     const petData = Object.fromEntries(data.entries());
     console.log(petData);
     toast.success("Pet listing created successfully!");

     fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/petadoption`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(petData)
     })
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
     })
     .catch(error => {
       console.error('Error:', error);
     });

  };

  return (
    <div className="min-h-screen bg-white text-black flex">
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
          
          <Link href="/add-pet" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-600 text-white font-medium">
            + Add Pet
          </Link>

          <Link href="/my-listings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition">
            My Listings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>

          <h1 className="text-4xl font-bold mb-2">Add a Pet Listing</h1>
          <p className="text-gray-400 mb-10">Help a pet find their forever home by creating a detailed listing.</p>

          <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
           <TextField
            isRequired
            name="petname"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Pet Name</Label>
            <Input placeholder="Cooper" />
            <FieldError />
          </TextField>

          <Select className="w-[256px]" name='species' placeholder="Select one">
      <Label>Species</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
    <TextField
            isRequired
            name="breed"
          >
            <Label>Breed</Label>
            <Input placeholder="Golden Retriever" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="age"
          >
            <Label>Age(years)</Label>
            <Input placeholder="2 years" />
            <FieldError />
          </TextField>
          <Select className="w-[256px]" name='gender' placeholder="Select one">
      <Label>Gender</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="male" textValue="male">
            Male
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="female" textValue="female">
            Female
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
    <Select className="w-[256px]" name='vaccinationStatus' placeholder="Select one">
      <Label>Vaccination Status</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="vaccinated" textValue="vaccinated">
            Vaccinated
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="not-vaccinated" textValue="not-vaccinated">
            Not Vaccinated
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
    <TextField
            isRequired
            name="petImage"
          >
            <Label>Pet Image URL</Label>
            <Input placeholder="https://example.com/pet-image.jpg" />
            <FieldError />
          </TextField>
    <Select className="w-[256px]" name='healthStatus' placeholder="Select one">
      <Label>Health Status</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="good" textValue="Good">
            Good
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="bad" textValue="Bad">
            Bad
            <ListBox.ItemIndicator />
          </ListBox.Item>
          
        </ListBox>
      </Select.Popover>
    </Select>
    <TextField
            isRequired
            name="location"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Location</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="fee"
          >
            <Label>Adoption Fee($) - Enter 0 for free</Label>
            <Input placeholder="0" />
            <FieldError />
          </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Owner Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
            isRequired
            name="description"
            validate={(value) => {
              if (value.length < 10) {
                return "Description must be at least 10 characters";
              }
              return null;
            }}
          >
            <Label>Description</Label>
            <TextArea placeholder="Tell us the pet..." />
            <Description>Minimum 10 characters</Description>
            <FieldError />
          </TextField>
      <div className="flex gap-2">
        <Button type="reset">
          
          Cancel
        </Button>
        <Button type="submit" variant="secondary">
          <Check />
          Add Pet Listing
        </Button>
      </div>
    </Form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;