import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon_app.db");

//TODO. Refactor this into prepared statements, after the first
// running solution.

//TODO. Refactor into async functions, after the first
// https://docs.expo.dev/versions/latest/sdk/sqlite/#basic-crud-operations

export async function createMenuItemsTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS menuitems " +
          "(id integer primary key not null, name text, price text, " +
          "description text, image text, category text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getAllMenuItems() {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql("SELECT id, name, price, description, image, category" +
        " FROM menuitems", [],
        (_, { rows }) => {
          resolve(rows._array);
        });
    });
  });
}

export function saveAllMenuItems(menuItems) {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO menuitems (id, name, price, description, image, category) values ${
        menuItems.map(item =>
            `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
        ).join(", ")}`);
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT id, name, price, description, image, category `+
        `FROM menuitems WHERE name like ? and `+
        `category in ('${activeCategories.join("','")}')`,
        [`%${query}%`],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    }, reject);
  });
}
