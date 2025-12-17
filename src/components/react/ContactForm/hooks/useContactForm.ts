import React, { useEffect, useReducer } from "react";
import validator from "cgc-validator";
import { SUCCESS, ERROR, LOADING } from "@constants";
import type { ActionType } from "@types";
import type { StateType } from "@types";
import axios from "axios";

const initialState: StateType = {
  show: null,
  errors: { name: null, email: null, message: null },
  canSendMail: false,
  token: null,
  formKey: Math.random(),
};
function useContactForm() {
  const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
      case "show-success":
        return { ...state, show: SUCCESS, formKey: Math.random() };
      case "show-error":
        return { ...state, show: ERROR };
      case "show-loading":
        return { ...state, show: LOADING };
      case "hide":
        return { ...state, show: null };
      case "set-errors":
        if (!action.payload) return state;
        return {
          ...state,
          errors: { ...state.errors, ...JSON.parse(action.payload) },
        };
      case "clear-errors":
        return { ...state, errors: { name: null, email: null, message: null } };
      case "can-send-mail":
        return { ...state, canSendMail: action.payload === "true" };
      case "set-token":
        return { ...state, token: action.payload };
      case "reset-form":
        return { ...state, formKey: Math.random() };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    dispatch({ type: "clear-errors" });
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;

    const rules = {
      name: "required;type=string;min=3;max=50;alias=Name",
      email: "required;type=email;alias=Email",
      message: "required;type=string;min=10;max=500;alias=Message",
    };

    const validation = validator({ name, email, message }, rules);

    if (validation.success) {
      dispatch({ type: "show-loading" });
      const body = JSON.stringify({ name, email, message, token: state.token });
      const url = "https://cgcapps-api.vercel.app/api/mail";
      axios
        .post(url, { body })
        .then((response) => {
          if (response.data.success) dispatch({ type: "show-success" });
          else dispatch({ type: "show-error" });
        })
        .catch((error) => {
          dispatch({ type: "show-error" });
        });

      // reset catpcha
      //@ts-ignore
      window.turnstile.reset();
    } else {
      dispatch({
        type: "set-errors",
        payload: JSON.stringify(validation.messages),
      });
    }
  };

  useEffect(() => {
    if (state.show === SUCCESS || state.show === ERROR) {
      setTimeout(() => {
        dispatch({ type: "hide" });
      }, 3000);
    }
  }, [state.show]);

  React.useEffect(() => {
    //@ts-ignore
    window.onloadTurnstileCallback = function () {
      //@ts-ignore
      if (typeof window.turnstile !== "undefined") {
        //@ts-ignore
        window.turnstile.render("#captcha-container", {
          sitekey: "0x4AAAAAAAN5nJP-g1lrI6nT",
          callback: function (token: string) {
            dispatch({ type: "can-send-mail", payload: "true" });
            dispatch({ type: "set-token", payload: token });
          },
          "expired-callback": function () {
            dispatch({ type: "can-send-mail", payload: "false" });
          },
        });
      }
    };
  }, []);

  return { state, nameRef, emailRef, messageRef, handleClick };
}

export default useContactForm;
