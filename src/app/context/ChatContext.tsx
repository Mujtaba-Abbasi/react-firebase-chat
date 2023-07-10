import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { IChatContext, IChatContextProvider } from "../constants/types";

const initialValues = {
  state: {
    chatId: "",
    user: {
      displayName: "",
      uid: "",
      photoURL: "",
    },
  },
  dispatch: () => {},
};

export const ChatContext = createContext<{
  state: IChatContext;
  dispatch: React.Dispatch<{ type: string; payload: any }>;
}>(initialValues);

export const ChatContextProvider = ({ children }: IChatContextProvider) => {
  const currentUser = useContext(AuthContext);
  const INITIAL_STATE: IChatContext = {
    chatId: "",
    user: {
      displayName: "",
      uid: "",
      photoURL: "",
    },
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid && currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
        break;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
