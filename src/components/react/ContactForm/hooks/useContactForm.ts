import React, { useEffect, useReducer } from 'react'
import validator from 'cgc-validator'
import { SUCCESS, ERROR, LOADING } from '@constants'

type StateType = {
  show: null | string,
  errors: { name: null | string, email: null | string, message: null | string }
  canSendMail?: boolean
  token?: string | null
}
type ActionType = {
  type: string,
  payload?: string | null
}

function useContactForm () {
  const reducer = (
    state: StateType,
    action: ActionType
  ): StateType => {
    switch (action.type) {
      case 'show-success':
        return { ...state, show: SUCCESS }
      case 'show-error':
        return { ...state, show: ERROR }
      case 'show-loading':
        return { ...state, show: LOADING }
      case 'hide':
        return { ...state, show: null }
      case 'set-errors':
        if (!action.payload) return state
        return { ...state, errors: { ...state.errors, ...JSON.parse(action.payload) } }
      case 'clear-errors':
        return { ...state, errors: { name: null, email: null, message: null } }
      case 'can-send-mail':
        return { ...state, canSendMail: action.payload === 'true' }
      case 'set-token':
        return { ...state, token: action.payload }
      default:
        return state
    }
  }
  const initialState: StateType = {
    show: null,
    errors: { name: null, email: null, message: null },
    canSendMail: false,
    token: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const messageRef = React.useRef<HTMLTextAreaElement>(null)

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    dispatch({ type: 'clear-errors' })
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const message = messageRef.current?.value
    console.log(name, email, message)

    const rules = {
      name: 'required;type=string;min=3;max=50;alias=Name',
      email: 'required;type=email;alias=Email',
      message: 'required;type=string;min=10;max=500;alias=Message'
    }

    const validation = validator({ name, email, message }, rules)

    if (validation.success) {
      dispatch({ type: 'show-loading' })
      console.log('validation success')
      const response = await fetch('https://contacto.cgcapps.cl', {
        method: 'POST',
        body: JSON.stringify({ name, email, message, token: state.token }),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      }).catch(error => console.log({ error }))

      if (response && response.status === 200) {
        const json = await response.json()
        console.log(json)
        dispatch({ type: 'show-success' })
      } else {
        console.log({ response })
        dispatch({ type: 'show-error' })
      }
    }
    else {
      dispatch({ type: 'set-errors', payload: JSON.stringify(validation.messages) })
    }
  }

  useEffect(() => {
    if (state.show === SUCCESS || state.show === ERROR) {
      setTimeout(() => {
        dispatch({ type: 'hide' })
      }, 3000)
    }
  }, [state.show])

  React.useEffect(() => {
    //@ts-ignore
    window.onloadTurnstileCallback = function () {
      //@ts-ignore
      if (typeof window.turnstile !== 'undefined') {
        //@ts-ignore
        window.turnstile.render('#captcha-container', {
          sitekey: '0x4AAAAAAAN5nJP-g1lrI6nT',
          callback: function (token: string) {
            dispatch({ type: 'can-send-mail', payload: 'true' })
            dispatch({ type: 'set-token', payload: token })
          },
          'expired-callback': function () {
            dispatch({ type: 'can-send-mail', payload: 'false' })
          }
        })
      }
    }

  }, [])


  return { state, nameRef, emailRef, messageRef, handleClick }
}

export default useContactForm