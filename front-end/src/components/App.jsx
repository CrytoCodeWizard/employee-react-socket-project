import { useEffect, useState, forwardRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { SOCKET_SERVER_URL } from '../utils/config';
import Notification from './snackbar/Notification';

import Login from './Login'
import CustomerLists from './CustomerLists'
import Orders from './Orders'

function App() {
  const [employeeId, setEmployeeId] = useState(1);
  const [customerId, setCustomerId] = useState(0);
  const [notiMessage, setNotiMessage] = useState({});
  const [openNoti, setOpenNoti] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const ws = new WebSocket(SOCKET_SERVER_URL);

useEffect(() => {
  if(location.pathname === '/')
    navigate('/login');
}, [navigate, location]);

useEffect(() => {
    ws.onopen = () => {
        console.log('socket server connected!');
    }

    ws.onmessage = event => {
        
        event.data.text().then(textData => {
            try {
                const message = JSON.parse(textData);
                setNotiMessage(message);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        }).catch(error => {
            console.error('Error converting Blob to text:', error);
        });
    };

    ws.onclose = event => {
        console.log('socket server disconnected!');
    };

    return () => {
      ws.close();
    }
}, [employeeId]);

useEffect(() => {
  showMessage(notiMessage, employeeId);
}, [employeeId, notiMessage])

const handleUserId = id => {
  setEmployeeId(id);
}

const broadcastMsg = message => {
    ws.send(JSON.stringify(message));
}

const showMessage = (message, userId) => {
  if(userId != message.employeeId && message.employeeId !== undefined) {
    setNotiMessage(message);
    setOpenNoti(true);
  }
}

const handleNotiClose = (event, reason) => {
    if(reason === 'clickaway')
        return;
    setOpenNoti(false);
}


  return (
        <div 
          className='bg-gray-100 flex flex-col justify-center items-center w-screen h-auto'
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
            backgroundImage: 'url(/assets/img/gradient-bg.svg)',
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
          }}
        >
              <Routes>
                  <Route 
                    path="/login" 
                    element={
                      <Login setUserId={ handleUserId }/>
                    }/>
                  <Route 
                    path="/customers" 
                    element={
                      <CustomerLists
                          empId={employeeId}
                          setCusId={setCustomerId}
                          setNotiMsg={setNotiMessage}
                          setOpenNoti={setOpenNoti}
                          sendMsg={broadcastMsg}/>
                    }/>
                  <Route 
                    path="/orders" 
                    element={
                      <Orders
                          emId={employeeId}
                          cusId={customerId}
                          setNotiMsg={setNotiMessage}
                          setOpenNoti={setOpenNoti}
                          sendMsg={broadcastMsg}/>
                    }/>
              </Routes>
              <Notification
                  employee={notiMessage.employee}
                  data={notiMessage.data}
                  openNoti={openNoti}
                  onClose={handleNotiClose}/>
        </div>
  )
}

export default App;