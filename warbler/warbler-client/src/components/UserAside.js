import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";

// aside是html的标签 通常用来修饰sidebar 就是在文章左侧或者右侧一小块地方对文章的进行额外描述 样式和文章主题有很大差别 
const UserAside = ({profileImageUrl, username}) => (

    <aside className="col-sm-2">
        <div  className="panel panel-default">
            <div className="panel-body">
                <img
                src= {profileImageUrl || DefaultProfileImg}
                alt = {username}
                width="200"
                height="200"
                className="img-thumbnail"
                />

            </div>
        </div>
    </aside>
);

export default UserAside;