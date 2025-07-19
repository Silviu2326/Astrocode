import React from 'react';

export default function FormFirstTheme() {
  return (
    <div className="min-h-screen bg-teal-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-teal-900 mb-6">Contact Form</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-2">Message</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}