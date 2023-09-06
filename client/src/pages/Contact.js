import React from 'react';
import Layout from '../components/Layout/Layout';

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Feel free to reach out to us.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6">
          
          <div className="md:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions or inquiries, please fill out the
                form below or contact us using the information provided.
              </p>
              <form className=' justify-center'>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Message
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
                  rows="4"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
              >
                Submit
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
