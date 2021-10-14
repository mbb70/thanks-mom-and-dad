import React from 'react';
import sjcl from './features/thanks/sjcl';
import { message } from './features/thanks/message';

function attemptDecrypt(phone: String, car: String, message: String, setDisplay: Function, setRevealedIndex: Function) {
  const inputs = [phone, car].map((s) => s.toLowerCase().replace(/[ \-_()]/g, ''));
  const password = inputs.join('-')
  try {
    const display = (sjcl as any).decrypt(password, message);
    setDisplay(display);
    incrementallyReveal(setRevealedIndex, 0, display.length);
  } catch {
  }
}

function incrementallyReveal(setRevealedIndex: Function, index: number, max: number) {
  setTimeout(() => {
    setRevealedIndex(index + 5);
    if (index + 5 < max) {
      incrementallyReveal(setRevealedIndex, index + 5, max)
    }
  }, 0.01)
}

function App() {
  const [phone, setPhone] = React.useState('');
  const [car, setCar] = React.useState('');
  const [display, setDisplay] = React.useState('');
  const [revealedIndex, setRevealedIndex] = React.useState(0);
  const encrypted = JSON.parse(message).ct;
  const displayText = (revealedIndex === 0 || revealedIndex < display.length) ? display.slice(0, revealedIndex) + encrypted.slice(revealedIndex) : display;
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
            <button type="button" onClick={() => attemptDecrypt(phone, car, message, setDisplay, setRevealedIndex) } className="bg-blue-300 rounded shadow text-xl p-2">
              Decrypt
            </button>
            </div>
          </div>
        </form>
        <div className={`mt-4 ${displayText === display ? '' : 'break-all' }`}>
         <div dangerouslySetInnerHTML={{__html: displayText}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
