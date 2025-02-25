// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract ChatApp{

   // USER STRUCT
    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUsers{
        string name;
        address accountAddress;
    }

    AllUsers[] getAllUsers;
     
    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;


    // CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns(bool){
       return bytes(userList[pubkey].name).length > 0;
    }


    // CREATE ACCOUNT
    function createAccount(string calldata name) external{
        require(!checkUserExists(msg.sender), "User already exist");
        require(bytes(name).length > 0, "Name cannot be empty");
        userList[msg.sender].name = name;

        getAllUsers.push(AllUsers(name, msg.sender));
    }

    // GET USER NAME
    function getUserName(address pubkey) public view returns(string memory){
        require(checkUserExists(pubkey), "User does not exist");
        return userList[pubkey].name;
    }

    // ADD FRIEND
    function addFriend(address friend_key, string calldata name) external{
        require(checkUserExists(msg.sender), "Create an account first!");
        require(checkUserExists(friend_key), "Friend does not exist");
        require(msg.sender != friend_key, "You cannot add yourself as a friend");
        require(checkAlreadyFriends(msg.sender, friend_key) == false, "Already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, getUserName(msg.sender));
    }

    // CHECK ALREADY FRIENDS
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }

        for(uint256 i = 0; i < userList[pubkey1].friendList.length; i++){
            if(userList[pubkey1].friendList[i].pubkey == pubkey2){
                return true;
            }
        }
        return false;
    }

    // _Add Friend
    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    // GET MY FRIENDS
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    } 

    // GET CHAT CODE
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if(pubkey1 > pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        }else{
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    // SEND MESSAGE
    function sendMessage(address friend_key, string calldata text) external{
        require(checkUserExists(msg.sender), "Create an account first!");
        require(checkUserExists(friend_key), "Friend does not exist");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not friends");

        bytes32 chatcode = _getChatCode(msg.sender, friend_key);
        message memory newMessage = message(msg.sender, block.timestamp, text);
        allMessages[chatcode].push(newMessage);
    }

    // READ MESSAGE
    function readMessag(address friend_key) external view returns(message[] memory){
        require(checkUserExists(msg.sender), "Create an account first!");
        require(checkUserExists(friend_key), "Friend does not exist");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not friends");

        bytes32 chatcode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatcode];
    }

    // GET ALL USERS
    function getAllAppUser() public view returns(AllUsers[] memory){
        return getAllUsers;
    }

   // SEND GIFT FUNCTION (FIXED)
function sendGift(address payable friend_key, uint256 amount) external payable {
    require(checkUserExists(msg.sender), "Create an account first!");
    require(checkUserExists(friend_key), "Friend does not exist");
    require(checkAlreadyFriends(msg.sender, friend_key), "You are not friends");

    require(msg.value == amount, "Incorrect ETH amount sent");

    // Send 'amount' ETH to the friend_key
    friend_key.transfer(amount);
}

    
}