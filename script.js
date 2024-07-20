document.addEventListener('DOMContentLoaded', () => {
    const timerForm = document.getElementById('timer-form');
    const timersContainer = document.getElementById('timers-container');
    const alertSound = document.getElementById('alert-sound');
    let timers = [];

    timerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (totalSeconds > 0) {
            startTimer(totalSeconds);
        }
    });

    function startTimer(duration) {
        const timerId = Date.now();
        const timer = {
            id: timerId,
            duration,
            remaining: duration,
            interval: null,
        };

        timers.push(timer);
        renderTimer(timer);

        timer.interval = setInterval(() => {
            updateTimer(timer);
        }, 1000);
    }

    function updateTimer(timer) {
        if (timer.remaining <= 0) {
            clearInterval(timer.interval);
            timerEnded(timer);
        } else {
            timer.remaining -= 1;
            document.getElementById(`timer-${timer.id}`).textContent = formatTime(timer.remaining);
        }
    }

    function timerEnded(timer) {
        const timerElement = document.getElementById(`timer-container-${timer.id}`);
        timerElement.classList.add('timer-ended');
        alertSound.play();
    }

    function renderTimer(timer) {
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        timerElement.setAttribute('id', `timer-container-${timer.id}`);

        const timeElement = document.createElement('span');
        timeElement.setAttribute('id', `timer-${timer.id}`);
        timeElement.textContent = formatTime(timer.remaining);

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Timer';
        stopButton.addEventListener('click', () => stopTimer(timer));

        timerElement.appendChild(timeElement);
        timerElement.appendChild(stopButton);
        timersContainer.appendChild(timerElement);
    }

    function stopTimer(timer) {
        clearInterval(timer.interval);

        timers = timers.filter(t => t.id !== timer.id);
        const timerElement = document.getElementById(`timer-container-${timer.id}`);
        timersContainer.removeChild(timerElement);
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
});
