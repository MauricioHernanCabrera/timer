import React, { useState } from 'react';
import './App.scss';

let interval = null;

const PATTERN_VIBRATE_FINISH_TIMER = [500, 250, 500, 250, 500];

const PATTERN_VIBRATE_START_TIMER = [200];

const sayMessage = (title = 'Timer') => {
  try {
    const voice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
    const message = new SpeechSynthesisUtterance(`${title} Finished¡`);
    message.voice = voice || window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(message);
  } catch (e) {}
};

const vibrate = pattern => {
  try {
    window.navigator.vibrate(pattern);
  } catch (e) {}
};

const showNotification = async (title, config) => {
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;

    registration.showNotification(title, config);
  } catch (e) {}
};

const enableNotifications = async () => {
  try {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      // return alert('Tu navegador no soporta notificaciones')
      return;
    }

    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    if (Notification.permission === 'blocked') {
      // return alert('Bloqueaste las notificaciones :(')
      return;
    }

    if (Notification.permission !== 'granted') {
      return;
    }
  } catch (e) {}
};

const useTimer = ({ minutes = 0, seconds = 0 } = {}) => {
  const [defaultTimer, setDefaulTimer] = useState({ minutes, seconds });
  const [timer, setTimer] = useState({ minutes, seconds });
  const [status, setStatus] = useState('off');

  const finishedTimer = ({ minutes, seconds }) => minutes <= 0 && seconds <= 0;

  const restartTimer = () => {
    setStatus('off');
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    setTimer({ ...defaultTimer });
  };

  const pauseTimer = () => {
    setStatus('pause');
    clearInterval(interval);
    interval = null;
  };

  const reduceTimer = () => {
    if (timer.seconds <= 0) {
      timer.minutes--;
      timer.seconds = 60;
    }
    timer.seconds--;
    setTimer({ ...timer });

    enableNotifications();
    showNotification(`${timer.minutes}:${timer.seconds}`, {
      body: 'Timer in process!',
      tag: '11111',
      silent: false,
      renotify: true,
      vibrate: PATTERN_VIBRATE_FINISH_TIMER
    });

    if (finishedTimer(timer)) {
      sayMessage();
      enableNotifications();
      showNotification('Timer finished!', {
        body: 'Timer finished!',
        tag: '11111',
        silent: false,
        renotify: true,
        vibrate: PATTERN_VIBRATE_FINISH_TIMER
      });

      restartTimer();
      // vibrate(PATTERN_VIBRATE_FINISH_TIMER);
    }
  };

  const playTimer = () => {
    if (status === 'off') setDefaulTimer({ ...timer });

    enableNotifications();
    vibrate(PATTERN_VIBRATE_START_TIMER);
    interval = setInterval(reduceTimer, 1000);
    setStatus('on');
  };

  const updateTimer = timer => {
    setDefaulTimer({ ...timer });
    setTimer({ ...timer });
  };

  return {
    timer: { ...timer, status },
    restartTimer,
    pauseTimer,
    playTimer,
    updateTimer
  };
};

const useForm = () => {
  const [active, setActiveForm] = useState(false);
  const [data, setForm] = useState({ minutes: 0, seconds: 0 });

  return {
    form: {
      ...data,
      active
    },
    setActiveForm,
    setForm
  };
};

function App() {
  const { timer, restartTimer, pauseTimer, playTimer, updateTimer } = useTimer({
    minutes: 1,
    seconds: 0
  });

  const { form, setForm, setActiveForm } = useForm({ minutes: 0, seconds: 0 });

  const handleSubmitForm = event => {
    event.preventDefault();
    updateTimer(form);
    setActiveForm(false);
  };

  const handleResetForm = event => {
    event.preventDefault();
    setActiveForm(false);
  };

  const pad2 = number => (String(number).length === 1 ? `0${number}` : number);

  return (
    <div>
      {form.active ? (
        <form onSubmit={handleSubmitForm} onReset={handleResetForm}>
          <input
            type='number'
            min='0'
            max='59'
            placeholder='minutes'
            onInput={event => setForm({ ...form, minutes: parseInt(event.target.value) })}
            defaultValue={form.minutes}
          />

          <input
            type='number'
            min='0'
            max='59'
            step='5'
            placeholder='seconds'
            onInput={event => setForm({ ...form, seconds: parseInt(event.target.value) })}
            defaultValue={form.seconds}
          />
          <br />
          <button type='reset'>cancelar</button>
          <button type='submit'>actualizar</button>
        </form>
      ) : (
        <div>
          <div>
            {['off', 'pause'].includes(timer.status) && (
              <button
                onClick={() => {
                  setForm({ ...timer });
                  setActiveForm(true);
                  console.log(timer);
                }}
              >
                editar
              </button>
            )}
          </div>

          <div>
            <span>{pad2(timer.minutes)}</span>:<span>{pad2(timer.seconds)}</span>
          </div>

          <div>
            {['on', 'pause'].includes(timer.status) && <button onClick={restartTimer}>reiniciar</button>}
            {['off', 'pause'].includes(timer.status) && <button onClick={playTimer}>play</button>}
            {timer.status === 'on' && <button onClick={pauseTimer}>pause</button>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
