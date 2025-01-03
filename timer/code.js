// ==UserScript==
// @name         LostGamer Timer
// @namespace    lostgamer-timer
// @version      1.1
// @description  Displays a small table with round times for LostGamer
// @author       Emperor
// @match        https://lostgamer.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let roundCount = 0;
  const totalRounds = 5;
  let roundTimes = [0, 0, 0, 0, 0];
  let roundStartTime = null;
  let inRound = false;

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.left = '10px';
  container.style.padding = '10px';
  container.style.backgroundColor = '#402683';
  container.style.color = '#fff';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.fontSize = '14px';
  container.style.fontWeight = 'bold';
  container.style.zIndex = '999999';
  container.style.borderRadius = '8px';
  container.style.boxShadow = '0 0 10px #000';

  // Create table
  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.margin = '0 auto';

  const row = document.createElement('tr');
  const cells = [];

  for (let i = 0; i < totalRounds + 1; i++) {
    const td = document.createElement('td');
    td.style.border = '1px solid #fff';
    td.style.padding = '5px 8px';
    td.style.minWidth = '50px';
    td.style.textAlign = 'center';
    td.innerText = i < totalRounds ? '0.0' : 'Sum';
    cells.push(td);
    row.appendChild(td);
  }
  table.appendChild(row);
  container.appendChild(table);
  document.body.appendChild(container);

  function updateVisibility() {
    if (location.pathname.includes('/game/')) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
      roundCount = 0;
      inRound = false;
      roundStartTime = null;
      roundTimes = [0, 0, 0, 0, 0];
      for (let i = 0; i < totalRounds; i++) {
        cells[i].innerText = '0.0';
      }
      cells[totalRounds].innerText = 'Sum';
    }
  }

  function startRound() {
    if (!inRound && roundCount < totalRounds) {
      roundCount++;
      roundStartTime = Date.now();
      inRound = true;
    }
  }

  function endRound() {
    if (inRound && roundCount <= totalRounds && roundStartTime) {
      const finalSec = ((Date.now() - roundStartTime) / 1000).toFixed(1);
      roundTimes[roundCount - 1] = parseFloat(finalSec);
      cells[roundCount - 1].innerText = finalSec + 's';

      const totalSec = roundTimes.reduce((acc, val) => acc + val, 0).toFixed(1);
      cells[totalRounds].innerText = totalSec + 's';

      roundStartTime = null;
      inRound = false;
    }
  }

  const observer = new MutationObserver(() => {
    if (!location.pathname.includes('/game/')) return;

    const goalIcon = document.querySelector('[src*="/images/goal_icon.png"]');
    const mapContainer = document.querySelector('[class*="styles_map-container"]');
    const mapHovered = document.querySelector('[class*="styles_hovered"]');
    const modalElement = document.querySelector('[class*="styles_modal"]');

    if (goalIcon) {
      if (inRound) endRound();
    } else {
      if (!inRound && roundCount < totalRounds && mapContainer && !mapHovered && !modalElement) {
        startRound();
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setInterval(() => {
    updateVisibility();

    if (inRound && roundStartTime) {
      const currentSec = ((Date.now() - roundStartTime) / 1000).toFixed(1);
      cells[roundCount - 1].innerText = currentSec + 's';

      const completedRoundsSum = roundTimes.reduce((acc, val) => acc + val, 0);
      const dynamicTotal = (completedRoundsSum + parseFloat(currentSec)).toFixed(1);
      cells[totalRounds].innerText = dynamicTotal + 's';
    }
  }, 100);
})();