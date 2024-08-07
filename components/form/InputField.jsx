import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, name, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-2 text-sm font-bold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out 
                    border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
      />
    </div>
  );
};

export default InputField;
