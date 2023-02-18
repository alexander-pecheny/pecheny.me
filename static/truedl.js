const pos = document.querySelector("#pos");
const questions = document.querySelector("#questions");
const difficulty = document.querySelector("#difficulty");
const result = document.querySelector("#result");
const old_rating = document.querySelector("#old_rating");
const old_questions = document.querySelector("#old_questions");
const old_difficulty = document.querySelector("#old_difficulty");
const old_result = document.querySelector("#old_result");

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
        (1 - (_difficulty / 10)) * _questions * coeff
    );
    expected_questions = Math.min(expected_questions, _questions);
    result.innerHTML = expected_questions;
}

function old_calculate() {
    _old_rating = old_rating.value;
    _old_questions = old_questions.value;
    _old_difficulty = old_difficulty.value;
    expected_questions = _old_questions - (
        Math.round(_old_difficulty * 500 * _old_questions / _old_rating)
    );
    old_result.innerHTML = expected_questions;
}

pos.addEventListener("input", calculate);
questions.addEventListener("input", calculate);
difficulty.addEventListener("input", calculate);
old_rating.addEventListener("input", old_calculate);
old_questions.addEventListener("input", old_calculate);
old_difficulty.addEventListener("input", old_calculate);
document.addEventListener("DOMContentLoaded", calculate);
document.addEventListener("DOMContentLoaded", old_calculate);