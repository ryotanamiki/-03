const app = Vue.createApp({
            data() {
                return {
                    data: [],
                    sortBy: null,
                    sortDirection: 'asc',
                    newEntry: {
                        name: '',
                        company: '',
                        division: '',
                        title: ''
                    }
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
                },
                addNewEntry() {
                    if (!this.newEntry.name || !this.newEntry.company || !this.newEntry.division || !this.newEntry.title) {
                        alert('全ての項目を記入してください。');
                        return;
                    }

                    const newId = this.generateNewId();

                    const newEntry = {
                        id: newId,
                        name: this.newEntry.name,
                        company: this.newEntry.company,
                        division: this.newEntry.division,
                        title: this.newEntry.title
                    };

                    this.data.push(newEntry);

                    this.newEntry = {
                        name: '',
                        company: '',
                        division: '',
                        title: ''
                    };
                },
                generateNewId() {
                    const ids = this.data.map(entry => entry.id);
                    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
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

        