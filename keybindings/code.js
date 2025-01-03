// ==UserScript==
// @name         Lostgamer GrindMode
// @namespace    https://lostgamer.io/*
// @version      1.1
// @description  grinding...
// @author       Emperor
// @match        https://lostgamer.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(event) {
		// 32 is a representation of "Space" key
		// This handles the "Make Guess" action while in the round
        if (event.keyCode === 32) {
            var makeGuessButton = document.querySelector('[class*="styles_make-guess-button"]');
            if (makeGuessButton) {
                makeGuessButton.click();
            }
        }
		// 49 is a representation of "1" key
		// This handles "Next round" and "New game" actions while in the menu
        if (event.keyCode === 49) {
            var startGameButton = document.querySelector('[class*="styles_start-game-button"]');
            var nextRoundButton = document.querySelector('[class*="styles_continue-button"]');

            if (startGameButton) {
                startGameButton.click();
            }
            if (nextRoundButton) {
                nextRoundButton.click();
            }
        }
    });
})();