import Navbar from "components/navbar/Navbar"
import SettingNav from "components/settingNav/SettingNav"
import Sidebar from "components/sidebar/Sidebar"
import { useEffect, useState } from "react"
import "./installation.scss"
import checked from "assets/images/check.png"
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';
import { FILE_SERVER_URL } from "../../../utils/config";

import {
    Brush,
    KeyboardArrowDown,
    HomeOutlined,

  } from "@mui/icons-material";
  import axios from 'axios';



export const Installation = () => {

    const [jsCode, setJsCode] = useState('')

    const MY_NAMESPACE = '1b671a94-40d5-491e-99b0-da01ff1f3341';

    useEffect(()=>{
        setJsCode(uuidv5(localStorage.getItem('email'), MY_NAMESPACE))
    }, [])

    
    return (
        <div className='settings'>
            <Sidebar />
            <div className="settingContainer">
                <Navbar title="Dashboard"/>
                <div className="setting_content">
                    <SettingNav />
                    <div className="install_content">
                        <h3>The chat code is installed properly</h3>
                        <p>We've detected that the chat code is installed properly, so you don't need to go through the integration process again. If you still want to access your JavaScript code or reinstall the chat</p>
                        <div className="code_snippet">
                            <div className="left">
                                <ul>
                                    <li onClick={()=>{setJsCode(uuidv5(localStorage.getItem('email'), MY_NAMESPACE))}}>JavaScript</li>
                                    <li>Shopify</li>
                                    <li>WordPress</li>
                                    <li>WooCommerce</li>
                                    <li>BigCommerce</li>
                                    <li>Magento</li>
                                    <li>PrestaShop</li>
                                    <li>Other</li>
                                </ul>
                            </div>
                            <div className="right">
                                <p>Paste this code snippet just before the &lt;/body&gt;tag</p>
                                <fieldset>
                                    <legend>
                                        <span>Code snippet</span>
                                    </legend>
                                    <textarea readOnly value={"<script src='"+FILE_SERVER_URL+"/chatbot-loader.js'></script>\n"+"<script> YourChatbotLoader.loadChatbot('"+jsCode+"');</script>"}>
                                    </textarea>
                                </fieldset>
                                <div className="right_down">
                                    <button><span>Copy to clipboard</span></button>
                                    <button><span>Send instructions via email</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}