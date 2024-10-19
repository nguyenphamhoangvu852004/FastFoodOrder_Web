
import mySqlInstance from "./configs/database.config";
import app from ".";

const PORT = 3000;

const startServer = async () => {
  try {
    const mySql = await mySqlInstance();
    const [rows] = await mySql.query(`SHOW DATABASES`);
    console.log("Các cơ sở dữ liệu:", rows);

    app.listen(PORT, ():void => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Lỗi khi khởi động server hoặc kết nối MySQL:", error); // In lỗi nếu có
  }
};

startServer();

