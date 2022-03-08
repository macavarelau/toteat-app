<template>
  <div class="navbar-bg">
    <div class="buttons">
      <div
        class="button-container"
        :class="[actual_component === 0 ? 'activeTextClass' : '']"
      >
        <button
          class="button-selector"
          v-on:click="signalComponent(0)"
          :class="[actual_component === 0 ? 'activeClass' : '']"
        >
          <font-awesome-icon icon="fa-solid fa-gauge-high" size="2x" />
        </button>
        <p>DASHBOARD</p>
      </div>
      <div
        class="button-container"
        :class="[actual_component === 1 ? 'activeTextClass' : '']"
      >
        <button
          class="button-selector"
          v-on:click="signalComponent(1)"
          :class="[actual_component === 1 ? 'activeClass' : '']"
        >
          <font-awesome-icon icon="fa-solid fa-burger" size="2x" />
        </button>
        <p>PRODUCTOS</p>
      </div>
      <div
        class="button-container"
        :class="[actual_component === 2 ? 'activeTextClass' : '']"
      >
        <button
          class="button-selector"
          v-on:click="signalComponent(2)"
          :class="[actual_component === 2 ? 'activeClass' : '']"
        >
          <font-awesome-icon icon="fa-solid fa-user-group" size="2x" />
        </button>
        <p>TRABAJADORES</p>
      </div>
      <div
        class="button-container"
        :class="[actual_component === 3 ? 'activeTextClass' : '']"
      >
        <button
          class="button-selector"
          v-on:click="signalComponent(3)"
          :class="[actual_component === 3 ? 'activeClass' : '']"
        >
          <font-awesome-icon icon="fa-solid fa-chair" size="2x" />
        </button>
        <p>ZONAS</p>
      </div>
      <div
        class="button-container"
        :class="[actual_component === 4 ? 'activeTextClass' : '']"
      >
        <button
          class="button-selector"
          v-on:click="signalComponent(4)"
          :class="[actual_component === 4 ? 'activeClass' : '']"
        >
          <font-awesome-icon icon="fa-solid fa-credit-card" size="2x" />
        </button>
        <p>VENTAS</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: {
    msg: String,
  },
  data: function () {
    return {
      actual_component: 0,
    };
  },
  methods: {
    signalComponent: function (value) {
      this.actual_component = value;
      this.$emit("change-component", value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
.navbar-bg {
  margin-top: 1%;
  display: flex;
  justify-content: center;
  font-weight: 300;
}

.buttons {
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 60%;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container p {
  margin-top: 10%;
}

.button-selector {
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 8px 1px 10px rgb(196, 196, 196);
  border: none;
  transition: 0.2s;
}

.button-selector svg {
  color: #4b4952;
}

.activeTextClass p {
  font-weight: 450;
}

.activeClass {
  background-color: rgba(248, 143, 73, 0.719);
}

.activeClass svg {
  color: white;
  background-color: rgba(255, 255, 255, 0);
}

.button-selector:hover {
  background-color: rgba(248, 143, 73, 0.719);
  transition-delay: 0.1s;
  cursor: pointer;
}
</style>
