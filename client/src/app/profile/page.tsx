"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<InputProps> = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div className="sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type={type}
            name={name}
            id={name}
            autoComplete={name}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const logout = async () => {
    try {
      await axios.get("api/auth/signout");
      router.push("/signup");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        console.log(res.data);
        setData(res.data.data._id);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    getUserDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <CustomInput
              label="Username"
              type="text"
              name="username"
              placeholder="janesmith"
              value={data.username}
              onChange={handleInputChange}
            />
            <CustomInput
              label="Email"
              type="email"
              name="email"
              placeholder="janesmith@example.com"
              value={data.email}
              onChange={handleInputChange}
            />

            <CustomInput
              label="First Name"
              type="text"
              name="firstName"
              placeholder="John"
              value={data.firstName}
              onChange={handleInputChange}
            />

            <CustomInput
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Doe"
              value={data.lastName}
              onChange={handleInputChange}
            />

            <CustomInput
              label="Address"
              type="text"
              name="address"
              placeholder="123 Main St"
              value={data.address}
              onChange={handleInputChange}
            />

            <CustomInput
              label="Country"
              type="text"
              name="country"
              placeholder="United States"
              value={data.country}
              onChange={handleInputChange}
            />

            <CustomInput
              label="City"
              type="text"
              name="city"
              placeholder="Anytown"
              value={data.city}
              onChange={handleInputChange}
            />

            <CustomInput
              label="State"
              type="text"
              name="state"
              placeholder="CA"
              value={data.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Other sections go here */}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

