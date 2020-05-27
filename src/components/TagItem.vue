<template>
  <div class="text-center mb-8">
    <h2>
      <g-link :to="tag.path" class="text-black font-bold">
        {{ tag.title }}
        <sup class="badge">{{ tag.belongsTo.totalCount }}</sup>
      </g-link>
    </h2>
  </div>
</template>

<script>
export default {
  props: ['tag'],
  computed: {},
  methods: {
    titleCase(str) {
      return str.replace('-', ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
    }
  }
}
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: .25em .4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  color: #fff;
  background-color: #6c757d;
  vertical-align: super;
  font-size: medium;
}
h2 a.text-black {
  color: var(--link-color);
  position: relative;
  text-decoration: none;
}
h2 a.text-black:hover {
  color: #d07922;
}
h2 a.text-black:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 0.3rem;
  left: 50%;
  position: absolute;
  background: #d07922;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
h2 a.text-black:hover:after {
  width: 100%;
  left: 0;
}
</style>