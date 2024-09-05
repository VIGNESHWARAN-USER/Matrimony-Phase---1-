import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

const Requests = ({ user }) => {
  const [selectedUser, setSelectedUser] = useState(null);  // Store the selected user for details view
  const [details, setDetails] = useState(user);  // Store user details
  const [isModalOpen, setIsModalOpen] = useState(false);  // Control modal visibility
  const [base64Image, setBase64Image] = useState('');  // Store fetched image data

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    fetchUserImage(user.User_id);  // Fetch user image when opening details
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setBase64Image('');  // Reset the image when closing modal
  };

  const handleActivateAccount = (User_id) => {
    // API call to activate the user account
    axios.post(`https://matrimony-os38.onrender.com/activateUser/${User_id}`)
      .then(response => {
        alert('User account activated successfully');
        setDetails(details.map(user => user.User_id === User_id ? { ...user, status: 'active' } : user));
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error activating account:', error);
      });
  };

  const handleDeActivateAccount = (User_id) => {
    // API call to deactivate the user account
    axios.post(`https://matrimony-os38.onrender.com/deactivateUser/${User_id}`)
      .then(response => {
        alert('User account deactivated successfully');
        setDetails(details.map(user => user.User_id === User_id ? { ...user, status: 'inactive' } : user));
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error deactivating account:', error);
      });
  };

  const fetchUserImage = async (User_id) => {
    try {
      const res = await axios.get(`https://matrimony-os38.onrender.com/getImage?User_id=${User_id}`);
      setBase64Image(res.data.image);
    } catch (error) {
      console.error('Error fetching user image:', error);
    }
  };

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <img
          src={'data:image/jpeg;base64,' + selectedUser.image}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <p><b>User ID:</b> {selectedUser.User_id}</p>
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        {base64Image && (
          <img
            src={'data:image/jpeg;base64,' + base64Image}
            alt="Screenshot"
            className="w-44 h-56  object-cover mb-4"
          />
        )}
        <p><b>Transaction ID:</b> {selectedUser.transaction_id}</p>
        <button
          onClick={handleCloseModal}
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
        >
          Back to Users
        </button>
        <button
          onClick={() => handleDeActivateAccount(selectedUser.User_id)}
          className='mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded'
        >
          Deactivate Account
        </button>
        <button
          onClick={() => handleActivateAccount(selectedUser.User_id)}
          className='mt-4 ml-2 bg-green-500 text-white py-2 px-4 rounded'
        >
          Activate Account
        </button>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Open</th>
          </tr>
        </thead>
        <tbody>
          {details.filter(user => user.status === 'waiting').map(user => (
            <tr key={user.User_id}>
              <td className="py-2 px-4 border">{user.User_id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.gender}</td>
              <td className="py-2 flex justify-center px-4 border items-center">
                <button
                  onClick={() => handleOpenDetails(user)}
                  className='bg-green-700 text-white py-2 rounded-lg font-medium px-4'
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {renderUserDetails()}
      </Modal>
    </div>
  );
};

export default Requests;
