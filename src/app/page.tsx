"use client";

import { useEffect, useState } from "react";
import { formatPhoneNumber } from "./utils/formatting";
import { FilterBar } from "./components/FilterBar";

export type Adovcate = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Adovcate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Adovcate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append("searchTerm", searchTerm);
    }

    fetch(`/api/advocates?${params.toString()}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, [searchTerm]);

  return (
    <main style={{ margin: "24px" }}>
      <div className="rounded-lg bg-stone-300 mb-5 dark:bg-gray-800">
        <h1 className="flex justify-center p-3 text-3xl font-semibold dark:text-white">
          Solace Advocates
        </h1>
      </div>
      <p className="italic pl-2 dark:text-white">Search Filter</p>
      <FilterBar
        advocates={advocates}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <br />
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Degree
              </th>
              <th scope="col" className="px-6 py-3">
                Specialties
              </th>
              <th scope="col" className="px-6 py-3">
                Years of Experience
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate) => {
              return (
                <tr
                  key={`${advocate.id}-${advocate.lastName}`}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <td className="px-6 py-4">{advocate.firstName}</td>
                  <td className="px-6 py-4">{advocate.lastName}</td>
                  <td className="px-6 py-4">{advocate.city}</td>
                  <td className="px-6 py-4">{advocate.degree}</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc">
                      {advocate.specialties.map((s, index) => (
                        <li className="tabular-nums" key={`${index}-${s}`}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">{advocate.yearsOfExperience}</td>
                  <td className="px-6 py-4">
                    <div className="tabular-nums">
                      {formatPhoneNumber(advocate.phoneNumber)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
