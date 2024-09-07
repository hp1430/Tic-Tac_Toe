document.addEventListener("DOMContentLoaded", function(){
    const wrapper = document.getElementById("wrapper");
    let value = 'X';
    let active = true;

    function isWon() {
        const cells = document.getElementsByClassName('cell');
        const values = Array.from(cells).map(cell => cell.textContent);
    
        // Checking rows
        if (values[0] && values[0] === values[1] && values[0] === values[2]) return true;
        if (values[3] && values[3] === values[4] && values[3] === values[5]) return true;
        if (values[6] && values[6] === values[7] && values[6] === values[8]) return true;
    
        // Checking columns
        if (values[0] && values[0] === values[3] && values[0] === values[6]) return true;
        if (values[1] && values[1] === values[4] && values[1] === values[7]) return true;
        if (values[2] && values[2] === values[5] && values[2] === values[8]) return true;
    
        // Checking diagonals
        if (values[0] && values[0] === values[4] && values[0] === values[8]) return true;
        if (values[2] && values[2] === values[4] && values[2] === values[6]) return true;
    
        return false;
    }

    function filled() {
        const cells = document.getElementsByClassName('cell');
        const values = Array.from(cells).map(cell => cell.textContent);

        for (let cell of values) {
            if (!cell) { 
                return false;
            }
        }

        return true;
    }
    
    function runGame() {
        const turn = document.getElementById('turn');
        const cells = document.getElementsByClassName('cell');
        turn.textContent = `Turn: ${value}`;

        Array.from(cells).forEach(cell => {
            cell.addEventListener("click", function(event) {
                const element = event.target;

                if(!element.textContent && active)
                {
                    element.textContent = value;

                    if(isWon())
                    {
                        active = false;
                        alert(`Game won by ${value}`);

                        const restart = document.createElement('button');
                        restart.classList.add('restart-button');
                        restart.textContent = "Restart";

                        restart.addEventListener("click", function(){
                            location.reload();
                        })

                        document.body.appendChild(restart);
                    }

                    else if(filled() && active)
                    {
                        active=false;
                        alert("Game Tied !!!")
                        const restart = document.createElement('button');
                        restart.classList.add('restart-button');
                        restart.textContent = "Restart";

                        restart.addEventListener("click", function(){
                            location.reload();
                        });

                        document.body.appendChild(restart);
                    }

                    else{

                        value = value==='X' ? 'O' : 'X';
                        turn.textContent = `Turn: ${value}`;
                    }
                    
                }

            })
        })

    }

    function initiateGame() {
        const turn = document.createElement('div');
        turn.id = 'turn';

        document.body.insertBefore(turn, wrapper);


        const startButton = document.createElement('button');
        startButton.textContent = 'Start';
        startButton.classList.add('start-button');

        startButton.addEventListener('click', function startGame() {
            startButton.style.display = 'none';

            runGame();
        });

        document.body.appendChild(startButton);
    }

    initiateGame();
});
