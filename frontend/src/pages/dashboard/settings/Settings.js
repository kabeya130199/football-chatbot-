import Navbar from "components/navbar/Navbar"
import SettingNav from "components/settingNav/SettingNav"
import Sidebar from "components/sidebar/Sidebar"
import "./settings.scss"

export const Settings = () => {

    
    return (
        <div className='settings'>
            <Sidebar />
            <div className="settingContainer">
                <Navbar title="Dashboard"/>
                <div className="setting_content">
                    <SettingNav />
                    asdf
                </div>
            </div>            
        </div>
    )
}