

export interface IUserStore {
  email: string,
  id: string,
  role: string,
  avatar_url: string,
  provider_id: string,
}

const initialState = {
  email: '',
  id: '',
  role: '',
  avatar_url: '',
  provider_id: '',
}

const userStore = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    default: {
      return {
        ...state,
      }
    }
  }
}

export default userStore