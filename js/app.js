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
    const remaining = this._calorieLimit - this._totalCalories;
    _caloriesRemaining.textContent = remaining;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
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
const breakfast = new Meal("breakfast", 200);
const lunch = new Meal("lunch", 300);

tracker.addMeal(breakfast);
tracker.addMeal(lunch);

const run = new Workout("Morning Jog", 300);
tracker.addWorkout(run);
