import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { deleteCustomer } from "../data/customers";

export async function action({ params }) {
  await deleteCustomer(params.customerId);

  return redirect("/");
}

const Customer = ({ customer }) => {
  const navigate = useNavigate();
  const { name, phone, email, company, id } = customer;
  return (
    <tr className='border-b'>
      <th className='p-4 text-start space-y-2'>
        <p className='text-2xl text-gray-800'>{name}</p>
        <p>{company}</p>
      </th>
      <td className='p-6 text-center'>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Email: </span>
          {email}
        </p>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Phone: </span>
          {phone}
        </p>
      </td>
      <td className='p-6 flex gap-3 justify-between'>
        <button
          type='button'
          onClick={() => navigate(`/client/${id}/edit`)}
          className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
        >
          Edit
        </button>

        <Form
          method='post'
          action={`/client/${id}/destroy`}
          onSubmit={(e) => {
            if (!confirm("Do you want to delete this customer?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type='submit'
            className='text-red-600 hover:text-red-700 uppercase font-bold text-xs'
          >
            Delete
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Customer;
