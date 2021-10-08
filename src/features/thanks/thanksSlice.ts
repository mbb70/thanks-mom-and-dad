import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ThanksState {
  encryptedMessage: string;
  plainTextMessage: string | undefined;
  revealedIndex: number;
}

const message = "{\"iv\":\"t6PEc7t7MKC1/Sox1XmUXA==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"KB73EinBQRQ=\",\"ct\":\"ccHzLM463mJdM8uc1BV7oek7JU38Sqyu7R4pU0ps4Pcza4M/oER6WgcwKf6t/YNf5acFSQh6w1aj0ICDJxFfqh+pqBKAUsPnV6FuU1vu/gX9CnuhPUebTFTMYck+c7/kJ1r6aVNawU9W2fKHfSfW2wb/j4evXY2pT+J5NCZsmLfWrjEMPFNqJejjEROnZYv4Um+W5LxsiJoG+fwlt1gF9i3NtDLyMB91UzDgnaDNP0tADxuOPQWMTa1wI171mRHAZB3m7bN/p3GovYK0RXmMO6LK5PQkV5RxSH3OVQ5xyIq879D29qXGvF7GzF7VWmmVaBvPP+r3LCVTpOVMd+8SpnZr67TYbMNetpjE/osEBn8vqME61x3NYnMdmO6CcRsh1MX/MEulCt69LA41HiIxH1cnaOIFcofKhel5efB3/ozbDli4c7khtdjOwFAZ6ahuRGrDL2lep3G/C53twuUyG7ErMvwjV5p0zxtzt/N+LndbYc8kNiStYP8Z1Q9H2wWJyCmfQmmmnN2d9ctynE8roLVPg6hKBgatzkxp8pF8r+lRY5YiVvRq/76fCE1QjlTMuQY0Q/bea4kQHoxNwp0m/7IdVzs=\"}"
const initialState: ThanksState = {
  encryptedMessage: message,
  plainTextMessage: undefined,
  revealedIndex: 0,
};


/**
 * click button / on keypress
 * attemptDecrypt
 *   if sucess,
 *     dispatch save plaintext message
 *     setTimeout dispatch increment reveal, 0.01
 *  */

export const thanksSlice = createSlice({
  name: 'thanks',
  initialState,
  reducers: {
    incrementReveal: (state, _) => {
      state.revealedIndex += 1;
    },
    setPlainText: (state, action: PayloadAction<{ privateKey: String }>) => {
      const plainText = { decrypt: (k: String) => k }.decrypt(action.payload.privateKey);
      state.plainTextMessage = plainText;
    }
  },
});

export const { setPlainText, incrementReveal } = thanksSlice.actions;

export const checkInputs = (publicKey: String, inputs: String[]) => {
  const clean = inputs.map((s) => s.toLowerCase().replaceAll(/[ -()]/, ''));
  const candidatePassphrase = clean.join('-');
  const candidatePrivateKey = candidatePassphrase; // cyrptico.generatePrivateKey(candidatePassphrase, 1024);
  const candidatePublicKey = candidatePrivateKey;// cyrptico.generatePublicKey(candidatePrivateKey);
  return candidatePublicKey === publicKey;
}


export const plainTextSelector = (state: RootState) => state.thanks.plainTextMessage;
export const encryptedSelector = (state: RootState) => state.thanks.encryptedMessage;
export const revealedSelector = (state: RootState) => state.thanks.revealedIndex;

export const revealedLetters = createSelector(plainTextSelector, revealedSelector, encryptedSelector, (text, index, crypted) => {
  if (text === undefined) return crypted;
  return text.slice(0, index) + crypted.slice(index);
});

export const modalOpen = createSelector(plainTextSelector, (text) => text !== undefined);

export default thanksSlice.reducer;