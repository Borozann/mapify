"use strict";let map,mapEvent;const form=document.querySelector(".form"),containerWorkouts=document.querySelector(".workouts"),inputType=document.querySelector(".form__input--type"),inputDistance=document.querySelector(".form__input--distance"),inputDuration=document.querySelector(".form__input--duration"),inputCadence=document.querySelector(".form__input--cadence"),inputElevation=document.querySelector(".form__input--elevation");class Workout{date=new Date;id=(Date.now()+"").slice(-10);clicks=0;constructor(t,e,o){this.coords=t,this.distance=e,this.duration=o}_setDescription(){this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on 
      ${["January","February","March","April","May","June","July","August","September","October","November","December"][this.date.getMonth()]} 
      ${this.date.getDate()}`}click(){this.clicks++}}class Running extends Workout{type="running";constructor(t,e,o,s){super(t,e,o),this.cadence=s,this.calcPace(),this._setDescription()}calcPace(){return this.pace=this.duration/this.distance,this.pace}}class Cycling extends Workout{type="cycling";constructor(t,e,o,s){super(t,e,o),this.elevationGain=s,this.calcSpeed(),this._setDescription()}calcSpeed(){this.speed=this.distance/(this.duration/60)}}class App{#t;#e=13;#o;#s=[];constructor(){this._getPosition(),this._getLocalStorage(),form.addEventListener("submit",this._newWorkout.bind(this)),inputType.addEventListener("change",this._toggleElevationFlied),containerWorkouts.addEventListener("click",this._moveToPopup.bind(this))}_getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),()=>{alert("Could not get your position")})}_loadMap(t){let e={latitude:t.coords.latitude,longitude:t.coords.longitude};this.#t=L.map("map",{center:[e.latitude,e.longitude],zoom:this.#e}),L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.#t),this.#t.on("click",this._showForm.bind(this)),this.#s.forEach(t=>{this._renderWorkoutMarker(t)})}_showForm(t){this.#o=t,form.classList.remove("hidden"),inputDistance.focus()}_hideForm(){inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value="",form.style.display="none",form.classList.add("hidden"),setTimeout(()=>{form.style.display="grid"},1e3)}_toggleElevationFlied(){inputElevation.closest(".form").classList.toggle("form__row--hidden"),inputCadence.closest(".form").classList.toggle("form__row--hidden")}_newWorkout(t){let e,o=(...t)=>t.every(t=>Number.isFinite(t)),s=(...t)=>t.every(t=>t>0);t.preventDefault();let i=inputType.value,n=+inputDistance.value,a=+inputDuration.value,{lat:r,lng:u}=this.#o.latlng;if("running"===i){let t=+inputCadence.value;if(!o(n,a,t)||!s(n,a,t))return alert("Inputs have to be positive numbers!");e=new Running([r,u],n,a,t)}if("cycling"===i){let t=+inputElevation.value;if(!o(n,a,t)||!s(n,a))return alert("Inputs have to be positive numbers!");e=new Cycling([r,u],n,a,t)}this.#s.push(e),this._renderWorkoutMarker(e),this._renderWorkout(e),this._hideForm(),this._setLocalStorage()}_renderWorkoutMarker(t){L.marker(t.coords).addTo(this.#t).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,className:`${t.type}-popup`})).setPopupContent(`${"running"===t.type?"🏃‍♂️":"🚴‍♀️"} ${t.description}`).openPopup()}_renderWorkout(t){let e=`
    <li class="workout workout--${t.type}" data-id="${t.id}">
      <h2 class="workout__title">${t.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${"running"===t.type?"🏃‍♂️":"🚴‍♀️"}</span>
        <span class="workout__value">${t.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">\u{23F1}</span>
        <span class="workout__value">${t.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;"running"===t.type&&(e+=`
        <div class="workout__details">
            <span class="workout__icon">\u{26A1}\u{FE0F}</span>
            <span class="workout__value">${t.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">\u{1F9B6}\u{1F3FC}</span>
            <span class="workout__value">${t.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `),"cycling"===t.type&&(e+=`
        <div class="workout__details">
          <span class="workout__icon">\u{26A1}\u{FE0F}</span>
          <span class="workout__value">${t.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">\u{26F0}</span>
          <span class="workout__value">${t.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `),form.insertAdjacentHTML("afterend",e)}_moveToPopup(t){let e=t.target.closest(".workout");if(!e)return;let o=this.#s.find(t=>t.id===e.dataset.id);this.#t.setView(o.coords,this.#e,{animate:!0,pan:{duration:1}})}_setLocalStorage(){localStorage.setItem("workouts",JSON.stringify(this.#s))}_getLocalStorage(){let t=JSON.parse(localStorage.getItem("workouts"));t&&(this.#s=t,this.#s.forEach(t=>{this._renderWorkout(t)}))}reset(){localStorage.removeItem("workouts"),location.reload()}}const app=new App;
//# sourceMappingURL=mapty.a2fd6e8a.js.map
