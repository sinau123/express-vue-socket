<template>
  <div id="app">
    <ul>
      <li v-for="data in list" :key="data">{{data}}</li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'

const socket = io('http://localhost:3030')
export default {
  name: 'App',
  data() {
    return {
      list:[]
    }
  },
  mounted() {
    this.setupSocket()
    this.getData()
  },
  methods: {
    async getData() {
     const data = await axios.get('http://localhost:3030/post/list')
     this.list = data.data
    },
    setupSocket() {
    socket.on('connect', function () {
      console.log('connect')
    })
    socket.on('newData', (data) => {
      this.list.push(data)
    })
    socket.on('disconnect', function () {
      console.log('disconnect')
    })

    }
  }
}
</script>


