import { createStore } from "../util/createStore"

interface State {
    user?: {
        id: string
    }
}

const initialState: State = {}

type Actions = 
    { type: 'setUser', user: State['user'] }

function reducer (state: State, action: Actions) {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.user }
        default:
            return state
    }
}

export const { 
    Provider: AppStoreProvider, 
    useStore: useAppStore, 
} = createStore<State, Actions>(reducer, initialState)
