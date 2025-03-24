import './trainingNav.scss'
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

const TrainingNav = () => {

    const [method, setMethod] = useState('website');
    
    return (
        <>
        <div className='trainingNav'>
            <ul>
                <li className='li-button' onClick={()=>setMethod('website')}>
                    <LocalPostOffice className='icon'/>
                    Training by website
                </li>
                <li className='li-button' onClick={()=>setMethod('manual')}>
                    <OfflineBolt className='icon'/>
                    Training manually
                </li>
                <li className='li-button' onClick={()=>setMethod('file')}>
                    <Instagram className='icon'/>
                    Training by uploading file
                </li>
            </ul>
        </div>
        <div>
            {method === 'website' && <div>website</div>}
            {method === 'manual' && <div>manual</div>}
            {method === 'file' && <div>upload</div>}
        </div>
        </>
        
    )

}

export default TrainingNav