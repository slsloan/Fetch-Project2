'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Dogs', [
      {
        image: 'https://cdn.filestackcontent.com/bic4sGecTsWxTrrVhuc1',
        first_name: 'Grey',
        last_name: 'Fidika',
        breed: 'Husky',
        gender: 'Male',
        age: 'Adult',
        fixed: true,
        latitude: '39.73950422448848',
        longitude: '-104.98879193970293',
        interests: 'Shedding lots of fur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn.filestackcontent.com/q5KPlKDVSQS2T4wZdEmB',
        first_name: 'Pugsy',
        last_name: 'Doo',
        breed: 'Bulldog',
        gender: 'Male',
        age: 'Puppy',
        fixed: false,
        latitude: '39.75603245234358',
        longitude: '-104.99427795410156',
        interests: "Eating other dog's food",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn.filestackcontent.com/BeK4GheSZi6C8VjM8qkg',
        first_name: 'Archie',
        last_name: 'Doo',
        breed: 'German Shepard',
        gender: 'Male',
        age: 'Young Adult',
        fixed: true,
        latitude: '39.7568154',
        longitude: '-104.98985239999999',
        interests: 'Chewing up valuable things',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn.filestackcontent.com/2u7MEN6Ts2rxcjDU4Y8g',
        first_name: 'Max',
        last_name: 'Fur',
        breed: 'Border Collie',
        gender: 'Female',
        age: 'Adult',
        fixed: false,
        latitude: '39.750850597431445',
        longitude: '-105.00226355557344',
        interests: "Stealing other dog's toys",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn.filestackcontent.com/TN56COHKSK6SKflNdD9S',
        first_name: 'Jerome',
        last_name: 'Spears',
        breed: 'Boxer',
        gender: 'Male',
        age: 'Senior',
        fixed: true,
        latitude: '39.72114646420101',
        longitude: '-104.98447607841213',
        interests: 'Chasing garbage blowing in the wind',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://cdn.filestackcontent.com/3cumUAFbQmGBaqGuVOIg',
        first_name: 'Bruno',
        last_name: 'Spears',
        breed: 'Boston Terrier',
        gender: 'Male',
        age: 'Young Adult',
        fixed: true,
        latitude: '39.75022557642607',
        longitude: '-104.94895935058594',
        interests: 'Drooling on the floor',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Dogs', null, {});
  }
};
