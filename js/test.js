// Lấy tham chiếu đến phần thân của trang web
var body = document.querySelector('body');

// Xoá toàn bộ nội dung của phần thân
body.innerHTML = '';

// Thêm vào đoạn văn bản mới
var newContent = document.createElement('p');
var text = document.createTextNode('Chào bạn, mình đã thay đổi body của web');
newContent.appendChild(text);
body.appendChild(newContent);
