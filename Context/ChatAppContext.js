import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import {
  CheckIfWalletConnected,
  ConnectWallet,
  connectingWithContract,
  convertTime,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLists, setUserLists] = useState([]);

  // CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      //  GET CONTRACT
      const contract = await connectingWithContract();
      //  GET ACCOUNT
      const connectAccount = await ConnectWallet();
      setAccount(connectAccount);
      // GET USER NAME
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);
      //  GET FRIENDS LIST
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      //  ALL APP USERS
      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      // setError("Please Install And Connect Your Wallet: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  READ MESSAGE
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessag(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      // setError("Error While Reading Message: ", error);
    }
  };

  //  CREATE ACCOUNT
  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress) return setError("Please Fill All Fields");

      const contract = await connectingWithContract();
      const getCreatedAccount = await contract.createAccount(name);
      setLoading(true);
      await getCreatedAccount.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error While Creating Account: ", error);
    }
  };

  //  ADD FRIEND
  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress) return setError("Please Fill All Fields");

      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Error While Adding Friend: ", error);
    }
  };

  // SEND MESSAGE
  const sendMessage = async ({ friendAddress, message }) => {
    try {
      // if (friendAddress || message) return setError("Please Fill All Fields");

      const contract = await connectingWithContract();
      const sendMsg = await contract.sendMessage(friendAddress, message);
      setLoading(true);
      await sendMsg.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error While Sending Message: ", error);
    }
  };

  // READ INFO
  const readUser = async (userAddress) => {
    try {
      const contract = await connectingWithContract();
      const userName = await contract.getUserName(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (error) {
      // setError("Error While Reading User: ", error);
    }
  };

  // SEND ETH TO FRIEND
  const sendEth = async ({ friendAddress, amount }) => {
    try {
      if (!friendAddress || !amount) return setError("Please Fill All Fields");

      console.log("Sending ETH to:", friendAddress, "Amount:", amount);

      const contract = await connectingWithContract();

      // Convert amount to ethers (if it's not already in ETH)
      const tx = await contract.sendGift(
        friendAddress,
        ethers.utils.parseEther(amount),
        {
          value: ethers.utils.parseEther(amount), // Send ETH with the transaction
        }
      );

      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error While Sending Eth: " + error.message);
      console.log("Error While Sending Eth: ", error);
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        createAccount,
        addFriends,
        sendMessage,
        readMessage,
        readUser,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        error,
        userLists,
        currentUserName,
        currentUserAddress,
        CheckIfWalletConnected,
        ConnectWallet,
        sendEth,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
