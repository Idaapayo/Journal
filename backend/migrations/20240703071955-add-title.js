
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Notes', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Notes', 'title');
  }
};