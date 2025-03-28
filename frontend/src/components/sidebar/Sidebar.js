import './sidebar.scss'
import {
    SettingsOutlined,
    HomeOutlined,
    MoveToInboxOutlined,
    SmartToy,
    PeopleAlt,
    PermContactCalendar,
    ShowChart,
    ModelTraining
  } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';


const Sidebar = (handlePageChange) => {
    const navigate = useNavigate()
    return (
        <div className='sidebar'>
            <div className="top">
                <ul>
                    <li>
                        <div>INBOX</div>
                        <MoveToInboxOutlined className='icon'/>
                    </li>
                    <li onClick={()=>navigate('/dashboard')}>
                        <div>DASHBOARD</div>
                        <HomeOutlined className='icon'/>
                    </li>
                    <li onClick={() => navigate('/dashboard/bots')}>
                        <div>CHARTBOTS</div>
                        <SmartToy className='icon'/>
                    </li>
                    <li>
                        <div>VISITORS</div>
                        <PeopleAlt className='icon'/>
                    </li>
                    <li>
                        <div>CONTACTS</div>
                        <PermContactCalendar className='icon'/>
                    </li>
                    <li>
                        <div>ANALYTICS</div>
                        <ShowChart className='icon'/>
                    </li>
                    <li onClick={ () => navigate('/dashboard/training')}>
                        <div>TRAINING</div>
                        <ModelTraining className='icon'/>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <ul>
                    <li onClick={()=>navigate('/dashboard/settings')}>
                        <div>INBOX</div>
                        <SettingsOutlined className='icon'/>
                    </li>
                </ul>
                
            </div>
        </div>
    )

}

export default Sidebar