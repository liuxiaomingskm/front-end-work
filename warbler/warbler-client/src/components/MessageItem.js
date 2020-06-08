import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { removeMessage } from "../store/actions/messages";


const MessageItem = ({date, profileImageUrl, text, username,removeMessage, isCorrectUser}) => (
    <div>
        <li className="list-group-item">
        {/* 如果图像路径不存在的话 就采用默认的图片 */}
        <img src = {profileImageUrl || DefaultProfileImg} alt="username" height="100" width="100" className="timeline-image" />
        <div className="message-area">
            <Link to="/">@{username} &nbsp;</Link> {/*&nbsp是html的空格符号 代表一个空格 会在page上显示 有两个符号就显示两个空格 如果没有html会自动缩减所有空格至一个空格 */}
            <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                            {date}
                    </Moment>
            </span>
                <p> {text}</p>
                {isCorrectUser && <a className="btn btn-danger" onClick = {removeMessage}>
                    Delete
                </a>}
                
        </div>
        </li>
    </div>


)
export default  MessageItem;