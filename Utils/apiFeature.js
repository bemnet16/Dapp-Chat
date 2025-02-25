import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Wallet not found");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      return accounts[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export const ConnectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Wallet not found");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    return fetchContract(signer);
  } catch (error) {
    console.log("ERROR: while connectingWithContract", error);
  }
};

export const convertTime = (time) => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
