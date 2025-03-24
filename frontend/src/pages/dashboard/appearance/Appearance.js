import Navbar from "components/navbar/Navbar"
import SettingNav from "components/settingNav/SettingNav"
import Sidebar from "components/sidebar/Sidebar"
import { useState, useEffect } from "react"
import "./appearance.scss"
import checked from "assets/images/check.png"
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
    RemoveRedEyeOutlined,
    HomeOutlined,

  } from "@mui/icons-material";
  import axios from 'axios';
  import { v5 as uuidv5 } from 'uuid';
  import { SERVER_URL } from "../../../utils/config";

export const Appearance = () => {
    const [appearance, setAppearance] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState("");
    const [started, setStarted] = useState(true);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [botName, setBotName] = useState('');
    const [labelText, setLabelText] = useState("");
    const [foreColor, setForeColor] = useState("");

    const handleOnSubmit = (e) => {

        const MY_NAMESPACE = '1b671a94-40d5-491e-99b0-da01ff1f3341';
        
        e.preventDefault()
        
        const email = localStorage.getItem('email');
        const uuid = uuidv5(localStorage.getItem('email'), MY_NAMESPACE);
        const data = {
            email: email,
            uuid: uuid,
            botName: botName,
            bgColor: bgColor,
            onlineStatus: onlineStatus,
            status: status,
            labelText: labelText,
            foreColor: foreColor,
        }
        console.log(data)

        axios.post(`${SERVER_URL}/v1/appearance`, data).then((res) => {
            if (res.data.status === 'success') {
                alert('success')
            } else {
                alert(res.data.message)
                console.log("message", res.data.message)
            }
        })
    }

    const onHandleChange = (e) => {

        if(e.target.name === "botName") setBotName(e.target.value);
        if(e.target.name === "onlineStatus") setOnlineStatus(e.target.value);
        if(e.target.name === "labelText") setLabelText(e.target.value);
        
    }
    useEffect(()=>{
        const getData = async () => {
            await axios.post(`${SERVER_URL}/v1/appearance/info`, {email: localStorage.getItem("email")}).then((res) => {
                const data = JSON.parse(res.data.data);
                setBgColor(data.bgColor)
                setBotName(data.botName)
                setOnlineStatus(data.onlineStatus)
                setLabelText(data.labelText)
                setForeColor(data.foreColor)
            })
        }
        getData()


    }, [])

    const handleSetColor = (bg, fore) => {
        setBgColor(bg)
        setForeColor(fore)
    }
    return (
        <div className='settings'>
            <Sidebar />
            <div className="settingContainer">
                <Navbar title="Dashboard"/>
                <div className="setting_content">
                    <SettingNav />
                    <form className="appearance_content" autoComplete="off" onSubmit={handleOnSubmit}>
                        <div className="widgetAppearance">
                            <a onClick={()=>setAppearance(!appearance)}><Brush className="icon" /> Widget Appearance <KeyboardArrowDown className={appearance ? "icon_arrow_up" : "icon_arrow_down"}/></a>
                            {
                                appearance && 
                                    <div className="widgetAppearanceContent">
                                        <div className="bgColor">
                                            <div>Background Color:</div>
                                            <div className="custom-radios">
                                                
                                                <div onClick={() => {handleSetColor("#00ff00", "#ffffff")}}>
                                                    <input type="radio" id="color-1" name="color" value="color-1"></input>
                                                    <label htmlFor="color-1">
                                                    <span>
                                                        <img src={checked} alt="Checked Icon" width={"35px"} height="35px"/>
                                                    </span>
                                                    </label>
                                                </div>
                                                
                                                <div onClick={() => {handleSetColor("#0000ff", "#ffffff")}}>
                                                    <input type="radio" id="color-2" name="color" value="color-2"></input>
                                                    <label htmlFor="color-2">
                                                    <span>
                                                        <img src={checked} alt="Checked Icon" width={"35px"} height="35px"/>
                                                    </span>
                                                    </label>
                                                </div>
                                                
                                                <div onClick={() => {handleSetColor("#ffff00", "#ffffff")}}>
                                                    <input type="radio" id="color-3" name="color" value="color-3"></input>
                                                    <label htmlFor="color-3">
                                                    <span>
                                                        <img src={checked} alt="Checked Icon" width={"35px"} height="35px"/>
                                                    </span>
                                                    </label>
                                                </div>

                                                <div onClick={() => {handleSetColor("#ff426f", "#ffffff")}}>
                                                    <input type="radio" id="color-4" name="color" value="color-4"></input>
                                                    <label htmlFor="color-4">
                                                    <span>
                                                        <img src={checked} alt="Checked Icon" width={"35px"} height="35px"/>
                                                    </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bgColor">
                                            <div>Chatbot Name:</div>
                                            <div style={{width: "70%"}}>
                                                <input type={"text"} name="botName" value={botName} onChange={onHandleChange}/>
                                            </div>
                                        </div>
                                        <div className="bgColor">
                                            <div>Online Status:</div>
                                            <div style={{width: "70%"}}>
                                                <input type={"text"} name = "onlineStatus" value={onlineStatus} onChange={onHandleChange}/>
                                            </div>
                                        </div>
                                        <div className="bgColor">
                                            <div>Label Text:</div>
                                            <div style={{width: "70%"}}>
                                                <input type={"text"} name = "labelText" value={labelText} onChange={onHandleChange}/>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="widgetAppearance">
                            <a onClick={()=>setStarted(!started)}><HomeOutlined className="icon" /> Get Started <KeyboardArrowDown className={started ? "icon_arrow_up" : "icon_arrow_down"}/></a>
                            {
                                started && 
                                    <div className="widgetAppearanceContent">
                                        <div className="bgColor">
                                            <div>Status:</div>
                                            <div style={{width: "70%"}}>
                                                <input type={"text"} value={status} onChange={()=>setStatus}/>
                                            </div>
                                        </div>
                                        <div className="bgColor">
                                            <div>Message </div>
                                            <div style={{width: "70%"}}>
                                                <input type={"text"} value={message} onChange={()=>setMessage}/>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="footer">
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}