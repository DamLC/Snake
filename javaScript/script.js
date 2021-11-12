window.onload = function()
{
    // our snake
    var skaa;

    var canvas;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;

    //delai for the refresh
    var delay = 100;
    
     init();

    function init()
    {
        // create the canvas
        canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        
        //create context 
        ctx = canvas.getContext('2d');

        //create snake object
        skaa = new snake([[6,4],[5,4],[4,4]], "right");
        refreshCanvas();
    }
    
    function refreshCanvas()
    {                 
        ctx.clearRect(0,0,canvas.width,canvas.height);
        skaa.draw();    
        skaa.forward();    
        setTimeout(refreshCanvas,delay);
    }

    //draw one block of the body
    function drawBlock(ctx, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    // create the snake body
    function snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i < this.body.length; i++)
            {
               
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore(); 
        };
        //move the snake
        this.forward = function()
        {
            var nextPosition = this.body[0].slice();
            switch(this.direction)
            {
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
                    throw("invalide direction");
            }            
            this.body.unshift(nextPosition); // add the new position on the array [7,4]
            this.body.pop(); // delete the last position [4,4]
        };

        this.setDirection = function(newDirection)
        {
         var allowDirection;

            switch(this.direction)
            {
                case "up":      
                case "down":   
                allowDirection = ["right", "left"];
                break;

                case "right":
                case "left":
                allowDirection = ["up", "down"];
                break;

                default:
                    throw("invalide direction");
            }
            
            if(allowDirection.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }
        };
    }

    document.onkeydown = function handleKeyDown(e)
    {
        var key = e.key;
        var newDirection;

        switch(key)
        {
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

            default:
                return;
            
        }
        skaa.setDirection(newDirection);
    }
}