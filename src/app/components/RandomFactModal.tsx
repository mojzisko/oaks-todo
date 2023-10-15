import React, { useEffect, useState } from 'react';

interface RandomFactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RandomFactModal: React.FC<RandomFactModalProps> = ({ isOpen, onClose }) => {
  const [fact, setFact] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(response => response.json())
        .then(data => setFact(data.text))
        .catch(error => console.error('Error fetching random fact:', error));
    }
  }, [isOpen]);

  const handleClose = () => {
    setFact(null); 
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed text-black inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">Random Fact</h2>
        <p>{fact || 'Loading...'}</p>
        <button onClick={handleClose} className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white">
          Close
        </button>
      </div>
    </div>
  );
};

export default RandomFactModal;
