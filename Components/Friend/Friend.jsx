import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import style from "./Friend.module.css";
import images from "../../assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

import { ChatAppContext } from "../../Context/ChatAppContext";

const Friend = () => {
  const array = [1, 2, 3, 4, 5];

  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    addFriends,
    readUser,
    friendMsg,
    error,
    userLists,
    sendEth,
  } = useContext(ChatAppContext);

  return (
    <div className={style.Friend}>
      <div className={style.Friend_box}>
        <div className={style.Friend_box_left}>
          {friendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
        <div className={style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
            sendEth={sendEth}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
