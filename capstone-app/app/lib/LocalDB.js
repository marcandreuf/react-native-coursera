import * as SQLite from 'expo-sqlite';

/**
 * DB operations layer using the latest Expo SQL docs with async.
 * https://docs.expo.dev/versions/latest/sdk/sqlite/#basic-crud-operations 
 */


let db = null;

export const openDatabase = async() => {
  if (db === null) {
    db = await SQLite.openDatabaseAsync('littleLemonApp');
    console.log('Database opened successfully!');
  }
}

export const createMenuItemsTable = async() => {
  const query = "CREATE TABLE IF NOT EXISTS menuitems " +
    "(id integer primary key not null, name text, price text, " +
    "description text, image text, category text)";

  await db.runAsync(query);
  const listTables = await db.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table';")
  console.log("DB tables: ", listTables);
}

export const getAllMenuItems = async() => {
  const query = "SELECT id, name, price, description, image, category FROM menuitems";
  const allRows = await db.getAllAsync(query);
  console.log('Selected all rows: ');
  for (const row of allRows) {
    console.log('Row id: ', row.id, 'name: ', row.name);
  }
  return allRows;
}

export const saveAllMenuItems = async(menuItems) => {
  const query = menuItems
    .map(item => `INSERT INTO menuitems (id, name, price, description, image, category) values ` +
      `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}");`
    ).join(" ");
  console.log('Save query: ', query);

  await db.execAsync(query);
  console.log('Menu items saved!');  
}

export const filterByQueryAndCategories = async (queryTerm, activeCategories) => {
  const query = `SELECT id, name, price, description, image, category ` +
    `FROM menuitems WHERE name like ? and ` +
    `category in ('${activeCategories.join("','")}')`;
  console.log('Filter query: ', queryTerm);

  const rows = await db.getAllAsync(queryTerm, [`%${queryTerm}%`]);
  for (const row of rows) {
    console.log('Row id: ', row.id, 'name: ', row.name);
  }
  return rows;
}
