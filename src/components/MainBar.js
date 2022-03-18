
import { Paper, Box, Typography, Grid, TextField, Divider, Avatar } from '@mui/material';
import dragonimg from "../dragon.png"
import { CustomSelect, StyledOption } from './StyledSelectComponent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function MainBar({ ReadyState, readyState, inputUrl, setInputUrl, connectionStatus, handleClickSendMessage, setSocketUrl }) {
    return <>
        <Grid container sx={{ paddingTop: "16px", paddingLeft: "16px", bgcolor: 'background.default', }} alignItems="center"
            justifyContent="flex-start"

        >
            <Grid item>
                <Box sx={{ display: "flex", alignItems: 'center', }}>
                    <Avatar alt="Remy Sharp" src={dragonimg} />
                    {/* &nbsp;
        <Typography variant="overline" display="block" color='text.primary'> DRAGON TAIL </Typography> */}
                </Box>
            </Grid>
            &nbsp;&nbsp;&nbsp;
            <Grid item>
                <Box sx={{
                    display: "flex", alignItems: 'center',

                }}>
                    <TextField sx={{
                        // fontFamily: "IBM Plex Sans, sans-serif",
                        // fontSize: "0.875rem",
                        // boxSizing: "border-box",
                        // padding: "5px",
                        // margin: "10px 0",
                        // // min-width: 320px;
                        // // background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
                        // border: "1px solid grey[300]",
                        // borderRadius: "0.75em",
                        // // color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
                        // overflow: "auto",
                        // outline: "0px"


                    }}
                        size="small" id="outlined-basic" label={`Socket ${connectionStatus}`} variant="outlined"
                        // disabled={connectionStatus} 

                        disabled={readyState === ReadyState.OPEN}
                        onKeyUpCapture={e => setInputUrl(e.target.value)}
                    />
                    &nbsp;
                    <div>
                        {/* <Button size='small' onClick={handleClickSendMessage}
            disabled={readyState !== ReadyState.OPEN}>
            {connectionStatus ? "Connected" : "Connect"}
          </Button> */}
                        <IconButton aria-label="delete"
                            // onClick={handleClickSendMessage} 
                            onClick={e => {
                                if (readyState === ReadyState.OPEN) {
                                    setSocketUrl(null)


                                } else {
                                    console.log("Data", inputUrl)
                                    setSocketUrl(`ws://${inputUrl}`)
                                    handleClickSendMessage()
                                }

                            }}

                        >
                            {readyState === ReadyState.OPEN ? <HighlightOffIcon color="error" /> : <CheckCircleOutlineIcon />}
                        </IconButton>
                    </div>
                </Box>
            </Grid>

            <Grid item style={{ zIndex: 99 }}>
                <CustomSelect disabled={readyState !== ReadyState.OPEN}>
                    {readyState === ReadyState.OPEN ? <><StyledOption value={10}>/var/log/nginx/access.logs</StyledOption>
                        <StyledOption value={20}>/var/log/nginx/error.logs</StyledOption>
                        <StyledOption value={30}>/var/log/apache/access.logs</StyledOption></> : <></>}

                </CustomSelect>
            </Grid>
            <Grid item>|</Grid>
            <Grid item>
                <Box sx={{ display: "flex", alignItems: 'center', }}>
                    &nbsp;&nbsp;&nbsp;
                    <Typography>Filters : </Typography>
                </Box>
            </Grid>
            {/*<Grid item>c</Grid> */}
        </Grid></>
}