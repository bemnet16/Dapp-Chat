import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import style from "./Chat.module.css";
import images from "../../../assets";
import { convertTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  readUser,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  sendEth,
}) => {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(router.query.address);
      readUser(router.query.address);
    }
  }, []);

  return (
    <div className={style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={style.Chat_user_info}>
          <Image
            src={images.accountName}
            alt="usename"
            width={70}
            height={70}
          />
          <div className={style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={style.show}>{currentUserAddress} </p>
          </div>

          <div className={style.Chat_gift}>
            <span className={style.Chat_dollar}>ETH</span>
            {/* <Image src={images.eth} alt="close" width={20} height={20} /> */}
            <input
              type="number"
              placeholder="send gift"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={() =>
                sendEth({
                  friendAddress: chatData.address,
                  amount: amount,
                })
              }
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.Chat_box_box}>
        <div className={style.Chat_box}>
          <div className={style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div>
                {el.sender == chatData.address ? (
                  <div className={style.Chat_box_left_title_sender}>
                    <Image
                      src={images.accountName}
                      alt="usename"
                      width={50}
                      height={50}
                    />
                    <span>
                      {chatData.name} {""}
                      <small> Time: {convertTime(el.timestamp)} </small>
                    </span>
                  </div>
                ) : (
                  <div className={style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="usename"
                      width={50}
                      height={50}
                    />
                    <span>
                      {userName} {""}
                      <small>Time: {convertTime(el.timestamp)} </small>
                    </span>
                  </div>
                )}
                <p key={i + 1}>
                  {el.msg}
                  {""}
                  {""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div className={style.Chat_box_send}>
            <div className={style.Chat_box_send_img}>
              <Image src={images.smile} alt="usename" width={50} height={50} />
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={() =>
                    functionName({ friendAddress: chatData.address, message })
                  }
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
