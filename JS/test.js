const { interval, Subject, never } = require('rxjs');
const { map, take, switchMap } = require('rxjs/operators');

class Timer {

    constructor(timeout_ms) {
        let i = 0;

        const $obs = interval(10).pipe(
            map(() => i++),
            map(x => {
                const now = new Date(timeout_ms - x * 10);

                const minuteString = now.getMinutes().toString().padStart(2, '0');
                const secondString = now.getSeconds().toString().padStart(2, '0')
                const centisecString = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0')

                return `${minuteString}:${secondString}:${centisecString}`;
            }),
        );
        this.pauser = new Subject();
        this.$pausableTimer = this.pauser.pipe(
            switchMap(paused => paused ? never() : $obs.pipe(take(timeout_ms / 10 - i + 1))),
        )
    }

    pause() {
        this.pauser.next(true);
    }

    resume() {
        this.pauser.next(false);
    }

    start() {
        this.$pausableTimer.subscribe(console.log, console.error, () => console.log('Finished'))
        this.pauser.next(false);
    }
}

const timer = new Timer(5000);

timer.start();

setTimeout(() => timer.pause(), 1000);

setTimeout(() => timer.resume(), 3000);