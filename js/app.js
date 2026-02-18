class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = 0;
    this._meals = Storage.getMeals();
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
    Storage.saveMeal(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workout.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
      console.log(this._meals);
      this._render();
    }
  }
  removeWorkout(id) {
    const index = this._workout.findIndex((workout) => workout.id === id);
    console.log();
    if (index !== -1) {
      const workout = this._workout[index];
      console.log(workout);
      this._totalCalories += workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._workout.splice(index, 1);
      console.log(this._workout);
      this._render();
    }
  }

  reset() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = 0;
    this._meals = [];
    this._workout = [];
    this._render();
  }
  setLimit(calories) {
    this._calorieLimit = calories;
    Storage.setCaloriLimit(calories);
    this._displayCaloriesLimit();
    this._render();
  }

  loadItem() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
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
    console.log(workout.id);
    const workoutsEL = document.getElementById("workout-items");
    const workoutEL = document.createElement("div");
    workoutEL.classList.add("card", "my-2");
    workoutEL.setAttribute("data-id", workout.id);
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

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let caloriesLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      caloriesLimit = defaultLimit;
    } else {
      caloriesLimit = +localStorage.getItem("calorieLimit");
    }
    return caloriesLimit;
  }

  static setCaloriLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }

  static getTotalCalorie(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem("totalCalories") === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem("totalCalories");
    }
    return totalCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem("totalCalories", calories);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem("meals") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
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

    document
      .querySelector("#meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));

    document
      .querySelector("#workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));

    document
      .querySelector("#filter-meals")
      .addEventListener("keyup", this._filterItems.bind(this, "meal"));

    document
      .querySelector("#filter-workouts")
      .addEventListener("keyup", this._filterItems.bind(this, "workout"));

    document
      .querySelector("#reset")
      .addEventListener("click", this._reset.bind(this));

    document
      .querySelector("#limit-form")
      .addEventListener("submit", this._setLimit.bind(this));

    this._tracker.loadItem();
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
  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      if (confirm("Are you sure ? ")) {
        const id = e.target.closest(".card").getAttribute("data-id");
        console.log(id);

        type === "meal"
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);

        e.target.closest(".card").remove();
      }
    }
  }
  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.textContent;

      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  _reset() {
    this._tracker.reset();
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
    document.getElementById("filter-meals").value = "";
    document.getElementById("filter-workouts").value = "";
  }
  _setLimit(e) {
    e.preventDefault();
    const limit = document.querySelector("#limit");
    if (limit.value === " ") {
      alert("Please add a limit");
      return;
    }

    this._tracker.setLimit(+limit.value);
    limit.value = "";

    const modalEl = document.getElementById("limit-modal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();
