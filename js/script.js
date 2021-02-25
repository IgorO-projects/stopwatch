// // написать секундомер с кнопками старт стоп и отображением времени:
// // 1. На старт нельзя нажать больше одного раза
// // 2. Нажав на стоп - пауза (+текст кнопки меняется на reset),
// //  нажав повторно кнопку (reset) - обнуление.
// // 3. При паузе можно нажать старт и продолжить с момента остановки
// // 4. Добавить к секундам десятые = 0.6s
// // 5. Когда таймер доходит до 60-ти секунд - у нас добавляется показатель минут
// // 6. Добавляем 3-ую кнопку Lap (круг), 
// // при нажатии на которую фиксируется текущее значение секундомера 
// // (не останавливая его) и добавляется это значение в список на экране

// const refs = {
//     body: document.querySelector('body'),
//     div: document.createElement('div'),
//     starBtn: document.createElement('button'),
//     stopBtn: document.createElement('button'),
//     outPut: document.createElement('span'),
// }

// refs.div.classList.add('stopwatch__container');
// refs.outPut.classList.add('stopwatch__timer');

// refs.starBtn.classList.add('starBtn');
// refs.starBtn.textContent = 'start';

// refs.stopBtn.classList.add('stopBtn');
// refs.stopBtn.textContent = 'pause';

// refs.div.append(refs.outPut ,refs.starBtn, refs.stopBtn);
// refs.body.prepend(refs.div);



// let timeCheck = 0;
// refs.outPut.textContent = timeCheck;
// let setIntRef = '';

// function timeCalc (time) {
//     let str = '';
//     if(time < 600) {
//         str = `${time / 10}`;
//     }
//     else if (time >= 600) {
//         str = `${Math.round(time / 600)} m : ${time % 600} s`;
//     }
//     refs.outPut.textContent = str;
// }

// function start () {
//     setIntRef = setInterval(() => {
//         timeCheck += 1;
//         timeCalc(timeCheck);
//         // refs.outPut.textContent = `${(timeCheck += 1) / 100}`;
//     }, 100);
//     if (refs.stopBtn.textContent = 'reset') {
//         refs.stopBtn.textContent = 'pause';
//     }
//     refs.starBtn.removeEventListener('click',start);
// };

// function stop () {
//     clearInterval(setIntRef);
//     if (refs.stopBtn.textContent === 'reset') {
//         timeCheck = 0;
//         refs.outPut.textContent = `${timeCheck}`;
//         refs.stopBtn.textContent = 'pause';
//         return;
//     }
//     refs.stopBtn.textContent = 'reset';
//     refs.starBtn.addEventListener('click', start);
// }

// refs.starBtn.addEventListener('click', start);
// refs.stopBtn.addEventListener('click', stop);


/**************************************************************/ 

const startBtnRef = document.querySelector('button[data-action="start"]');
const stopBtnRef = document.querySelector('button[data-action="stop"]');
const outputRef = document.querySelector('.js-clockface');
outputRef.textContent = '00:00:00';

const timer = {
    intervalId: null,
    isActive: false, 

    start() {
        if (this.isActive) return;
        this.isActive = true;

        const startTime = Date.now();

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;


            updateClockface(deltaTime);
        }, 1000);
    },

    stop() {
        
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isActive = false;
        updateClockface(0);
    },
}
startBtnRef.addEventListener('click', timer.start.bind(timer));
stopBtnRef.addEventListener('click', timer.stop.bind(timer));

function updateClockface(time) {
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))))
    const mins = pad(Math.floor((time % (1000 * 60 * 60) / (1000 * 60))))
    const secs = pad(Math.floor((time % (1000 * 60) / (1000))))

    outputRef.textContent = `${hours}:${mins}:${secs}`;
}

function pad(value) {
    return String(value).padStart(2, '0');
}