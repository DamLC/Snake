window.onload = function()
{
    var canvas;
    x = 0;
    y = 0;

    var ctx;

    var delay = 1000;
    

    // init();

    function init()
    {
        /* crée le canvas du jeu */
        canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        
        /*cree le context */
        ctx = canvas.getContext('2d');

        refreshCanvas();
    }
    
    function refreshCanvas()
    {     
        x +=2;
        y +=2;  
        ctx.fillStyle = '##ff0000';
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(x,y,100,50);
        setTimeout(refreshCanvas,delay);
    }
    
}