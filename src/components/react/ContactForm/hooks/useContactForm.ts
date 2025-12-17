import React, { useEffect, useReducer, useRef } from "react";
import validator from "cgc-validator";
import { SUCCESS, ERROR, LOADING } from "@constants";
import type { ActionType } from "@types";
import type { StateType } from "@types";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";

// Get configuration from environment variables
const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAAN5nJP-g1lrI6nT";
const API_URL =
  import.meta.env.PUBLIC_API_URL || "https://cgcapps-api.vercel.app";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3; // Maximum submissions per window

const initialState: StateType = {
  show: null,
  errors: { name: null, email: null, message: null },
  canSendMail: false,
  token: null,
  formKey: Math.random(),
};
/**
 * Custom hook for managing contact form state and behavior
 *
 * Features:
 * - Input validation and sanitization
 * - Rate limiting (3 submissions per minute)
 * - Cloudflare Turnstile integration
 * - Error handling and user feedback
 *
 * @returns {Object} Form state and handlers
 * @returns {StateType} state - Current form state
 * @returns {React.RefObject} nameRef - Reference to name input
 * @returns {React.RefObject} emailRef - Reference to email input
 * @returns {React.RefObject} messageRef - Reference to message textarea
 * @returns {Function} handleClick - Form submission handler
 */
function useContactForm() {
  // Track submission timestamps for rate limiting
  const submissionTimestamps = useRef<number[]>([]);

  /**
   * Reducer function for managing form state
   *
   * @param {StateType} state - Current state
   * @param {ActionType} action - Action to perform
   * @returns {StateType} New state
   */
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

  /**
   * Sanitizes user input to prevent XSS attacks
   *
   * @param {string | undefined} input - Raw user input
   * @returns {string} Sanitized input
   */
  const sanitizeInput = (input: string | undefined): string => {
    if (!input) return "";
    return DOMPurify.sanitize(input.trim(), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  /**
   * Checks if rate limit has been exceeded
   *
   * @returns {boolean} True if rate limit exceeded
   */
  const isRateLimited = (): boolean => {
    const now = Date.now();
    // Remove timestamps outside the current window
    submissionTimestamps.current = submissionTimestamps.current.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
    );
    return submissionTimestamps.current.length >= MAX_SUBMISSIONS;
  };

  /**
   * Handles form submission with validation, sanitization, and rate limiting
   *
   * @param {React.MouseEvent} event - Click event from submit button
   * @returns {Promise<void>}
   */
  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    dispatch({ type: "clear-errors" });

    // Check rate limiting
    if (isRateLimited()) {
      dispatch({
        type: "set-errors",
        payload: JSON.stringify({
          message: "Too many submissions. Please wait a minute and try again.",
        }),
      });
      return;
    }

    // Get and sanitize user inputs
    const name = sanitizeInput(nameRef.current?.value);
    const email = sanitizeInput(emailRef.current?.value);
    const message = sanitizeInput(messageRef.current?.value);

    const rules = {
      name: "required;type=string;min=3;max=50;alias=Name",
      email: "required;type=email;alias=Email",
      message: "required;type=string;min=10;max=500;alias=Message",
    };

    const validation = validator({ name, email, message }, rules);

    if (validation.success) {
      dispatch({ type: "show-loading" });

      // Record submission timestamp for rate limiting
      submissionTimestamps.current.push(Date.now());

      const body = JSON.stringify({ name, email, message, token: state.token });
      const url = `${API_URL}/api/mail`;

      try {
        const response = await axios.post(
          url,
          { body },
          {
            timeout: 10000, // 10 second timeout
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.data.success) {
          dispatch({ type: "show-success" });
        } else {
          dispatch({ type: "show-error" });
        }
      } catch (error) {
        // Log error in development
        if (import.meta.env.DEV) {
          console.error("Contact form submission error:", error);
        }
        dispatch({ type: "show-error" });
      } finally {
        // Reset captcha after submission attempt
        if (window.turnstile) {
          window.turnstile.reset();
        }
      }
    } else {
      dispatch({
        type: "set-errors",
        payload: JSON.stringify(validation.messages),
      });
    }
  };

  /**
   * Auto-hide success/error messages after 3 seconds
   */
  useEffect(() => {
    if (state.show === SUCCESS || state.show === ERROR) {
      const timer = setTimeout(() => {
        dispatch({ type: "hide" });
      }, 3000);

      // Cleanup timeout on unmount
      return () => clearTimeout(timer);
    }
  }, [state.show]);

  /**
   * Initialize Cloudflare Turnstile captcha
   */
  React.useEffect(() => {
    window.onloadTurnstileCallback = function () {
      if (window.turnstile) {
        window.turnstile.render("#captcha-container", {
          sitekey: TURNSTILE_SITE_KEY,
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
