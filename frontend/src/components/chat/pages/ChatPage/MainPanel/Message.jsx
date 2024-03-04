import React from 'react';
import Image from "react-bootstrap/Image";
import moment from "moment";

const Message = ({message, user}) => {

    const timeFromNow = timestamp => moment(timestamp).fromNow()
    const isImage = message => {
        if(message.image){
            return true;
        }
        return false;
    }

    const isMessageMine = (message, user) => {
        if(user) {
            return message.user.id === user.uid
        }
    }

    return (
        <div style={{margin:'16px 0', display:'flex'}}>
            <Image
                roundedCircle
                style={{width:40, height:40, marginTop:3}}
                src={message.user.image}
                alt={message.user.name}
            />
            <div style={{marginLeft:10}}>
                <h6
                    style={{
                        color: isMessageMine(message, user) ? "rgb(123, 131, 235)":""
                    }}
                >
                    {message.user.name}{" "}
                    <span
                        style={{fontSize:10, color:'gray'}}
                    >
                        {timeFromNow(message.timestamp)}
                    </span>
                </h6>
                {isImage(message) ?
                <img
                    style={{maxWidth:300, borderRadius:10}}
                    alt='이미지'
                    src={message.image}
                />
                    :
                    <p>
                        {message.content}
                    </p>
                }
            </div>
        </div>
    );
};

export default Message;