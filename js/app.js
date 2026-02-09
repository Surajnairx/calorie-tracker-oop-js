class CalorieTracker {
  constructor() {
    this._calorieLimit = 2200;
    this._totalCalories = 0;
    this._meals = [];
    this._workout = [];

    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayProgress();
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workout.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  _displayCaloriesTotal() {
    const caloriesTotal = document.querySelector("#calories-total");
    caloriesTotal.textContent = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimit = document.querySelector("#calories-limit");
    caloriesLimit.textContent = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const _displayCaloriesConsumed =
      document.querySelector("#calories-consumed");
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0,
    );
    _displayCaloriesConsumed.textContent = consumed;
  }

  _displayCaloriesBurned() {
    const _caloriesBurned = document.querySelector("#calories-burned");
    const burnt = this._workout.reduce(
      (total, workout) => total + workout.calories,
      0,
    );
    console.log(burnt);
    _caloriesBurned.textContent = burnt;
  }

  _displayCaloriesRemaining() {
    const _caloriesRemaining = document.querySelector("#calories-remaining");
    const ancestorElement = _caloriesRemaining.parentElement.parentElement;
    const progressElement = document.querySelector("#calorie-progress");

    const remaining = this._calorieLimit - this._totalCalories;
    _caloriesRemaining.textContent = remaining;

    if (remaining <= 0) {
      ancestorElement.classList.remove("bg-light");
      ancestorElement.classList.add("bg-danger");
      progressElement.classList.remove("bg-sucess");
      progressElement.classList.add("bg-danger");
    } else {
      ancestorElement.classList.remove("bg-danger");
      ancestorElement.classList.add("bg-light");
      progressElement.classList.add("bg-sucess");
      progressElement.classList.remove("bg-danger");
    }
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayProgress();
  }

  _displayProgress() {
    const progressElement = document.querySelector("#calorie-progress");

    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressElement.style.width = `${width}%`;
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2); //0.23ae1b597
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2); //0.23ae1b597
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();
const breakfast = new Meal("breakfast", 2);
const lunch = new Meal("lunch", 1999);

tracker.addMeal(breakfast);
tracker.addMeal(lunch);

const run = new Workout("Morning Jog", 300);
tracker.addWorkout(run);
