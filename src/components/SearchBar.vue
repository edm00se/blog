<template>
  <autocomplete :search="search" @submit="handleSubmit"></autocomplete>
</template>

<script>
import '@trevoreyre/autocomplete-vue/dist/style.css';
import Autocomplete from '@trevoreyre/autocomplete-vue';

export default {
  components: {
    Autocomplete
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return [];
      }
      return [input];
    },
    handleSubmit(result) {
      alert(`You selected ${result}`);
    }
  }
}
</script>