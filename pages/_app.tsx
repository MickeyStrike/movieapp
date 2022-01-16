import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useReducer, Dispatch } from 'react'
import initialState from '../store/initialState'
import { ActionReducer, InitialState } from '../interfaces/interface/interface.initialState'
import reducer from '../store/reducer'

export const StoreContext = React.createContext<{ stateContext: InitialState, dispatch: Dispatch<ActionReducer> }>({ stateContext: initialState, dispatch: () => null })

function MyApp({ Component, pageProps }: AppProps) {
  const [stateContext, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ stateContext, dispatch }}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}

export default MyApp
