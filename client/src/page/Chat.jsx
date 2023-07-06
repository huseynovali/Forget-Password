import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
const socket = io('http://localhost:5000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [inputUser, setInputUser] = useState('');
  const [findUser, setfindUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {

    socket.on('sendMessage', handleMessage);
  
    return () => {
      socket.off('sendMessage', handleMessage);
    };

  }, []);

  useEffect(() => {
    setfindUser(users.filter(item => item.name.trim().toLowerCase().includes(inputUser.trim().toLowerCase())))
  }, [inputUser]);
  useEffect(() => {
    setfindUser(users)
  }, [users]);




  const handleMessage = (message) => {
    console.log(message);
    setMessages((prevMessages) => {
      if (prevMessages.some((msg) => msg.id === message.id)) {
        return prevMessages;
      } else {
        return [...prevMessages, message];
      }
    });
  };

  const sendMessage = () => {
    console.log(socket.id);
    const message = {
      id: uuidv4(),
      text: input,
      sender: JSON.parse(localStorage.getItem('user')),

    };
    socket.emit('sendMessage', message);
    setInput('');
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/');
        setUsers(response.data.filter(item => item._id !== JSON.parse(localStorage.getItem("userId"))))
        setfindUser(users)
      } catch (error) {
        console.error('error !:', error);
      }
    };

    fetchUsers();
  }, []);




  return (
    <div>
      <div className="flex w-full">
        {
          selectedUser && <div className="w-[50%] py-5 h-screen">
            <div className="chat__part w-[80%] bg-white m-auto h-full rounded-lg shadow-lg border-green-300 border">
              <div className="chat__header w-full py-2 bg-green-500 px-5 rounded-t-lg">
                <h2 className="text-white">{selectedUser.name}</h2>
              </div>
              <div className="chat__body h-[86.7%] border-green-300 border p-3 overflow-auto">
                {messages.map((message) => (
                  <div className="userMessage flex  my-3" style={{ justifyContent: message.sender === JSON.parse(localStorage.getItem('user')) ? 'flex-start' : 'flex-end' }} key={message.id}>
                    <div className='p-3 w-[80%] bg-lime-300 rounded-md'>
                      <p className='text-xs'> {message.sender === JSON.parse(localStorage.getItem('user')) ? "You :" : message.sender}</p>
                      <span className='mx-5'>{message.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="chat__footer h-[45px]">
                <div className="input__group w-full flex h-full">
                  <input
                    type="text"
                    className="w-full rounded-bl-lg outline-none px-5"
                    placeholder="Message ..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                    className="bg-green-500 h-full px-4 text-white rounded-br-lg"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        }


        <div className="w-[50%] py-5 h-screen">
          <div className="row chat__part w-[80%]  m-auto h-[50%] rounded-lg shadow-lg border-green-300 border overflow-auto">
            <div className="input__group w-full">
              <input
                type="text"
                className="w-full rounded-t-lg p-2 border-green-300 border-b outline-none"
                placeholder="Search User ..."
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
              />
            </div>
            {
              findUser.map((user) => (
                <div
                  className="p-2 bg-green-500 w-[98%] m-auto my-2 text-white"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.name}
                </div>
              ))
            }
          </div>

          <div className="row chat__part w-[80%]  m-auto h-[50%] rounded-lg shadow-lg border-green-300 border overflow-auto mt-2">
            <div className="chat__header w-full py-2 bg-green-500 px-5 rounded-t-lg">
              <h2 className="text-white">Your Chat</h2>
            </div>
            {/* {
              findUser.map(x => <div className='p-2 bg-green-500 w-[98%] m-auto my-2 text-white'>{x.name}</div>)
            } */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
