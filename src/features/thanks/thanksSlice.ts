import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ThanksState {
  encryptedMessage: string;
  plainTextMessage: string | undefined;
  revealedIndex: number;
}

const message = "{\"iv\":\"uUGJV7iEHD8GtLTqYieVpg==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"9N8jbznMjdo=\",\"ct\":\"6I35n5fHZF5A4B6+tj+Cu9hlzUU5ClympbNVXtinodmmDB8my+f358jkXLaVp2U9MvQk8FOaVSR3Vi/Ms/RixsSPUJDBju+DokzhPpehOs1N8hLrenoweMdaB/GvSKgxBGYA8mTTpuDBrwZBOc2AJG/ArJKwEwzKdVFDslWisSQAlUkaRZQ1JCrlqsnJ+OM/cwgvLlRU2doaTFDvWJFh1aqnTeXyCEzCGzhV0C2QFAIvixXgF1CqmyeRH+XHSy9OrfwnwclaRXTD1XXT0FLf83ocp9qGddrGhP9fk8uo2AzpzVRoltkm+5oiJzYy382f2Ydj1Ow5vIRFeOF5+nT7o1qEYPnS6pRqqFdMXldTZCWtLxr7Te1DuIPB0T9xRuMxqKAnJz3ftyjYSyVc8nSEAAgQ3DR9RaM0cSGd385et/8g6FeD5ewhZjR8aYzsapEj3rYDWcNGg81GuQDrOV34y0DpmqdV12ABCVUGCRMqHv49f4qekd9ncNeKfZQqbRJi/7ZsOY656Di1xmGfqoHGF0cnbou8wA/s8148qwIVJk1soWP3f+5kLqRDH6J31hzSOq9UYnMrcFxnLy5hl+XxMrCog6tjdK6852rOClP7+25bI7oujnNHndx0w64oSPFtDJGweWa7J6hK58FQPJdhN4oeX3dNsWiQnkibNX5fGCHsBsq8XPj6ctG4zghHH7MHhmR3KAhNnxX3NDNKFTGSlA/JdU0V4EG3wsu5nPKRMeq6lCELuJByikg/TqKKMnXumfm0W44tKvQMc2wlnmz2u18r0AxD4/Ez8xUIU6HQbcxZF/Kk2cGiAPbrjL4rRHXVafOaFIVPcdJuylOsTQwSiOigjad9eJP5TAW6Pd5QydUiZGV7DjvITO+OQp81QheRg3UgSEgLvnX4s8BjMf0alJFbVZ3ZF3KLas2nWGpxNPh5NI9DL762xIwg2Z6DDi7LZR7K6IoU50wyMCwqMeYTqmEpKFBAE04GScourOg1t4BIdM0K8xFRQT4uxmxjzDzwHjF8xS11+g5j2aXQKiq7A128CWjT5LK8eBcOtFxC7vXXJ/aw5rmH1C/+QlYs/L78o0ilgUvWqgXb9reFrOP7US5GJd9ff8O0eu+xy8aPNLbnNL18AyOPE/YvcbyPwfhkfwc1KRu656xxLxAeeBNbh7LBhAzvlw7erYQ8QnncUy+U1UhGIrLyp7j0ubNmg3SY/viMZUUcZ5t+B1IFNY6yYcpdJdLdlHV7u3MTztfrEv/4z3CND83Wi1qUQFbCsYM5JI0j/3q7DX8GcsiZVJ95dp+YGxbewqClWci1kfGARAhkBww5k1dIhkPYBDtLRUdFNr04VHmo6m0vhCwcnSB3WWisEqIPe7yEVvyWnkc0Galn4Uo0pbDRGJzY758uspzgqiRbEbqggebpCV384/00CC/Ch7XwlDK7XQeBYQFYPH0nIG0bOHaarsZuwp6P7JBAq0oOW054pcCnrUE6g2nAPRsRMzGX1qBNIH0ySDuxdpX27yNLOGr6FSfqKYMiNF+a9+fAftFlD984v9eeSe6+rGQbVV8pRaH3\"}"
const initialState: ThanksState = {
  encryptedMessage: message,
  plainTextMessage: undefined,
  revealedIndex: 0,
};


export const thanksSlice = createSlice({
  name: 'thanks',
  initialState,
  reducers: {
    incrementReveal: (state, _) => {
      state.revealedIndex += 1;
    },
    setPlainText: (state, action: PayloadAction<{ privateKey: String }>) => {
      const plainText = { decrypt: (k: String) => k }.decrypt(action.payload.privateKey);
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