import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import style from "./NavBar.module.css";

import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets/index";

const NavBar = () => {
  const menuItems = [
    { menu: "All Users", link: "alluser" },
    { menu: "CHAT", link: "/" },
    { menu: "CONTACT", link: "/" },
    { menu: "SETTINGS", link: "/" },
    { menu: "FAQs", link: "/" },
    { menu: "TERMS OF USE", link: "/" },
  ];

  const [active, setAcitve] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, error, createAccount, userName, ConnectWallet } =
    useContext(ChatAppContext);

  return (
    <div className={style.NavBar}>
      <div className={style.NavBar_box}>
        <div className={style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={style.NavBar_box_right}>
          {/* //Desktop */}
          <div className={style.NavBar_box_right_menu}>
            {menuItems.map((item, index) => (
              <div
                onClick={() => setAcitve(index + 1)}
                key={index + 1}
                className={`${style.NavBar_box_right_menu_items} ${
                  active == index + 1 ? style.active_btn : ""
                }`}
              >
                <Link
                  className={style.NavBar_box_right_menu_items_link}
                  href={item.link}
                >
                  {item.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* //Mobile */}
          {open && (
            <div className={style.mobile_menu}>
              {menuItems.map((item, index) => (
                <div
                  onClick={() => setAcitve(index + 1)}
                  key={index + 1}
                  className={`${style.mobile_menu_items} ${
                    active == index + 1 ? style.active_btn : ""
                  }`}
                >
                  <Link
                    className={style.mobile_menu_items_link}
                    href={item.link}
                  >
                    {item.menu}
                  </Link>
                </div>
              ))}
              <p className={style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* CONNECT WALLET */}
          <div className={style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => ConnectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="account"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div
            className={style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>
      {/* Model Component */}
      {openModel && (
        <div className={style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eum sequi atque, asperiores veniam repellat fugit vel excepturi quidem consectetur sunt perferendis nobis aut delectus exercitationem quia libero temporibus deserunt impedit expedita beatae quam error natus voluptatum! Illum tenetur ea reiciendis voluptates mollitia quod hic dolorum rerum, sunt dolore repellendus ducimus excepturi voluptate itaque autem? Eos expedita deleniti reprehenderit eius eligendi dolor, rem laboriosam ullam consequatur! Nesciunt error eveniet excepturi, amet neque rem, impedit dolor repellendus, esse consectetur nostrum ad vero cumque natus. Sequi voluptatum dolorem consequatur suscipit eligendi, ratione distinctio iste labore optio voluptates quis quam sit excepturi! Minus."
            smallInfo="Kindley select your name..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default NavBar;
