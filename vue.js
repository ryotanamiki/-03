export default {
  data() {
    return {
      jsonData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('data.json'); // JSONファイルのパスを指定
        this.jsonData = await response.json();
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    },
  },
};
