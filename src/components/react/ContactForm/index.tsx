import React from "react";
import InputError from "../InputError";
import { SUCCESS, ERROR, LOADING } from "@constants";
import useContactForm from "./hooks/useContactForm";

const ContactForm = () => {
  const { state, nameRef, emailRef, messageRef, handleClick } =
    useContactForm();

  return (
    <div className="flex flex-col justify-items-center w-full relative">
      <form key={state.formKey} aria-label="Contact form">
        <div className="mb-4 w-full px-5 py-2">
          <label className="block text-gray-400 font-bold mb-2" htmlFor="name">
            Name{" "}
            {state.errors.name && <InputError message={state.errors.name} />}
          </label>
          <input
            ref={nameRef}
            className="border rounded-full w-full py-2 px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            id="name"
            type="text"
            placeholder="John Doe"
            aria-required="true"
            aria-invalid={state.errors.name ? "true" : "false"}
            aria-describedby={state.errors.name ? "name-error" : undefined}
          />
        </div>

        <div className="mb-4 w-full px-5 py-2">
          <label className="block text-gray-400 font-bold mb-2" htmlFor="email">
            Email{" "}
            {state.errors.email && <InputError message={state.errors.email} />}
          </label>
          <input
            ref={emailRef}
            className="border rounded-full w-full py-2 px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            aria-required="true"
            aria-invalid={state.errors.email ? "true" : "false"}
            aria-describedby={state.errors.email ? "email-error" : undefined}
          />
        </div>

        <div className="mb-4 w-full px-5 py-2">
          <label
            className="block text-gray-400 font-bold mb-2"
            htmlFor="message"
          >
            Message{" "}
            {state.errors.message && (
              <InputError message={state.errors.message} />
            )}
          </label>
          <textarea
            ref={messageRef}
            className="border rounded-xl w-full py-2 px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            id="message"
            rows={10}
            placeholder="Enter your message here"
            aria-required="true"
            aria-invalid={state.errors.message ? "true" : "false"}
            aria-describedby={
              state.errors.message ? "message-error" : undefined
            }
          />
        </div>

        <div
          className="flex mb-4 w-full px-5 py-2 items-center"
          id="captcha-container"
          aria-label="Captcha verification"
        />

        <div className="flex items-center justify-center pt-2 pb-4">
          <button
            className={`${state.canSendMail ? "bg-indigo-500 hover:bg-indigo-700" : "bg-slate-400 cursor-not-allowed"} text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all w-1/2 sm:w/4`}
            type="button"
            onClick={handleClick}
            disabled={!state.canSendMail}
            aria-label="Send contact form"
          >
            Send
          </button>
        </div>

        {state.show !== null && (
          <div
            className="absolute w-full rounded-xl h-full z-10 animate-fadeIn"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="absolute backdrop-blur-md bg-indigo-950/80 w-full h-full rounded-xl" />
            <div className="absolute w-full top-1/2 -translate-y-1/2 text-white text-center font-bold px-4">
              {state.show === LOADING && (
                <div className="animate-slideUp">
                  <div className="mb-4">
                    <img
                      src="/images/loader.svg"
                      alt="Loading"
                      className="w-12 h-12 mx-auto animate-spin"
                      width="48"
                      height="48"
                    />
                  </div>
                  <div className="text-lg mb-2">Sending your message...</div>
                  <div className="text-sm text-gray-300">
                    Hang tight!, I'm working on it!
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4 w-3/4 mx-auto bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full animate-progress"></div>
                  </div>
                </div>
              )}
              {state.show === SUCCESS && (
                <div className="animate-bounceIn">
                  <div className="mb-4 bg-green-500/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <img
                      src="/images/check.svg"
                      alt="Success"
                      className="w-12 h-12"
                      width="48"
                      height="48"
                    />
                  </div>
                  <div className="text-xl mb-2 text-green-400">
                    Message Sent!
                  </div>
                  <div className="text-sm text-gray-300">
                    Thanks for getting in touch, I appreciate it!
                  </div>
                </div>
              )}
              {state.show === ERROR && (
                <div className="animate-shake">
                  <div className="mb-4 bg-red-500/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <img
                      src="/images/times.svg"
                      alt="Error"
                      className="w-12 h-12"
                      width="48"
                      height="48"
                    />
                  </div>
                  <div className="text-xl mb-2 text-red-400">
                    Something went wrong
                  </div>
                  <div className="text-sm text-gray-300">
                    Oops, sorry about that! Looks like we hit a snag.
                  </div>
                  <button
                    onClick={handleClick}
                    className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-full transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
