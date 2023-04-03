import { SET_ACCESS_TOKEN, TokenAction } from '../actions/token'

interface TokenState {
  accessToken: string | null
}

const initialState: TokenState = {
  accessToken: null,
}

function tokenReducer(state = initialState, action: TokenAction): TokenState {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { accessToken: action.payload }
    default:
      return state
  }
}

export default tokenReducer
