document.addEventListener('DOMContentLoaded', () => {
    const fish = document.getElementById('fish');
    const gameContainer = document.getElementById('gameContainer');
    const obstacles = document.querySelectorAll('.obstacle');
    const coins = document.querySelectorAll('.coin');

    let fishTop = fish.offsetTop;
    let fishLeft = fish.offsetLeft;
    const gravity = 0.2;
    const speed = 5;
    let velocityY = 0;
    let velocityX = 0;
    let score = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            velocityY = -5;
        } else if (e.key === 'ArrowDown') {
            velocityY = 5;
        } else if (e.key === 'ArrowLeft') {
            velocityX = -speed;
        } else if (e.key === 'ArrowRight') {
            velocityX = speed;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            velocityY = 0;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            velocityX = 0;
        }
    });

    function gameLoop() {
        velocityY += gravity;
        fishTop += velocityY;
        fishLeft += velocityX;
        fish.style.top = fishTop + 'px';
        fish.style.left = fishLeft + 'px';

        if (fishTop + fish.clientHeight > gameContainer.clientHeight) {
            fishTop = gameContainer.clientHeight - fish.clientHeight;
            velocityY = 0;
        }

        if (fishTop < 0) {
            fishTop = 0;
            velocityY = 0;
        }

        if (fishLeft < 0) {
            fishLeft = 0;
        }

        if (fishLeft + fish.clientWidth > gameContainer.clientWidth) {
            fishLeft = gameContainer.clientWidth - fish.clientWidth;
        }

        obstacles.forEach(obstacle => {
            let obstacleLeft = parseInt(obstacle.style.left);
            obstacleLeft -= 2;

            if (obstacleLeft + obstacle.clientWidth < 0) {
                obstacleLeft = gameContainer.clientWidth;
                obstacle.style.top = Math.random() * (gameContainer.clientHeight - obstacle.clientHeight) + 'px';
            }

            obstacle.style.left = obstacleLeft + 'px';

            if (checkCollision(fish, obstacle)) {
                alert('Game Over! Score: ' + score);
                resetGame();
            }
        });

        coins.forEach(coin => {
            let coinLeft = parseInt(coin.style.left);
            coinLeft -= 2;

            if (coinLeft + coin.clientWidth < 0) {
                coinLeft = gameContainer.clientWidth;
                coin.style.top = Math.random() * (gameContainer.clientHeight - coin.clientHeight) + 'px';
            }

            coin.style.left = coinLeft + 'px';

            if (checkCollision(fish, coin)) {
                score += 10;
                coin.style.left = gameContainer.clientWidth + 'px';
            }
        });

        requestAnimationFrame(gameLoop);
    }

    function checkCollision(rect1, rect2) {
        const rect1Bounds = rect1.getBoundingClientRect();
        const rect2Bounds = rect2.getBoundingClientRect();

        return !(
            rect1Bounds.top > rect2Bounds.bottom ||
            rect1Bounds.bottom < rect2Bounds.top ||
            rect1Bounds.left > rect2Bounds.right ||
            rect1Bounds.right < rect2Bounds.left
        );
    }

    function resetGame() {
        fishTop = gameContainer.clientHeight / 2 - fish.clientHeight / 2;
        fishLeft = gameContainer.clientWidth / 10;
        fish.style.top = fishTop + 'px';
        fish.style.left = fishLeft + 'px';
        velocityY = 0;
        velocityX = 0;
        score = 0;
        obstacles.forEach(obstacle => {
            obstacle.style.left = Math.random() * gameContainer.clientWidth + 'px';
        });
        coins.forEach(coin => {
            coin.style.left = Math.random() * gameContainer.clientWidth + 'px';
        });
    }

    gameLoop();
});
