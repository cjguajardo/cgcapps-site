import React from 'react'
import InputError from './InputError'
import { SUCCESS, ERROR, LOADING } from '../../constants'
import useContactForm from '../../hooks/useContactForm'

const ContactForm = () => {
  const { state, nameRef, emailRef, messageRef, handleClick } = useContactForm()

  return (
    <div className="flex flex-col justify-items-center w-full relative">

      <div className="mb-4 w-full px-5 py-2">
        <label className="block text-gray-400 font-bold mb-2" htmlFor="name"> Name {state.errors.name && <InputError message={state.errors.name} />}</label>
        <input ref={nameRef}
          className="border rounded-full w-full py-2 px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="John Doe"
        />
      </div>

      <div className="mb-4 w-full px-5 py-2">
        <label className="block text-gray-400 font-bold mb-2" htmlFor="email">
          Email {state.errors.email && <InputError message={state.errors.email} />}</label
        >
        <input ref={emailRef}
          className="border rounded-full w-full py-2 px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="johndoe@example.com"
        />

      </div>

      <div className="mb-4 w-full px-5 py-2">
        <label className="block text-gray-400 font-bold mb-2" htmlFor="message">
          Message {state.errors.message && <InputError message={state.errors.message} />}
        </label>
        <textarea ref={messageRef}
          className="border rounded-xl w-full py-2 px-3 text-white bg-indigo-950/20 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows={10}
          placeholder="Enter your message here"></textarea>
      </div>

      <div className="flex mb-4 w-full px-5 py-2 items-center" id="captcha-container">
      </div>

      <div className="flex items-center justify-center pt-2 pb-4">
        <button
          className={`${state.canSendMail ? 'bg-indigo-500 hover:bg-indigo-700' : 'bg-slate-400'} text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-1/2 sm:w/4`}
          type="button"
          onClick={handleClick}
          disabled={!state.canSendMail}
        >
          Send
        </button>
      </div>

      {state.show !== null && <div className="absolute w-full rounded-xl h-full">
        <div className='absolute backdrop-blur w-full h-full'></div>
        <div className="absolute w-full top-1/2 text-white text-center font-bold">

          {state.show === LOADING && <>
            <img src='/images/loader.svg' alt="loader" className="w-10 mx-auto animate-spin" />
            <span>Hang tight!, I'm working on it!</span>
          </>}
          {state.show === SUCCESS && <>
            <img src='/images/check.svg' alt="success" className="w-10 mx-auto" />
            <span>Thanks for getting in touch, I appreciate it!</span>
          </>}
          {state.show === ERROR && <>
            <img src='/images/times.svg' alt="success" className="w-10 mx-auto" />
            <span>Oops, sorry about that! Looks like we hit a snag.</span>
          </>}

        </div>
      </div>}

    </div>
  )
}

export default ContactForm