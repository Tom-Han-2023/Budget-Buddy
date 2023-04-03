export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

export type TokenAction = {
  type: typeof SET_ACCESS_TOKEN
  payload: string | null
}

export function setAccessToken(accessToken: string | null): TokenAction {
  return {
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
  }
}
