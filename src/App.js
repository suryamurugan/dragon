import './App.css';
import React, { useState, useCallback, useEffect } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Terminal } from "react-window-ui";
import MainBar from './components/MainBar';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function AppWithTheme() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


function App() {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [socketUrl, setSocketUrl] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputUrl, setInputUrl] = useState(null);

  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);

  useEffect(() => {

    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [socketUrl, lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(() =>
    // setSocketUrl('wss://demos.kaazing.com/echo'), []);
    // setSocketUrl('ws://10.57.24.168:8080/ws/L3Zhci9sb2cvbmdpbngvYWNjZXNzLmxvZw==')
    setSocketUrl('ws://localhost:3000/ws')
    , []);

  const handleClickSendMessage = useCallback(() =>
    sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];



  return (<>

    <MainBar ReadyState={ReadyState} readyState={readyState} inputUrl={inputUrl} setInputUrl={setInputUrl} connectionStatus={connectionStatus} handleClickSendMessage={handleClickSendMessage} setSocketUrl={setSocketUrl} />


    <Box sx={{
      width: 'auto',
      height: '90vh',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      color: 'text.primary',
      p: 2

    }}>
      <Terminal boxShadow="20px" >
        <Typography variant="h6" display="block" color='white'>/var/log/nging/access.logs</Typography>
        {messageHistory
          .map((message, idx) => <> <Typography variant="body2" display="block" color='white' key={idx}>{message ? message.data : <></>}</Typography></>)}
      </Terminal>
    </Box></>
  )
}


{/* <Box
sx={{
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'right',
  bgcolor: 'background.default',
  color: 'text.primary',


}}
>

<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>
</Box> */}

