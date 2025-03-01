import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to BiteBase</h1>
      <p className="mb-4">Your restaurant analytics platform</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Link to="/dashboard" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50">
          <h5 className="mb-2 text-xl font-bold tracking-tight">Restaurant Dashboard</h5>
          <p className="font-normal text-gray-700">View your restaurant analytics and insights.</p>
        </Link>
        
        <Link to="/settings" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50">
          <h5 className="mb-2 text-xl font-bold tracking-tight">Settings</h5>
          <p className="font-normal text-gray-700">Configure your account and preferences.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home; 