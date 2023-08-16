const app = Vue.createApp({
            data() {
                return {
                    data: [],
                    sortBy: null,
                    sortDirection: 'asc'
                };
            },
            computed: {
                sortedData() {
                    let sorted = [...this.data];
                    if (this.sortBy) {
                        sorted.sort((a, b) => {
                            const aValue = a[this.sortBy];
                            const bValue = b[this.sortBy];
                            if (this.sortBy === 'id') {
                                return this.sortDirection === 'asc'
                                    ? aValue - bValue
                                    : bValue - aValue;
                            }
                            return this.sortDirection === 'asc'
                                ? aValue.localeCompare(bValue)
                                : bValue.localeCompare(aValue);
                        });
                    }
                    return sorted;
                }
            },
            methods: {
                sortTable(column) {
                    if (this.sortBy === column) {
                        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                    } else {
                        this.sortBy = column;
                        this.sortDirection = 'asc';
                    }
                }
            },
            created() {
                fetch('cards.json')
                    .then(response => response.json())
                    .then(jsonData => {
                        this.data = jsonData;
                    })
                    .catch(error => console.error('Error fetching JSON data:', error));
            }
        });

        app.mount('#app');