'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notes', [
      { title: 'Grocery Shopping', category: 'Personal', text: 'Buy milk, bread, and eggs', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Complete Project', category: 'Work', text: 'Finish the project by the end of the month', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Dentist Appointment', category: 'Personal', text: 'Visit the dentist for a routine checkup', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Team Meeting', category: 'Work', text: 'Attend the team meeting on Monday', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Read Book', category: 'Personal', text: 'Finish reading the current book', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Client Feedback', category: 'Work', text: 'Gather feedback from the client', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Exercise', category: 'Personal', text: 'Go for a run in the morning', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Update Documentation', category: 'Work', text: 'Update the project documentation', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Family Dinner', category: 'Personal', text: 'Have dinner with family on Saturday', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Deploy Release', category: 'Work', text: 'Deploy the new release to production', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Meditation', category: 'Personal', text: 'Meditate for 20 minutes daily', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Code Review', category: 'Work', text: 'Review the code changes', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Call Mom', category: 'Personal', text: 'Call mom on her birthday', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Bug Fixing', category: 'Work', text: 'Fix bugs reported by QA', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Yoga Session', category: 'Personal', text: 'Attend a yoga session', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Prepare Presentation', category: 'Work', text: 'Prepare the presentation for the meeting', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Weekly Review', category: 'Personal', text: 'Review the week\'s goals and achievements', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Client Meeting', category: 'Work', text: 'Meet with the client to discuss requirements', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Cooking', category: 'Personal', text: 'Try a new recipe', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'System Upgrade', category: 'Work', text: 'Upgrade the system to the latest version', userId: 3, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  }
};