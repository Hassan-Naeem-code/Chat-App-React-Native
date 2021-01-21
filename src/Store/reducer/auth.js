import {
  SIGN_UP_USER,
  USER_FETCHED,
  USER_REMOVED,
  FETCH_CHAT_USER,
  FETCH_ALL_CHATS,
  CLEAR_CHAT,
  LOG_OUT_USER,
} from '../constant/actiontypes';
const INIT = {
  auth: null,
  chatUser: [],
  messages: [],
};
export default (state = INIT, action) => {
  switch (action.type) {
    case FETCH_ALL_CHATS: {
      let chatClone = state.messages.slice(0);
      chatClone.push(action.payload);
      return {
        ...state,
        messages: chatClone,
      };
    }
    case LOG_OUT_USER: {
      return {
        ...state,
        auth: null,
        messsages: [],
      };
    }
    case CLEAR_CHAT: {
      return {
        ...state,
        messages: [],
      };
    }

    case SIGN_UP_USER:
      return {
        ...state,
        auth: action.payload,
      };
    case USER_FETCHED:
      return {
        ...state,
        auth: action.payload,
      };
    case USER_REMOVED:
      return {
        ...state,
        auth: null,
      };
    case FETCH_CHAT_USER:
      let clone = state.chatUser.slice(0);
      let newUser = true;
      clone.map((item) => {
        if (item.docId === action.payload.docId) {
          newUser = false;
        }
      });

      if (newUser) {
        clone.push(action.payload);
        return {
          ...state,
          chatUser: clone,
        };
      }
    default:
      return state;
  }
};
