# browser-game-snake

## Space Snake

![background image: snake in the space](./asset/app%20capture.png)

## 1. Game Overview:

Space Snake is a twist on the classic Snake game — our curious snake has accidentally drifted into outer space and must collect floating supplies to survive!

I created this game because I wanted to bring a fresh, visually fun theme to a well-known classic while practicing JavaScript, HTML and CSS.

## 2. Getting started:

- Deployed game link: [Space Snake][example]

  [example]: https://weice-wang.github.io/browser-game-snake/

- Plannning materials:

> User stories are written in the format:
>
> - As a user, I want to see a landing page when I arrive at the website to know I’m in the right place.
> - As a user, I want to see clearly labeled buttons for ‘Start’, ‘Reset’, on the landing page, so I instantly know my options for gameplay.
> - As a user, I want to be able to click ‘up’, ’down’, ‘right’, and ‘left’ to control the snake to get the food.
> - As a user, I want to see the snake grow once it eats the food. The food disappears.
> - As a user, I want to be presented with a clear message ,‘game over,’ once the snake hits the wall.

> Pseudocode:
>
> 1. Define constants and variables.
>
> - Create a variable for the board using CSS - Grid.
>
> 2. Define the app’s state variables, but don’t assign values to them.
>
> - Create a variable for the game refresh timer (e.g., setInterval()).
> - Create a variable for the snake body using array. Once eaten, using snake.push().
> - Create a variable for the food position for it to randomly pop out.
> - Create a variable for the moving directions.
> - Create a variable for the snake moving and set it to false.
> - Create a variable for the score equal to 0. Once the food is reached, the score plus one.
>
> 3.  Initialize Game
>
> - Setting snake body to default position
> - Setting the food position for a random spot.
> - Snake moving = false
> - Moving direction set to the right.
>
> 4. Select and save (cache) elements in variables that need to be accessed in the JavaScript code more than once.
>
> - The board
> - The score
> - The Game Over message
> - The Start button
> - The Reset button
>
> 5. Create Event Listeners, when the user clicks:
>
> - Button 1: "Start" → snake moving = true. → moving direction = right
> - Button 2: "Reset" → initializing the game
> - Button 3: "How to Play" → instructions
> - Button 4: "Music On" / "Music Off"
> - Button 3: "ArrowUp"→ moving direction = up
> - Button 4: "ArrowDown"→ moving direction = down
> - Button 5: "ArrowRight"→ moving direction = right
> - Button 5: "ArrowLeft"→ moving direction = left
>
> 6. Invoke the primary render function that transfers all state variables to the DOM.
>
> - Define Game Loop Function Runs 300 milliseconds (using setInterval) to refresh the body position.
> - Using pop() and unshift() to change the snake array position.
> - The moving direction automatically moves to the right. If you click ‘up’, ‘down’, or ’right’, the direction changes.
> - Check for Game Over ()
> - Render() update the board when clicking the buttons
> - Update Display Function: Refresh stats on screen each loop or button click.
> - Intial() when clicking the reset button. Resets all stats to starting values and restarts the loop.

## 3. Attributions:

Background image: [vecteezy][example]

[example]: https://www.vecteezy.com

Sound effects audios: [pixabay][example]

[example]: https://pixabay.com

## 4. Technologies used:

- JavaScript- game logic, including score and best score system, movement control, win/lose condition.
- HTML - canvas structure, elements and audios.
- CSS - styling, layout, and space-themed design.
- Audio – imported sound effects for feedback and level-ups

## 5. Next Steps (Future Enhancements):

- Adding more fun floating effects to grenerate feel of the zero gravity.
- Introduce debris or asteroids after the score reaches 10。
- Create “zones” that accelerate or slow the snake。
- Add teleport holes，if the snake reached, transform it to another random spot.
- Include multiple levels or increasing difficulty
