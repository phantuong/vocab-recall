(function(){
  const TOPIC2 = [
    ['Hình chữ nhật','Hình tam giác','Hình vuông'],
    ['Mảnh ghép A','Mảnh ghép B'],
    ['Hình A','Hình B','Hình C','Hình D'],
    ['Khối lập phương','Khối hộp chữ nhật','Hình hộp vuông'],
    ['Hình A','Hình B'],
    ['Khối hộp chữ nhật','Khối lập phương','Cả 2 đáp án trên'],
    ['4 hình tam giác','6 hình tam giác','8 hình tam giác'],
    ['2 hình vuông','3 hình vuông','4 hình vuông'],
    ['2 hình tam giác','3 hình tam giác','4 hình tam giác'],
    ['2 hình vuông','3 hình vuông','4 hình vuông'],
    ['Con gấu','Con mèo','Con chó'],
    ['Bảng A','Bảng B','Bảng C','Bảng D'],
    ['Hình vuông, hình tam giác','Hình tròn, hình chữ nhật','Hình tròn, hình vuông'],
    ['bằng','nhiều hơn','ít hơn'],
    ['Nhóm A','Nhóm B','Nhóm C','Nhóm D'],
    ['Quyển sách','Búp bê','Quả bóng'],
    ['5 con vật','2 con vật','4 con vật'],
    ['Biểu đồ A','Biểu đồ B','Biểu đồ C','Biểu đồ D'],
    ['Con ếch','Sọ l...'],
    ['Sơ đồ A','Sơ đồ B','Sơ đồ C','Sơ đồ D'],
    ['9 số','8 số','7 số'],
    ['3','4','9','2'],
    ['32 phút','40 phút','48 phút'],
    ['Mảnh ghép A','Mảnh ghép B'],
    ['10 trang sách','24 trang sách','12 trang sách']
  ];
  window.choices = function(qi){
    if(window.theme && Number(window.theme.id)===2 && TOPIC2[qi]) return TOPIC2[qi];
    if(window.theme && Number(window.theme.id)===1 && window.T1 && window.T1[qi]) return window.T1[qi][0];
    return ['A','B','C','D'];
  };
})();
