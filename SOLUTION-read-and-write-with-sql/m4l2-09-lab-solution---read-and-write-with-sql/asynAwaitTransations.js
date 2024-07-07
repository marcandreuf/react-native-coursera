

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

// Wrapper function to execute SQL queries
const executeSql = (sql, params = []) => new Promise((resolve, reject) => {
  db.transaction(tx => {
    tx.executeSql(
      sql, 
      params,
      (_, { rows }) => resolve(rows._array),
      (_, error) => reject(error)
    );
  });
});

// Example usage
const getUserById = async (id) => {
  try {
    const users = await executeSql('SELECT * FROM users WHERE id = ?', [id]);
    return users[0]; // Return the first (and should be only) user
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Using the wrapped function
const fetchUser = async () => {
  try {
    const user = await getUserById(1);
    console.log('User:', user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
};

fetchUser();


