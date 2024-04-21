    
);

async function syncDatabase() {
    try {
      await sequelize.sync();
      console.log('Models synchronized with database');
    } catch (error) {
      console.error('Error syncing models with database:', error);
    }
  }
  
  syncDatabase();

module.exports = Task;