import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold">Our Policy</h1>
          <p className="text-lg text-gray-600">
            Read about our company's policies and terms.
          </p>
        </div>
        <div className="prose max-w-full">
          <h2>Privacy Policy</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ullamcorper purus nec mauris dictum, non tempus justo cursus.
          </p>
          <h2>Terms and Conditions</h2>
          <p>
            In posuere risus vel vehicula dignissim. Sed vitae est vel erat
            scelerisque iaculis.
          </p>
          {/* Add more policy content as needed */}
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
