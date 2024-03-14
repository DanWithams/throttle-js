export class Throttle {

    constructor(ttl) {
        this.lastTouched = 0;
        this.ttl = ttl;
    }

    static now() {
        return (new Date).getTime();
    }

    async touch(fn) {
        if (this.isThrottled()) {
            return false;
        }

        try {
            await fn.call();
        } catch (error) {
            console.error(error);
            return false;
        }

        this.lastTouched = Throttle.now();
        return true;
    }

    isThrottled() {
        return this.lastTouched + this.ttl > Throttle.now();
    }

    isNotThrottled() {
        return ! this.isThrottled();
    }
}

