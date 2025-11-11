document.addEventListener("DOMContentLoaded", function() {
  // ดึง elements
  const dropdown1 = document.getElementById("dropdown1"); // ภาควิชา
  const dropdown2 = document.getElementById("dropdown2"); // รหัส อว
  const dateInput = document.getElementById("dateInput"); // วันที่
  const nameInput = document.getElementById("name"); // ชื่อ-นามสกุล
  const text1Input = document.getElementById("text1"); // ข้าพเจ้า (ในใบรับเงิน)
  const dropdown7 = document.getElementById("dropdown7"); // จำนวนเงินหน่วยละ
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

  // เมื่อเลือกจำนวนเงินจาก dropdown7 ให้แสดงในช่อง "รวมเป็นเงิน"
  if (dropdown7 && text3Total) {
    dropdown7.addEventListener("change", function() {
      const selectedValue = dropdown7.value;
      let amount = "";

      // แปลงเป็นรูปแบบที่มีคอมม่า
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
        case "10000":
          amount = "10,000";
          break;
        default:
          amount = "";
      }

      text3Total.value = amount;
    });
  }
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', function(e) {
            // ถ้าคลิกที่ checkbox เอง ให้ทำงานปกติ
            if (e.target.type === 'checkbox') return;
            
            // หา checkbox ในแถวนั้น
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        });
        
        // เปลี่ยน cursor ให้เป็น pointer
        row.style.cursor = 'pointer';
    });
});