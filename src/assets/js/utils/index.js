import echo from '../lib/echo.js'

function lazyImg() {
    echo.init({
        offset: 100,
        throttle: 0
    });
}

export default {
	lazyImg
}