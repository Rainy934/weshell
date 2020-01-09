var app = new Vue({
  el: '#app',
  data: {
    socket: null,
    host: '',
    command: ''
  },
  created () {
    this.socket = io('http://localhost:931')
  },
  mounted () {
    this.socket.emit('host_info', 'hello world')
    this.socket.on('host_info', (host) => {
      this.host = host
    })
    this.$refs.input.focus()
  },
  methods: {
    clickBlur () {
      this.$refs.input.focus()
    }
  }
})