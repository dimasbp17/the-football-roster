'use client';

import React, { useEffect, useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scroolToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    const sections = ['home', 'about', 'skill', 'project'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition <= offsetTop + offsetHeight
        ) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed z-50 w-full px-4 py-5 md:px-20 font-lato">
        <div className="flex items-center justify-between">
          <div className="flex text-xl font-bold">
            <span className="text-white">TheFootball</span>
            <span className="text-yellow-500">ROSTER</span>
          </div>

          <div
            className="flex items-end justify-end w-full lg:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <IoClose className="text-2xl text-white" />
            ) : (
              <IoMenu className="text-2xl text-white" />
            )}
          </div>

          <div className="flex items-center text-white">
            <ul
              className={`absolute lg:static top-16 left-0 w-full  flex flex-col items-center space-y-5 py-5 transition-all duration-300 text-base lg:flex lg:flex-row lg:space-y-0 lg:space-x-24 font-semibold lg:py-0 lg:opacity-100 lg:visible ${
                isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <li>
                <button
                  onClick={() => scroolToSection('home')}
                  className={activeSection === 'home' ? 'text-yellow-500' : ''}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scroolToSection('about')}
                  className={activeSection === 'about' ? 'text-yellow-500' : ''}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scroolToSection('skill')}
                  className={activeSection === 'skill' ? 'text-yellow-500' : ''}
                >
                  Skill
                </button>
              </li>
              <li>
                <button
                  onClick={() => scroolToSection('project')}
                  className={
                    activeSection === 'project' ? 'text-yellow-500' : ''
                  }
                >
                  Project
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
