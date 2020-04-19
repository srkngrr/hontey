import { createSelector } from 'reselect'; // for not to rerendering 

const selectUser = state => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser )