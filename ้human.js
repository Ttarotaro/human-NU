document.addEventListener("DOMContentLoaded", function() {
  // ดึง elements
  const dropdown1 = document.getElementById("dropdown1"); // ภาควิชา
  const dropdown2 = document.getElementById("dropdown2"); // รหัส อว
  const dateInput = document.getElementById("dateInput"); // วันที่
  const nameInput = document.getElementById("name"); // ชื่อ-นามสกุล
  const text1Input = document.getElementById("text1"); // ข้าพเจ้า (ในใบรับเงิน)
  const dropdown6 = document.getElementById("dropdown6"); // ประเภททุน
  const text3Input = document.getElementById("text3"); // จำนวนเงินต่อหน่วย
  const text3Total = document.getElementById("text3_total"); // รวมเป็นเงิน

  // ตั้งค่าวันที่ปัจจุบัน
  if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
  }

  // Mapping ภาควิชา → รหัส อว
  const departmentCodes = {
    "05": "02", // ดนตรี
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
    if (dropdown1 && dropdown2) {
      const selectedDept = dropdown1.value;
      dropdown2.value = departmentCodes[selectedDept] || "";
    }
  }

  // เมื่อเลือกภาควิชา
  if (dropdown1) {
    dropdown1.addEventListener("change", updateDepartmentCode);
    updateDepartmentCode();
  }

  // คัดลอกชื่อ-นามสกุล ไปยัง text1 (ข้าพเจ้า)
  if (nameInput && text1Input) {
    nameInput.addEventListener("input", function() {
      text1Input.value = nameInput.value;
    });
  }

  // เมื่อเลือกประเภททุน ให้แสดงจำนวนเงิน
  if (dropdown6 && text3Input && text3Total) {
    dropdown6.addEventListener("change", function() {
      const selectedValue = dropdown6.value;
      let amount = "";

      // แปลง value เป็นจำนวนเงิน
      switch(selectedValue) {
        case "2000":
          amount = "2,000";
          break;
        case "3000":
          amount = "3,000";
          break;
        case "5000":
          amount = "5,000";
          break;
        case "7000":
          amount = "7,000";
          break;
        case "7000_other":
          amount = "7,000";
          break;
        case "10000":
          amount = "10,000";
          break;
        default:
          amount = "";
      }

      text3Input.value = amount;
      text3Total.value = amount; // รวมเป็นเงินเท่ากับหน่วยละ (เพราะมี 1 หน่วย)
    });
  }
});