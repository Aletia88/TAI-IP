import { useState } from 'react';
import photosData from './Photos.json';
import Modal from 'react-modal';

function Fasiledes() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [fasiledes, setFasiledes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');

  useState(() => {
    setFasiledes(photosData.slice(40, 75));
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalIsOpen(false);
  };

  const filterImages = () => {
    switch (currentCategory) {
      case 'Food':
        return fasiledes.slice(4, 8);
      case 'Animal':
        return fasiledes.slice(10, 20);
      case 'Nature':
        return fasiledes.slice(15,24);
        case 'Place':
        return fasiledes.slice(25)
      default:
        return fasiledes;
    }
  };

  return (
    <>
      <nav>
        <ul className='flex space-x-2 text-black text-lg m-5 '>
          <li onClick={() => setCurrentCategory('All')}>All</li>
          <li onClick={() => setCurrentCategory('Animal')}>Animal</li>
          <li onClick={() => setCurrentCategory('Nature')}>Nature</li>
          <li onClick={() => setCurrentCategory('Food')}>Food</li>
          <li onClick={() => setCurrentCategory('Place')}>Places</li>
        </ul>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-5 my-7">
        {filterImages().map((photo) => (
          <div key={photo.id} className="relative bg-white border rounded shadow-md">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              onClick={() => openModal(photo)}
              className="w-full h-[300px] object-cover rounded transform scale-75 hover:scale-100 transition duration-300 ease-in-out"
            />
            {selectedPhoto && selectedPhoto.id === photo.id && (
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                  content: {
                    maxHeight:'600px',
                    width: '600px',
                    margin: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                  },
                }}
              >
                <img src={selectedPhoto.imageUrl} className='object-cover w-full h-full' alt="Your Photo" />
              </Modal>
            )}
            <div className="p-4">
              <h3 className="text-center text-xl font-bold mb-2">{photo.title}</h3>
              <p className="text-center text-gray-500 italic">"{photo.description}"</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Fasiledes;
