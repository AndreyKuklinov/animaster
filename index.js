addListeners();


function animaster() {
     return {
        _steps : [],

        fadeIn(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },
        resetFadeIn(element) {
            element.style.transitionDuration = null;
            element.classList.remove('show');
            element.classList.add('hide');
        },
        move(element, duration, translation) {
            this.addMove(duration, translation).play(element);
        },
        scale(element, duration, ratio) {
            element.style.transitionDuration =  `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },
        moveAndHide(element, duration) {
            this.move(element, duration*2/5, {x: 100, y: 20});
            setTimeout(() => this.fadeOut(element, duration*3/5), duration*2/5);
        },
        showAndHide(element, duration) {
            this.fadeIn(element, duration*1/3);
            setTimeout(() => this.fadeOut(element, duration*1/3), duration*2/3);
        },
        fadeOut(element, duration) {
             element.style.transitionDuration =  `${duration}ms`;
             element.classList.remove('show');
             element.classList.add('hide');
        },
        resetFadeOut(element) {
            element.style.transitionDuration = null;
            element.classList.remove('hide');
            element.classList.add('show');
        },
        resetMoveAndScale(element) {
            element.style.transitionDuration = null;
            element.style.transform = (null, null);
        },
        addMove (duration, translation) {
            this._steps.push((element) => {
                element.style.transitionDuration = `${duration}ms`;
                element.style.transform = getTransform(translation, null);
            });
            return this;
        },
        play (element) {
            for(const step of this._steps)
                step(element);
        },
    }

}

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 1000);
        });

        document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 1000);
        });

        document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().resetFadeIn(block);
        });

        document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().resetFadeOut(block);
        });

        document.getElementById('moveReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().resetMoveAndScale(block);
        });

        document.getElementById('scaleReset')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().resetMoveAndScale(block);
        });
}




function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
