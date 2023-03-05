import React from "react";
import { useLoaderData } from "react-router-dom";
import Customer from "../components/Customer";
import { getCustomers } from "../data/customers";

export function loader() {
  const customers = getCustomers();

  return customers;
}

const Index = () => {
  const data = useLoaderData();
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Customers</h1>
      <p className='mt-3'>Managment Customer</p>
      {data.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Customer</th>
              <th className='p-2'>Contact</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <Customer customer={customer} key={customer.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center mt-10'> No customers yet</p>
      )}
    </>
  );
};

export default Index;
