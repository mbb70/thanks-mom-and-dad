import React from 'react';
import sjcl from './features/thanks/sjcl';
import { message, ps } from './features/thanks/message';

function attemptDecrypt(phone: string, car: string, message: string, setDisplay: Function, encryptedPS: string, setPS: Function, setRevealedIndex: Function) {
  const inputs = [phone, car].map((s) => s.toLowerCase().replace(/[ \-_()]/g, ''));
  const password = inputs.join('-')
  try {
    const display = (sjcl as any).decrypt(password, message);
    const ps = (sjcl as any).decrypt(password, encryptedPS);
    setDisplay(display);
    setPS(ps);
    incrementallyReveal(setRevealedIndex, 0, display.length);
  } catch {
  }
}

function incrementallyReveal(setRevealedIndex: Function, index: number, max: number) {
  setTimeout(() => {
    const newIndex = index + 10;
    setRevealedIndex(newIndex);
    if (newIndex < max) {
      incrementallyReveal(setRevealedIndex, newIndex, max);
    }
  }, 0.01)
}

const encrypted = JSON.parse(message).ct;

function App() {
  const [phone, setPhone] = React.useState('');
  const [car, setCar] = React.useState('');
  const [display, setDisplay] = React.useState('');
  const [plainPS, setPS] = React.useState('');
  const [revealedIndex, setRevealedIndex] = React.useState(0);
  const notDone = revealedIndex === 0 || revealedIndex < display.length;
  const revealedPlain = display.slice(0, revealedIndex);
  const revealedEncrypted = notDone ? encrypted.slice(revealedIndex) : '';
  const x = "text-3xl my-6 text-xl mb-6 mb-4 my-4";
  return (
    <div className={`sm:mt-8 grid justify-items-center`}>
      <div className={`bg-white rounded shadow-lg p-4 max-w-xl`}>
        <form>
          <div>
            <div className="mb-4">
              <label className="text-xl">What was our home phone number?</label>
            </div>
            <div className="mb-4">
              <input className="border rounded shadow text-xl" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="mb-4">
              <label className="text-xl">What was the make and model of the car the kids drove?</label>
            </div>
            <div className="mb-4">
              <input className="border rounded shadow text-xl" value={car} onChange={(e) => setCar(e.target.value)}/>
            </div>
            <div>
            <button type="button" onClick={() => attemptDecrypt(phone, car, message, setDisplay, ps, setPS, setRevealedIndex) } className="bg-blue-300 rounded shadow text-xl p-2">
              Decrypt
            </button>
            </div>
          </div>
        </form>
        <div className="mt-4">
          <span dangerouslySetInnerHTML={{__html: revealedPlain}}></span>
          <span className="break-all" dangerouslySetInnerHTML={{__html: revealedEncrypted}}></span>
        </div>
        <div style={{display: revealedPlain === display ? '' : 'none'}}>
          <div dangerouslySetInnerHTML={{__html: plainPS}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
