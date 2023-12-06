const db = require("../config/db");
const { search } = require("../routes/printer");

async function addPrinter(data){
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

    const [result, _] = await db.execute("INSERT INTO document SET name = ?, brand = ?, model = ?, description = ?, loc_campus = ?, loc_building = ?, loc_room", dataToInsert);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deletePrinter(printer_id){

}

async function searchPrinter(printer_id){
  try {
    const [result, _] = await db.execute(
      "SELECT name, brand, model, description, loc_campus, loc_building, loc_room, status FROM printer PO INNER JOIN document D ON PO.document_id = D.document_id WHERE D.user_id = ? LIMIT 5;",
      [printer_id]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function showInfoPrinter(printer_id) {
  try {
    const [result, _] = await db.execute(
      "SELECT name, brand, model, description, loc_campus, loc_building, loc_room, status FROM printer PO INNER JOIN document D ON PO.document_id = D.document_id WHERE D.user_id = ? LIMIT 5;",
      [printer_id]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function editPrinter(printer_id){

} 

async function enablePrinter(printer_id){
  try {
    const [result, _] = await db.execute(
      "UPDATE customer SET status = running WHERE printer_id = ?",
      [printer_id]
    );
  } 
  catch (err) {
    console.error(err);
    throw err;
  }
}

async function disablePrinter(printer_id){
  try {
    const [result, _] = await db.execute(
      "UPDATE customer SET status = disabled WHERE printer_id = ?",
      [printer_id]
    );
  } 
  catch (err) {
    console.error(err);
    throw err;
  }
}
/*-- Printer table
CREATE TABLE `printer` (
  `printer_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `brand` varchar(256) NOT NULL,
  `model` varchar(256) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `loc_campus` enum('1','2') NOT NULL DEFAULT '1',
  `loc_building` varchar(64) NOT NULL,
  `loc_room` varchar(64) NOT NULL,
  `status` enum('running','disabled','deleted') NOT NULL DEFAULT 'running',
  PRIMARY KEY (`printer_id`),
  UNIQUE KEY `printer_id_UNIQUE` (`printer_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `printer` WRITE;
-- insert data for the printer table
INSERT INTO `printer` VALUES (1,'Máy in 1','HP','HP OfficeJet 8015e','Máy in HP OfficeJet 8015 có khả năng in, sao chép, quét và gửi fax một cách hiệu quả. Nó cũng hỗ trợ các tính năng đáng tin cậy như in hai mặt tự động và in từ xa thông qua kết nối Wi-Fi và Bluetooth. Với mẫu mã đẹp và kiểu dáng nhỏ gọn, nó làm cho việc giải quyết các nhu cầu văn phòng dễ dàng hơn.','1','B1','101','running'),(2,'Máy in 2','HP','HP LaserJet MFP 135a (4ZB82A)','Máy in HP Laser Trắng đen đa năng In scan copy LaserJet 135a (4ZB82A) thiết kế các mặt tinh xảo, vỏ phủ màu trắng - đen trang nhã, kiểu dáng gọn gàng, tô điểm cho không gian làm việc, sinh hoạt của bạn cao cấp, hiện đại hơn.','1','B1','105','running'),(3,'Máy in 3','Canon','Canon PIXMA GM2070 Wifi','Máy in phun đơn năng Canon PIXMA GM2070 sở hữu nét thiết kế hiện đại, vẻ ngoài sang trọng cùng các tính năng in ấn tân tiến, phù hợp để sử dụng trong văn phòng, trường học cũng như các hộ gia đình. Thiết kế hiện đại, đặt thăng bằng trên mọi mặt bàn, tủ. Hiệu suất in cao với tốc độ ổn định.','1','B2','111','running'),(4,'Máy in 4','Brother','Brother DCP-T720DW Wifi','Máy in phun màu đa năng In-Scan-Copy Brother DCP-T720DW được cài đặt các chức năng in 2 mặt, in wifi, copy và scan. Hơn nữa, là máy in phun màu, ngoài khả năng in đen trắng, máy còn có thể tạo nên những bản in màu tươi tắn. Phục vụ tốt cho nhu cầu in ấn trong gia đình, công ty quy mô nhỏ với tốc độ in ảnh 17 ảnh/phút (đen trắng), 16.5 ảnh/phút (màu), in trang 30 trang/phút (đen trắng), 26 trang/phút (màu). Công suất in đến 2.500 trang/tháng, in màu xuất trang đầu tiên trong 9.5 giây, in đen trắng chỉ trong 6 giây, giúp rút ngắn thời gian xử lý công việc.','1','A2','102','running'),(5,'Máy in 5','Canon','Canon PIXMA G1020','Máy In Phun Màu Đơn Năng Canon PIXMA G1020 đạt hiệu suất in cao, cho ra những bản in chất lượng, sắc nét cùng những tính năng hỗ trợ in ấn từ xa tiết kiệm thời gian, đáp ứng tối ưu cho nhu cầu in ấn của những hộ gia đình hay các doanh nghiệp vừa và nhỏ.','1','A5','105','running'),(6,'Máy in 6','HP','HP LaserJet M211dw Wifi (9YF83A)','Máy in HP sở hữu tông màu trắng đen đơn giản mà sang trọng, với chiều dài 356 mm, rộng 216 mm, cao 152.4 mm cho phép đặt ổn định, vững vàng trên mặt kệ tủ, bàn làm việc của bạn.','2','H1','107','running'),(7,'Máy in 7','Epson','Epson EcoTank L3250 Wifi (C11CJ67503)','Máy In Phun Màu Đa Năng Epson EcoTank L3250 Wifi (C11CJ67503) có vẻ ngoài gọn đẹp, in ấn linh hoạt với đa dạng chức năng cũng như linh hoạt trong việc kết nối với thiết bị tương thích, đảm bảo chất lượng bản in rõ nét với mực in chuyên dụng cho máy.','2','H2','107','running'),(8,'Máy in 8','HP','HP 107w Wifi (4ZB78A)','Máy in HP thiết kế các góc cạnh bo tròn mềm mại, mặt trước in logo thương hiệu nổi bật, kiểu dáng gọn gàng, đặt vững vàng ở nhiều vị trí trong phòng khách, văn phòng làm việc hoặc phòng ngủ của bạn.','2','H6','106','running'),(9,'Máy in 9','HP','HP LaserJet MFP 135a (4ZB82A)','Máy in HP Laser Trắng đen đa năng In scan copy LaserJet 135a (4ZB82A) thiết kế các mặt tinh xảo, vỏ phủ màu trắng - đen trang nhã, kiểu dáng gọn gàng, tô điểm cho không gian làm việc, sinh hoạt của bạn cao cấp, hiện đại hơn.','2','H3','104','disabled'),(10,'Máy in 10','HP','HP LaserJet M211d (9YF82A)','Máy in HP thiết kế đơn giản, gọn gàng, dễ bố trí ngay trên bàn làm việc với chiều dài 355 mm, rộng 279.5 mm, cao 205 mm và khối lượng chỉ 5.6 kg.','2','H3','101','deleted');
UNLOCK TABLES;*/

async function showAllPrinter() {
  try {
    const [result, _] = await db.execute(
      `SELECT printer_id, name
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
    showAllPrinter,
    addPrinter,
    deletePrinter,
    searchPrinter,
    editPrinter,
    showInfoPrinter,
    enablePrinter,
    disablePrinter
}
