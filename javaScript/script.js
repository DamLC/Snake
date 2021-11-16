window.onload = function() {
    // snake
    var skaa;

    // apple
    var granySmith;

    var canvas;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;
    var score;

    //delai for the refresh
    var delay = 100;

    init();

    function init() {

        // create the canvas
        canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid";
        canvas.style.borderRadius = "10px";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";

        document.body.appendChild(canvas);

        //create context 
        ctx = canvas.getContext('2d');
        skaa = new snake([
            [6, 4],
            [5, 4],
            [4, 4]
        ], "right"); //create snake
        granySmith = new apple([10, 10]); //create apple
        score = 0;
        refreshCanvas();
    }

    function refreshCanvas() {
        skaa.forward();
        if (skaa.checkCollision()) {
            gameOver();
        } else {
            if (skaa.eatingApple(granySmith)) {
                score++;
                skaa.ateApple = true;
                do {
                    granySmith.setNewPosition();
                }
                while (granySmith.isOnSnake(skaa))
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            skaa.draw();
            granySmith.drawApple();
            drawScore();
            setTimeout(refreshCanvas, delay);
        }
    }

    function gameOver() {
        ctx.save();
        ctx.font = "bold 70px sans-sérif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 3);
        ctx.font = "50px sans-sérif";
        ctx.fillText("Press ENTER to restart", canvasWidth / 2, (canvasHeight / 2) + 100);
        ctx.restore();
    }

    function restart() {
        skaa = new snake([
            [6, 4],
            [5, 4],
            [4, 4]
        ], "right"); //create snake
        granySmith = new apple([10, 10]); //create apple
        score = 0;
        refreshCanvas();
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 40px sans-sérif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.fillText("Apple : " +
            score.toString(), canvasWidth - 100, 50);
        ctx.restore();
    }

    //draw one block of the body
    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    // create the snake body
    function snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#FF0000";
            for (var i = 0; i < this.body.length; i++) {

                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        //move the snake
        this.forward = function() {
            var nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "up":
                    nextPosition[1]--;
                    break;

                case "down":
                    nextPosition[1]++;
                    break;

                case "right":
                    nextPosition[0]++;
                    break;

                case "left":
                    nextPosition[0]--;
                    break;

                default:
                    throw ("invalide direction");
            }
            this.body.unshift(nextPosition); // add the new position on the array [7,4]

            if (!this.ateApple)
                this.body.pop(); // delete the last position [4,4]
            else
                this.ateApple = false;
        };

        this.setDirection = function(newDirection) {
            var allowDirection;

            switch (this.direction) {
                case "up":
                case "down":
                    allowDirection = ["right", "left"];
                    break;

                case "right":
                case "left":
                    allowDirection = ["up", "down"];
                    break;

                default:
                    throw ("invalide direction");
            }

            if (allowDirection.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };

        this.checkCollision = function() {
            var wallCollision = false;
            var snakeCollision = false;

            var head = this.body[0];
            var snakeX = head[0];
            var snakeY = head[1];
            var snakeBody = this.body.slice(1);

            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;

            var notBetweenX = snakeX < minX || snakeX > maxX;
            var notBetweenY = snakeY < minY || snakeY > maxY;

            if (notBetweenX || notBetweenY) {
                wallCollision = true;
            }

            for (var i = 0; i < snakeBody.length; i++) {
                if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;
        };

        this.eatingApple = function(appleToEat) {

            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
                return true;
            } else {
                return false;
            }
        };
    }

    // create apple
    function apple(position) {
        this.position = position;
        this.drawApple = function drawApple() {
            ctx.save();
            ctx.fillStyle = "#33CC33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function() {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };

        this.isOnSnake = function(snakeToCheck) {
            var isOnSnake = false;

            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
                    isOnSnake = true;
            }
            return isOnSnake;
        }

    }

    document.onkeydown = function handleKeyDown(e) {
        var key = e.key;
        var newDirection;

        switch (key) {
            case "ArrowLeft":
                newDirection = "left";
                break;

            case "ArrowUp":
                newDirection = "up";
                break;

            case "ArrowRight":
                newDirection = "right";
                break;

            case "ArrowDown":
                newDirection = "down";
                break;
            case "Enter":
                restart();
            default:
                return;

        }
        skaa.setDirection(newDirection);
    }
}