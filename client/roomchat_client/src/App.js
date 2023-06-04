import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function App () {
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')

  const sendMessage = () => {
    socket.emit('send_message', { message,room })
  }

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }

  // handle the socket broadcasting
  useEffect(() => {
    socket.on('receive_message', data => {
      // alert(data.message);
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div>
      <input placeholder='Room number' 
      onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>join room</button>
      <input
        placeholder='Message...'
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}> send message</button>
      <h1>{messageReceived}</h1>
    </div>
  )
}

export default App
