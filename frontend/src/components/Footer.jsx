import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              BlogSphere
            </h1>

            <p className="text-gray-400 leading-7">
              Discover powerful stories, coding insights, tech updates,
              tutorials, and creative ideas from developers around the world.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 transition-all duration-300 p-3 rounded-full"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="bg-gray-800 hover:bg-sky-500 transition-all duration-300 p-3 rounded-full"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="bg-gray-800 hover:bg-pink-600 transition-all duration-300 p-3 rounded-full"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-500 transition-all duration-300 p-3 rounded-full"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-600 transition-all duration-300 p-3 rounded-full"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3">
              {[
                "Home",
                "Blogs",
                "Categories",
                "About",
                "Contact",
              ].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <FaArrowRight className="text-sm" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5">
              Categories
            </h2>

            <ul className="space-y-3">
              {[
                "Web Development",
                "AI & Machine Learning",
                "Programming",
                "Cyber Security",
                "Career Guidance",
              ].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <FaArrowRight className="text-sm" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5">
              Subscribe
            </h2>

            <p className="text-gray-400 mb-5">
              Get the latest blogs, tutorials, and tech news directly in your
              inbox.
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500"
              />

              <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-lg font-semibold text-white">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} BlogSphere. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Terms & Conditions
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;