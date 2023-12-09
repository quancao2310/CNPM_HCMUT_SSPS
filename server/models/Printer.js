const db = require("../config/db");

async function add_Printer(data){
  try {
    const dataToInsert = [
      data.name,
      data.brand,
      data.model,
      data.description,
      data.loc_campus,
      data.loc_building,
      data.loc_room,
      data.status
    ];
    console.log(dataToInsert)
    const [result, _] = await db.execute(
      "INSERT INTO printer SET name = ?, brand = ?, model = ?, description = ?, loc_campus = ?, loc_building = ?, loc_room = ?, status = ?", dataToInsert);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function delete_Printer(printer_id){
  try {
    const [result, _] = await db.execute(
      "UPDATE printer SET status = 'deleted' WHERE printer_id = ?",
      [printer_id]
    );
  } 
  catch (err) {
    console.error(err);
    throw err;
  }
}

  async function search_Printer(printer_id){
    try {
      const [result, _] = await db.execute(
        "SELECT * FROM printer WHERE printer_id = ? LIMIT 0, 10",
        [printer_id]
      );
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

async function showInfo_Printer(printer_id) {
  try {
    const [result, _] = await db.execute(
      "SELECT * FROM printer WHERE printer_id = ?",
      [printer_id]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function edit_Printer(data, printer_id){
  try {
    const dataToInsert = [
      data.name,
      data.brand,
      data.model,
      data.description,
      data.loc_campus,
      data.loc_building,
      data.loc_room,
      data.status
    ];

    const [result, _] = await db.execute(
      "UPDATE printer SET name = ?, brand = ?, model = ?, description = ?, loc_campus = ?, loc_building = ?, loc_room = ?, status = ? WHERE printer_id = ?", 
      [...dataToInsert, printer_id]
      );
    return {
      status: "Success"
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
} 

async function enable_Printer(printer_id){
  try {
    const [result, _] = await db.execute(
      "UPDATE printer SET status = 'running' WHERE printer_id = ?",
      [printer_id]
    );
  } 
  catch (err) {
    console.error(err);
    throw err;
  }
}

async function disable_Printer(printer_id){
  try {
    const [result, _] = await db.execute(
      "UPDATE printer SET status = 'disabled' WHERE printer_id = ?",
      [printer_id]
    );
  } 
  catch (err) {
    console.error(err);
    throw err;
  }
}

async function show_All_Info_Printer() {
  try {
    const [result, _] = await db.execute(
      `SELECT printer_id, name, status, loc_building, loc_room, loc_campus
        FROM printer
        ORDER BY printer_id`
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function show_All_Printer() {
  try {
    const [result, _] = await db.execute(
      `SELECT printer_id, name, status
        FROM printer
        ORDER BY printer_id`
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports={
    show_All_Info_Printer,
    show_All_Printer,
    add_Printer,
    delete_Printer,
    search_Printer,
    edit_Printer,
    showInfo_Printer,
    enable_Printer,
    disable_Printer
}
