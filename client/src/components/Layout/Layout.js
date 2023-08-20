import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main className="min-h-[80vh]">
              <Toaster/>
              {children}</main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
  title: "Ecommerce app - Bazar Shodai",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "AsmRajuwan",
};

export default Layout;
