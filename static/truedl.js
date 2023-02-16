const pos = document.querySelector("#pos");
const questions = document.querySelector("#questions");
const difficulty = document.querySelector("#difficulty");
const result = document.querySelector("#result");

function choose_coeff(_pos) {
    if (1 <= _pos && _pos <= 10) {
        return 1.61;
    }
    if (11 <= _pos && _pos <= 25) {
        return 1.52;
    }
    if (26 <= _pos && _pos <= 50) {
        return 1.43;
    }
    if (51 <= _pos && _pos <= 100) {
        return 1.32;
    }
    if (101 <= _pos && _pos <= 250) {
        return 1.16;
    }
    if (251 <= _pos && _pos <= 500) {
        return 1.00;
    }
    if (501 <= _pos && _pos <= 1000) {
        return 0.81;
    }
    if (1001 <= _pos && _pos <= 2000) {
        return 0.6;
    }
    if (2001 <= _pos && _pos <= 3000) {
        return 0.43;
    }
    if (3001 <= _pos && _pos <= 5000) {
        return 0.31;
    }
}

function calculate() {
    _pos = pos.value;
    _questions = questions.value;
    _difficulty = difficulty.value;
    coeff = choose_coeff(_pos);
    expected_questions = Math.round(
        _questions * coeff * _difficulty / 10.0
    );
    result.innerHTML = expected_questions;
}

pos.addEventListener("input", calculate);
questions.addEventListener("input", calculate);
difficulty.addEventListener("input", calculate);
document.addEventListener("DOMContentLoaded", calculate);