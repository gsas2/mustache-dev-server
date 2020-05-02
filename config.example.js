const dotNotationData = {
  name: {
    first: 'Michael',
    last: 'Jackson'
  },
  age: 'RIP',
};

const stooges = [
  { name: 'Moe' },
  { name: 'Larry' },
  { name: 'Curly' }
];

const musketeers = ['Athos', 'Aramis', 'Porthos', 'D\'Artagnan'];

const beatles = [
  { firstName: 'John', lastName: 'Lennon' },
  { firstName: 'Paul', lastName: 'McCartney' },
  { firstName: 'George', lastName: 'Harrison' },
  { firstName: 'Ringo', lastName: 'Starr' }
];

const config = {
  main: {
    baseDir: './examples',
    partials: [
      'dotNotation',
      'nonEmptyLists',
      {
        baseDir: './examples/html',
        template: 'musketeers',
        extension: '.html'
      },
      'beatles'
    ],
    data: {
      pageTitle: 'Mustache Dev Server: Template Examples',
      ...dotNotationData,
      stooges,
      musketeers,
      beatles,
      fullName: function () {
        return `${this.firstName} ${this.lastName}`
      }
    }
  },
  dotNotation: {
    baseDir: './examples',
    data: dotNotationData
  },
  nonEmptyLists: {
    baseDir: './examples',
    partials: [
      'beatles'
      // Skipping musketeers
    ],
    data: {
      stooges,
      // Skipping musketeers and beatles
    }
  }
};

module.exports = config;
