import './settingNav.scss'
import {
    SettingsOutlined,
    ChatBubble,
    ChevronRight,
    Brush,
    ViewSidebar,
    WifiProtectedSetup,
    Computer,
    Language,
    ChevronLeft,
    KeyboardArrowDown,
    LocalPostOffice,
    OfflineBolt,
    Instagram,
    AccountCircle,
    Notifications,
    AccessTime,

  } from "@mui/icons-material";
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
const SettingNav = (handlePageChange) => {

    const navigate = useNavigate()
    const [isHide, setIsHide] = useState(true)
    const handleOnClick = () => {
        setIsHide(!isHide)
    }
    return (
        <div className='settingNav'>
            <ul>
                <p>CHANNELS</p>
                <li>
                    <ul>
                        <li className='li-button' onClick={()=>handleOnClick()}>
                            <span><ChatBubble className='icon'/>Live Chat
                                {
                                    isHide ? <ChevronRight style={{marginLeft: "10px", fontSize: "15px"}}/> : <KeyboardArrowDown style={{marginLeft: "10px", fontSize: "15px"}}/>  
                                }
                            </span>
                        </li>
                        {
                            !isHide && 
                                <div className='show_hide'>
                                    <li className='li-nested-button' onClick={()=>navigate('/dashboard/settings/appearance')}>
                                        <span><Brush className='icon'/>Appearance</span>
                                    </li>
                                    <li className='li-nested-button'>
                                        <span><ViewSidebar className='icon'/>Sidebar</span>
                                    </li>
                                    <li className='li-nested-button' onClick={()=>navigate('/dashboard/settings/installation')}>
                                        <span><WifiProtectedSetup className='icon'/>Installation</span>
                                    </li>
                                    <li className='li-nested-button'>
                                        <span><Computer className='icon'/>Chat Page</span>
                                    </li>

                                    <li className='li-nested-button'>
                                        <span><Language className='icon'/>Translation</span>
                                    </li>
                                </div>
                        }
                        
                    </ul>
                </li>
                
                <li className='li-button'>
                    <LocalPostOffice className='icon'/>
                    Ticketing
                </li>
                <li className='li-button'>
                    <OfflineBolt className='icon'/>
                    Facebook Messenger
                </li>
                <li className='li-button'>
                    <Instagram className='icon'/>
                    Instagram
                </li>
                <p>PERSONAL</p>
                <li className='li-button'>
                    <AccountCircle className='icon'/>
                    Account
                </li>
                <li className='li-button'>
                    <Notifications className='icon'/>
                    Notifications
                </li>
                <li className='li-button'>
                    <AccessTime className='icon'/>
                    Operating Hours
                </li>
            </ul>

        </div>
    )

}

export default SettingNav