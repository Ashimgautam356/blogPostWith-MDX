

import React from 'react'


type CallToActionProps = {
  url: string;
  children: React.ReactNode;
};


const CalltoAction = ({ url, children }: CallToActionProps) => {
  return (
    <div className="my-6 text-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        {children}
      </a>
    </div>
  )
}

export default CalltoAction