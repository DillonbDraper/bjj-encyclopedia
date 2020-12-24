import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { IconButton } from '@material-ui/core';
import "./Header.css"


export const Header = props => (
    <div className="header">
    <IconButton
                    onClick={() => {
                        props.history.push("/")
                    }} 
                    edge="start" 
                    aria-label="Home">
                            <HomeIcon titleAccess="Home" />
                            
                    </IconButton>

                    <IconButton
                    onClick={() => {
                        localStorage.removeItem("grappler")
                        props.history.push("/login")
                    }} 
                    edge="start" 
                    aria-label="Logout">
                            <MeetingRoomIcon titleAccess="Logout" />
                            
                    </IconButton>
    </div>
)