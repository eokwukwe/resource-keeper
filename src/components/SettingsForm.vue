<template>
  <form>
    <div class="mb-3">
      <label for="fontSize">Font Size</label>
      <input
        name="fontSize"
        :value="fontSize"
        @input="handleChange"
        type="text"
        class="form-control"
        id="fontSize"
        placeholder="Enter font size"
      />
    </div>
    <div class="mb-3">
      <label for="theme">Theme</label>
      <select
        :value="theme"
        name="theme"
        @change="handleChange"
        class="form-control"
        id="theme"
      >
        <option
          value
          disabled
          selected
        >Select your theme</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  </form>
</template>


<script>
  export default {
    props: {
      theme: {
        type: String,
      },
      fontSize: {
        type: String,
      },
    },

    emits: ["update:theme", "update:fontSize"],

    methods: {
      handleChange({ target: { name, value } }) {
        this.$emit(`update:${name}`, value);
        this.isOpen = false;
      },
    },
  };
</script>
