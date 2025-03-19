import './message-history.style.css'
import PropTypes from 'prop-types'

export const MessageHistory = ({msg}) => {
    if(!msg) return null;
    return msg.map((row, i)=>(
        <div key={i} className="message-history mt-3">
            <div className="send font-weight-bold text-second">
                <div className="sender">{row.messageby}</div>
                <div className="date">{row.date}</div>
            </div>
            <div className="message">{row.message}</div>
        </div>
    ))

}

MessageHistory.propTypes = {
    msg: PropTypes.object.isRequired
}