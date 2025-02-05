const products = [
  { id: 1, name: 'Laptop Pro', price: 1200, category: 'Electronics', stock: 5 },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 25,
    category: 'Electronics',
    stock: 15,
  },
  { id: 3, name: 'Coffee Maker', price: 89, category: 'Kitchen', stock: 8 },
  { id: 4, name: 'Gaming Mouse', price: 45, category: 'Electronics', stock: 0 },
  { id: 5, name: 'Tea Kettle', price: 35, category: 'Kitchen', stock: 12 },
  {
    id: 6,
    name: 'Smart Watch Pro',
    price: 299,
    category: 'Electronics',
    stock: 3,
  },
];

class ArrayFilter {
  /**
   * Filtre un tableau selon des critères spécifiques
   * @param {Array} array
   * @param {Object} criteria
   * @returns {Array}
   */
  static filter(array, criteria) {
    return array.filter((item) => {
      return Object.entries(criteria).every(([key, value]) => {
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return this.handleSpecialCondition(item[key], value);
        }
        return item[key] === value;
      });
    });
  }

  /**
   * Gère les conditions spéciales de filtrage
   * @param {any} itemValue
   * @param {{ [key: string]: any }} condition
   * @returns {boolean}
   */
  static handleSpecialCondition(
    itemValue: any,
    condition: { [key: string]: any },
  ) {
    const [operator, value] = Object.entries(condition)[0];

    switch (operator) {
      case 'gt':
        return itemValue > value;
      case 'gte':
        return itemValue >= value;
      case 'lt':
        return itemValue < value;
      case 'lte':
        return itemValue <= value;
      case 'contains':
        return itemValue.toLowerCase().includes(value.toLowerCase());
      case 'in':
        return value.includes(itemValue);
      case 'between':
        return itemValue >= value[0] && itemValue <= value[1];
      default:
        return false;
    }
  }

  /**
   * Trie un tableau filtré
   * @param {Array} array
   * @param {Object} sortCriteria
   * @returns {Array}
   */
  static sort(array, sortCriteria) {
    return [...array].sort((a, b) => {
      const [key, order] = Object.entries(sortCriteria)[0];
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

console.log('=== Exemples de filtrage ===');

console.log('Produits Electronics :');
console.log(ArrayFilter.filter(products, { category: 'Electronics' }));

console.log('\nProduits > 100€ :');
console.log(ArrayFilter.filter(products, { price: { gt: 100 } }));

console.log("\nProduits contenant 'Mouse' :");
console.log(ArrayFilter.filter(products, { name: { contains: 'Mouse' } }));

console.log('\nProduits Electronics avec stock > 0 :');
console.log(
  ArrayFilter.filter(products, {
    category: 'Electronics',
    stock: { gt: 0 },
  }),
);

console.log('\nProduits triés par prix décroissant :');
const filteredAndSorted = ArrayFilter.sort(
  ArrayFilter.filter(products, { stock: { gt: 0 } }),
  { price: 'desc' },
);
console.log(filteredAndSorted);

console.log('\nProduits entre 30€ et 100€ :');
console.log(
  ArrayFilter.filter(products, {
    price: { between: [30, 100] },
  }),
);
