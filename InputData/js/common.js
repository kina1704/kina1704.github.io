/*---------------------------------------------------------------*/
/* Khai báo các Constant */
/*---------------------------------------------------------------*/
var CUNG = ['bachduong','kimnguu','songtu','cugiai','sutu','xunu','thienbinh','bocap','nhanma','maket','baobinh','songngu'];
var CUNG_TITLE = ['Bạch Dương', 'Kim Ngưu', 'Song Tử', 'Cự Giải', 'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Bọ Cạp', 'Nhân Mã', 'Ma Kết', 'Bảo Bình', 'Song Ngư'];
var STR_SAVED = "Đã lưu Data vào firebase!";
var STR_ERR = "Dữ liệu sai hoặc firebase có vấn đề!";
var STR_CHECK = "Vui lòng điền đầy đủ trước khi save";
var STR_CHECK_OK = "Vui lòng điền đầy đủ trước khi Ok";
var STR_CHECK_MONDAY = "Vui lòng chọn thứ 2 đầu tuần";
var STR_CHECK_YEAR = "Vui lòng nhập số Năm";
var STR_DELETE = "Bạn có chắc chắn muốn xóa?";
var BG_RED = "#FFB6C1";
var BG_WHITE = "white";
var ARR_COLOR= ["Trắng","Vàng","Đỏ","Da Cam","Xanh Lục","Đen","Xanh Lam","Tím Nhạt",
                "Tím Thẫm","Nâu","Xám","Hồng","Xanh Lá Cây","Xanh Da Trời","Xanh Diệp Lục","Vàng Rực",
                "Vàng Óng","Vàng Nhạt","Vàng Mơ","Hồng Tươi","Đỏ Anh Đào","Đỏ Mận","Đỏ Nhạt","Bạc",
                "Vàng Kim","Bạch Kim","Xanh Lơ","Tía"];
var DATA_DAY = "day";
var DATA_WEEK = "week";
var DATA_MONTH = "month";
var DATA_YEAR = "year";
/*---------------------------------------------------------------*/
/* Khởi tạo firebase để lưu dữ liệu */
/*---------------------------------------------------------------*/
var firebaseConfig = {
    apiKey: "AIzaSyDTAdht0NKC4mX1CaOVLizftE-irN9tpsU",
    authDomain: "cunghoangdao-192cf.firebaseapp.com",
    projectId: "cunghoangdao-192cf",
    storageBucket: "cunghoangdao-192cf.appspot.com",
    messagingSenderId: "877756435404",
    appId: "1:877756435404:web:6f35f83aaf844d53216b69",
    measurementId: "G-V9HCNSEZPY"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

/*---------------------------------------------------------------*/
/* Xóa Text trong Table */
/*---------------------------------------------------------------*/
Clear = ()=>
{
    var r = confirm(STR_DELETE);
    if (r == true) {
        Delete();
    }       
}

Delete = () => {
    $('table td span').each(function(){
        $(this).text('');
        ChangeBackColor($(this), BG_WHITE);
    })
} 

ChangeBackColor = (elem ,color) => {
    elem.css("background-color", color);
} 
    
/*---------------------------------------------------------------*/
/* Kiển tra dữ liệu được điền hay chưa */
/*---------------------------------------------------------------*/
Check = () =>{
    // Kiểm tra tất cả đã điền data chưa
    var hasblank = false;
    $('table td span').each(function(){
        if($(this).text() == "")
        {
            // hasblank = true;
            ChangeBackColor($(this), BG_RED);
        } else {
            ChangeBackColor($(this), BG_WHITE);
        }
    });
    return hasblank;
}


GetRamDomNumber = ()=>{
    var arr = "";
    var len = Math.floor(Math.random() * 2) + 1;
    for(var i=0; i < len ;i++)
    {
        var r = Math.floor(Math.random() * 100);
        if(i>0)
        {
            while(arr[i-1] == r){
                r = Math.floor(Math.random() * 100);
            }
            arr += " " + r;
        } else{ arr += r;}
    }
   
    return arr;
}


GetRamDomColor = ()=>{
    var item = ARR_COLOR[Math.floor(Math.random()*ARR_COLOR.length)];
    return item;
}


GetData = async (d, collection)=>{
    var data = [];
    for(var i =0; i< CUNG.length; i++)
    {
        await db.collection(collection).doc(d).collection(CUNG[i]).get().then(querySnapshot=>{
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
        });
    }
    return data;
}
