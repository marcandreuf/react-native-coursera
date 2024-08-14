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

  //await db.runAsync(query);
  //const listTables = await db.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table';")
  //console.log("DB tables: ", listTables);
}

export const getAllMenuItems = async() => {
  const query = "SELECT id, name, price, description, image, category FROM menuitems";
  return await db.getAllAsync(query);
}

export const saveAllMenuItems = async(menuItems) => {
  const query = menuItems
    .map(item => `INSERT INTO menuitems (id, name, price, description, image, category) values ` +
      `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}");`
    ).join(" ");  

  await db.execAsync(query);
  console.log('Menu items saved!');  
}

export const filterByQueryAndCategories = async (queryTerm, activeCategories) => {
  const lowerCaseCategories = activeCategories.map(c=>c.toLowerCase());
  const inCategories = `'${lowerCaseCategories.join("','")}'`;   
  const query = `SELECT id, name, price, description, image, category ` +
    `FROM menuitems WHERE name like ? AND category in (${inCategories})`;
  const rows = await db.getAllAsync(query, [`%${queryTerm}%`]);
  //console.log('Filter rows: ', rows.length)
  return rows;
}
