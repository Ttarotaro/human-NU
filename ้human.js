document.addEventListener("DOMContentLoaded", () => {
  const dropdown1 = document.getElementById("dropdown1"); // ภาควิชา
  const dropdown2 = document.getElementById("dropdown2"); // รหัส อว
  const dateInput = document.getElementById("dateInput"); // ช่องวันที่

  // ตั้งค่าวันที่ปัจจุบัน
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }

  // Mapping ภาควิชา → รหัส อว
  const departmentCodes = {
    "05": "02", // ภาควิชาดนตรี
    "07": "03", // ภาษาไทย
    "06": "04", // ภาษาอังกฤษ
    "02": "05", // ภาษาตะวันตก
    "08": "06", // ศิลปะการแสดง
    "03": "07", // ภาษาตะวันออก
    "04": "08", // ภาษาศาสตร์ฯ
    "01": "01(....)" // สำนักงานเลขานุการ
  };

  // ฟังก์ชันเปลี่ยนรหัส อว อัตโนมัติ
  function updateDepartmentCode() {
    const selectedDept = dropdown1.value;
    if (departmentCodes[selectedDept]) {
      dropdown2.value = departmentCodes[selectedDept];
    } else {
      dropdown2.value = "";
    }
  }

  // เพิ่ม event listener
  dropdown1.addEventListener("change", updateDepartmentCode);

  // เรียกครั้งแรก
  updateDepartmentCode();
});