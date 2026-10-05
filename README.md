# Odin Calculator Project

A fully interactive, retro-inspired calculator application built as part of [The Odin Project](https://www.theodinproject.com/) Web Development curriculum.

🔗 **[Live Preview](https://robertscottphoto.github.io/odin-calculator/)**

---

## Features

* **Power State Management:** Includes an interactive power toggle that safely enables or disables inputs, updates display states, and clears active data.
* **Dual Display Layout:** Features a primary display for the active input or final total, paired with a secondary display showing the running sum.
* **Full Arithmetic Support:** Handles addition, subtraction, multiplication, division, and percentage calculations.
* **Edge Case Handling:** Safely prevents multiple decimal points, limits input length to prevent UI overflow, handles negative numbers via a dedicated sign toggle, and displays custom feedback on division by zero.
* **Keyboard Navigation:** Mapped key support for numbers, standard operators, decimals, and utility keys (Enter for equals, Escape/C for clear).

---

## What I Learned

Building this calculator provided hands-on experience in managing state without relying on external libraries:

* **State Management:** Designed a central `state` object to keep track of operational variables such as `isPowerOn`, `previousOperand`, `operator`, and `nextOperand`.
* **Event Delegation:** Implemented a single `click` event listener on the parent container (`.calculator`), extracting input actions cleanly via `dataset` attributes.
* **Keyboard Event Handling:** Mapped physical keyboard inputs to UI button elements using a dedicated `keyMap` object, simulating visual active states on keydown.
* **Input Validation & Safety:** Implemented guard clauses to catch edge cases, including restricting double decimals, managing dynamic string lengths, and suppressing inputs when power is turned off.

---

## Languages

* **HTML5:** Semantic markup for the calculator layout and accessibility.
* **CSS3:** Custom styling and visual toggles for power-on/off display states.
* **JavaScript (ES6+):** Pure vanilla JavaScript utilizing DOM manipulation, event delegation, and state-driven logic.

