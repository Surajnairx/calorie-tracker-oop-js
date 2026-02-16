class CalorieTracker {
  constructor() {
    this._calorieLimit = 2500;
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
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workout.push(workout);
    this._totalCalories -= workout.calories;
    this._displayNewWorkout(workout);
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

  _displayNewMeal(meal) {
    const mealsEL = document.getElementById("meal-items");
    const mealEL = document.createElement("div");
    mealEL.classList.add("card", "my-2");
    mealEL.setAttribute("data-id", meal.id);
    mealEL.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
            </div>`;
    mealsEL.appendChild(mealEL);
  }

  _displayNewWorkout(workout) {
    const workoutsEL = document.getElementById("workout-items");
    const workoutEL = document.createElement("div");
    workoutEL.classList.add("card", "my-2");
    workoutEL.setAttribute("data.id", workout.id);
    workoutEL.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              
            </div>`;
    workoutsEL.appendChild(workoutEL);
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
    let width;
    if (percentage <= 0) {
      width = Math.min(0, 100);
    } else {
      width = Math.min(percentage, 100);
    }
    console.log(percentage);

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

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .querySelector("#meal-form")
      .addEventListener("submit", this._newMeal.bind(this));

    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();
    const name = document.querySelector("#meal-name");
    const calories = document.querySelector("#meal-calories");
    console.log(name.value, calories.value);

    //validation
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all details");
    }

    //remember the value is still a string!
    const meal = new Meal(name.value, Number(calories.value));
    this._tracker.addMeal(meal);

    name.value = "";
    calories.value = "";

    const collapseMeal = document.getElementById("collapse-meal");

    const bsCollapse = new bootstrap.Collapse(collapseMeal, { toggle: true });
  }
  _newWorkout(e) {
    e.preventDefault();
    console.log(this);
    const name = document.querySelector("#workout-name");
    const calories = document.querySelector("#workout-calories");

    if (name.value === "" || calories.value === "") {
      alert("Please fill in all details");
    }

    const workout = new Workout(name.value, Number(calories.value));
    this._tracker.addWorkout(workout);

    name.value = "";
    calories.value = "";

    const collapseWorkout = document.getElementById("collapse-workout");

    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}

const app = new App();
