import React from 'react'
import './Message.scss'

const Message = ({ user, chat, index, message }) => {

    var decrypted = ''

    const decryptMessage = () => {
        var key = ''

        if (message.fromUserId === user.id) {
            key = localStorage.getItem('id-'+ chat.id);
        }
        else {
            key = localStorage.getItem('gotKey-' + chat.id);
        }
        
        try {
            var CryptoJS = require("crypto-js");
            var bytes = CryptoJS.AES.decrypt(message.message, key).toString(CryptoJS.enc.Utf8);

            decrypted = JSON.parse(bytes).message;
        } catch(e) {
            decrypted = message.message;
        }        
    }

    const determineMargin = () => {
        decryptMessage()

        if (index + 1 === chat.Messages.length) return

        return message.fromUserId === chat.Messages[index + 1].fromUserId ? 'mb-5' : 'mb-10'
    }

    return (
        <div className={`message ${determineMargin()} ${message.fromUserId === user.id ? 'creator' : ''}`}>
            <div className={message.fromUserId === user.id ? 'owner' : 'other-person'}>
                {
                    message.fromUserId !== user.id
                        ? <h6 className='m-0'>{message.User.firstName} {message.User.lastName}</h6>
                        : null
                }                
                {
                    message.type === 'text'
                        ? <p className='m-0'>{decrypted}</p>
                        : <img src={message.message} alt='User upload' />
                }
            </div>
        </div>
    )
}

export default Message