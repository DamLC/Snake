window.onload = function()
{
    // notre serpent
    var skaa;

    var canvas;
    
    var ctx;

    //delai pour le rafraichissement
    var delay = 100;
    
    // init();

    function init()
    {
        // create the canvas
        canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        
        /*create context */
        ctx = canvas.getContext('2d');

        //create snake object
        skaa = new snake([6,4],[5,4],[4,4]);
        refreshCanvas();
    }
    
    function refreshCanvas()
    {                 
        ctx.clearRect(0,0,canvas.width,canvas.height);
        skaa.draw();
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
    function snake(body)
    {
        this.body = body;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = '##ff0000';
            for(var i = 0; i < this.body.lenght; i++)
            {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
    }

    function forward()
    {

    }
    
}