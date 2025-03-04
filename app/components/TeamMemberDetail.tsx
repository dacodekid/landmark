import React from 'react';
import Image from 'next/image';

interface TeamMemberDetailProps {
  name: string;
  picture: string;
  bio: string;
  role: string;
  onClose: () => void;
}

export const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({ name, picture, bio, role, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black p-8 overflow-y-auto z-50">
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-2xl font-normal"
        >
          ×
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gray-900 rounded-lg w-full h-full mx-auto team-member-detail">
        <div className="lg:w-1/2 w-full">
          <Image 
            src={picture} 
            alt={name} 
            width={1200}
            height={800}
            className="w-full h-auto max-h-[100vh] object-contain rounded-lg"
            priority
          />
        </div>
        <div className="lg:w-1/2 w-full text-white overflow-y-auto">
          <h2 className="text-4xl font-normal mb-4">{name}</h2>
          <p className="text-gray-400 text-xl mb-6 font-normal">{role}</p>
          <p 
            className="text-gray-300 text-lg mb-8 font-normal"
            dangerouslySetInnerHTML={{ __html: bio.replace(/\n/g, '<br />') }}
          />
        </div>
      </div>
    </div>
  );
};
