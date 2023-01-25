declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
    }
  }
}

export type RootStackParamList = {
  GoogleSignIn: undefined,
  Home: undefined;
  ProfileInfo: undefined;
  Profile: undefined;
  Error: { errorMessage: string }
  Categories: undefined
  Expenses: { id: number, categoryId: number }
}