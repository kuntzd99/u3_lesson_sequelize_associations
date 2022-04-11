const { User, Task, sequelize } = require('./models')

// Find all users with their associated tasks
// Raw SQL: SELECT * FROM "Users" JOIN tasks ON "Tasks"."userId" = "Users".id;

function stringify(data) {
  console.log(JSON.stringify(data, null, 2))
}

const findAllWithTasks = async () => {
  // Find all users with their associated tasks
  // Raw SQL: SELECT * FROM users JOIN tasks ON tasks."userId" = users.id;
  const response = await User.findAll({ include: Task })
  stringify(response)
}

const findAllJohnsWithTasks = async () => {
  // Find all users with their associated tasks
  // Raw SQL: SELECT * FROM users JOIN tasks ON tasks."userId" = users.id WHERE users."firstName" = 'John';
  const response = await User.findAll({
    where: { firstName: 'John' },
    include: Task
  })
  stringify(response)
}

const run = async () => {
  try {
    //await findAllWithTasks()
    await findAllJohnsWithTasks()
  } catch (error) {
    console.log(error)
  } finally {
    await sequelize.close()
  }
}

run()
