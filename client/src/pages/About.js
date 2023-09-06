import React from 'react';
import Layout from '../components/Layout/Layout';

const AboutUs = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold">About Us</h1>
          <p className="text-lg text-gray-600">
            Learn more about our company and mission.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6">
        
          <div className="md:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                We are a team of passionate individuals committed to providing
                high-quality products and excellent customer service.
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                ullamcorper purus nec mauris dictum, non tempus justo cursus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
