import React, { useState } from 'react';

const AllGroups = () => {
  const [groups, setGroups] = useState([
    { name: 'Group A', members: ['Alice', 'Bob', 'Charlie', 'David'], tasksAssigned: 150, tasksCompleted: 120 },
    { name: 'Group B', members: ['Eve', 'Frank', 'Grace', 'Hank'], tasksAssigned: 150, tasksCompleted: 98 },
    { name: 'Group C', members: ['Ivy', 'Jack', 'Karen', 'Leo'], tasksAssigned: 150, tasksCompleted: 85 }
  ]);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(['', '', '', '']);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editGroupIndex, setEditGroupIndex] = useState(null);

  const addOrUpdateGroup = () => {
    const filteredMembers = members.filter(name => name.trim() !== '');
    if (groupName.trim() && filteredMembers.length) {
      if (editGroupIndex !== null) {
        const updatedGroups = [...groups];
        updatedGroups[editGroupIndex] = { name: groupName, members: filteredMembers, tasksAssigned: 0, tasksCompleted: 0 };
        setGroups(updatedGroups);
      } else {
        setGroups([...groups, { name: groupName, members: filteredMembers, tasksAssigned: 0, tasksCompleted: 0 }]);
      }
      setGroupName('');
      setMembers(['', '', '', '']);
      setIsGroupModalOpen(false);
      setEditGroupIndex(null);
    }
  };

  const deleteGroup = (index) => {
    setGroups(groups.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleEditMembers = (index) => {
    setEditGroupIndex(index);
    setGroupName(groups[index].name);
    setMembers([...groups[index].members, '', '', '', ''].slice(0, 4));
    setIsGroupModalOpen(true);
  };

  return (
    <div>
      <div className="w-full flex justify-end mb-4">
        <button onClick={() => { setIsGroupModalOpen(true); setEditGroupIndex(null); }} className="bg-blue-500 text-white p-2 rounded">Add Group</button>
      </div>
      <h3 className="text-2xl">List of Groups</h3>
      <hr />
      {groups.map((group, index) => (
        <div key={index} className="bg-white rounded-sm p-4 border-2 border-blue-800 my-2">
          <h4 className="text-xl font-semibold">{group.name}</h4>
          <p className="text-gray-600">Members: {group.members.join(', ')}</p>
          <p className="text-green-600">Tasks Assigned: {group.tasksAssigned}</p>
          <p className="text-blue-600">Tasks Completed: {group.tasksCompleted}</p>
          <button className="bg-gray-600 rounded p-2 text-white mt-2 mr-2" onClick={() => handleEditMembers(index)}>Edit Members</button>
          <button className="bg-red-600 rounded p-2 text-white mt-2" onClick={() => deleteGroup(index)}>Delete</button>
        </div>
      ))}

      {isGroupModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-1/3 bg-gray-900 p-4 rounded text-white">
            <h3 className="text-xl mb-2">{editGroupIndex !== null ? 'Edit Group' : 'Add New Group'}</h3>
            <input 
              type="text" 
              placeholder="Group Name" 
              value={groupName} 
              onChange={(e) => setGroupName(e.target.value)} 
              className="px-3 py-2 rounded w-full bg-gray-600 my-2"
            />
            {members.map((member, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Member ${index + 1}`}
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="px-3 py-2 rounded w-full bg-gray-600 my-2"
              />
            ))}
            <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={addOrUpdateGroup}>Save</button>
            <button className="px-3 py-2 bg-red-400 rounded text-black text-xl font-semibold ml-2" onClick={() => setIsGroupModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllGroups;
