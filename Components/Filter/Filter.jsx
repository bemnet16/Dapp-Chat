import React, { useState, useContext } from "react";
import Image from "next/image";

import style from "./Filter.module.css";
import images from "../../assets";
import { Model } from "../../Components/index";
import { ChatAppContext } from "../../Context/ChatAppContext";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);

  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={style.Filter}>
      <div className={style.Filter_box}>
        <div className={style.Filter_box_left}>
          <div className={style.Filter_box_left_search}>
            <Image src={images.search} alt="search" width={20} height={20} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className={style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>
      {addFriend && (
        <div className={style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium obcaecati a debitis inventore? Ipsam quasi distinctio, magnam minima tenetur molestiae est repellendus. Dolore voluptate, culpa sapiente molestiae accusantium optio deserunt officia, eaque non, delectus veritatis omnis est debitis et inventore repellat reiciendis eligendi ea perspiciatis praesentium commodi! Laborum cumque ipsum consectetur reiciendis neque culpa necessitatibus nesciunt quae, ab amet, tempora alias numquam officiis eveniet velit suscipit quasi libero eius ut laboriosam voluptates praesentium commodi. Molestias aliquid optio consequuntur, exercitationem aperiam eveniet obcaecati nam soluta culpa minima delectus id. Cumque perferendis cupiditate dignissimos, porro voluptatum possimus vel laudantium. Sapiente, aut ullam!"
            smallInfo="Kindly Select Your Friend Name & Address..."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
