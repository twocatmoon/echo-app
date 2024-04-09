import { useReducer, useContext, createContext } from "react"

export function createStore <State, Actions> (reducer: any, initialState: any) {
    const context = createContext({
        state: initialState,
        dispatch: (() => {}) as (action: Actions) => void,
    })

    const Provider = (props: { children: React.ReactNode }) => {
        const [ state, dispatch ] = useReducer(reducer, initialState)

        return (
            <context.Provider value={{ state, dispatch }}>
                {props.children}
            </context.Provider>
        )
    }

    const useStore = () => {
        const { state, dispatch } = useContext(context)

        return [
            state,
            dispatch,
        ] as [
            State,
            (action: Actions) => void,
        ]
    }

    return {
        Provider,
        useStore,
    }
}
