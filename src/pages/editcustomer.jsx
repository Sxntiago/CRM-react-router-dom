import React from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import Error from "../components/Error";
import { getCustomer } from "../data/customers";
import { updateCustomer } from "../data/customers";

export async function loader({ params }) {
  const customer = await getCustomer(params.customerId);
  if (Object.values(customer).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "The client does not exist",
    });
  }
  return customer;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const error = [];
  if (Object.values(data).includes("")) {
    error.push("All the fields are required");
  }

  if (Object.keys(error).length) {
    return error;
  }

  await updateCustomer(params.customerId, data);

  return redirect("/");
}

const EditCustomer = () => {
  const error = useActionData();
  const customer = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Edit Customers</h1>
      <p className='mt-3'>Edit customer</p>

      <div className='flex justify-end'>
        <button
          onClick={() => navigate(-1)}
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
        >
          Back
        </button>
      </div>
      <div className='mt-20 bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>
        {error?.length && error.map((err, i) => <Error key={i}>{err}</Error>)}

        <Form method='post'>
          <ApplicationForm customer={customer} />

          <input
            value='Save customer'
            type='submit'
            className='rounded-md mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
          />
        </Form>
      </div>
    </>
  );
};

export default EditCustomer;
