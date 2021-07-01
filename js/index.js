class Index {
    static addListAvatar(obj,id) {
        obj.forEach((val) => {
            var ava = val.avatar.indexOf("data") == 0 ? val.avatar : `img/${val.avatar}`
            var b = $(`<div class="col-2" id="member${val.ID}" onclick="add(this,${val.ID});">`);
            var c = $('<div class="row">');
            var d = $(`<img src="${ava}" alt="Avatar" class="avatar">`);
            var e = $('<div class="row">');
            var f = $(`<span>${val.name}</span>`);
            c.append(d);
            e.append(f);
            b.append(c, e);
            $(`#${id}`).append(b);
        })
    }
    // ------------------------------
    // lưu giữ list ng dùng hiện tại
    // ------------------------------
    static createNewListUser() {
        // var obj = this.getListUser();
        // if(obj){return;}
        this.setListUser([]);
    }
    static setListUser (userDB) {
        sessionStorage.setItem(Constant.LISTUSER,JSON.stringify(userDB));
    }
    static getListUser () {
        return JSON.parse(sessionStorage.getItem(Constant.LISTUSER));
    }

    // thêm thông tin 1 đối tượng vào listUser
    static createUser(name,avatar,isBoss) {
        var newID = User.getNewId();
        var obj = {};
        obj.ID= Number(newID);
        obj.name = name;
        obj.avatar = avatar;
        obj.isBoss = Number(isBoss);
        this.addListUser(obj);
        return newID;
        // return obj;
    }

    // thêm đối tượng vào listUser
    static addListUser(user) {
        var storage = this.getListUser();
        storage = [...storage,user];
        this.setListUser(storage);
    }

    // Thêm đối tượng bằng ID vào ListUser
    static addListUserId(id) {
        var obj = User.getUserDB();
        var user = obj.filter(x=>x.ID==id)[0];
        this.addListUser(user);
    }

    // Xóa đối tượng bằng ID khỏi listUser
    static deleteListUser(ID) {
        //can xoa lich su truoc
        var storage = this.getListUser();
        storage = storage.filter(e=> e.ID!=ID);
        this.setListUser(storage);
    }

    // lấy số ng dùng hiện tại
    static getListLenght() {
        var storage = this.getListUser();
        return storage.length;
    }

    // ------------------------------
    // lưu giữ giá trị của ngày hiện tại
    // ------------------------------
    static createCurrentDate(ngay) {
        var obj = {};
        obj.ngay = ngay;
        obj.persons = [];
        obj.tong= 0,
        obj.dacbiet = [];
        obj.tongdb = 0;
        obj.endResult = [];
        var persons = this.createListPerson(this.getListUser());
        obj = this.addPersonToDate(obj,persons);
        this.setCurrentDate(obj);
    }

    static deleteCurrentDate() {
        var storage = this.getCurrentDate();
        if(!storage){return;}
        sessionStorage.removeItem(Constant.CURDATA);
    }
    static setCurrentDate (data) {
        sessionStorage.setItem(Constant.CURDATA,JSON.stringify(data));
    }
    static getCurrentDate () {
        return JSON.parse(sessionStorage.getItem(Constant.CURDATA));
    }

    static createListPerson(list) {
        var persons = [];
        list.forEach(v=> {
            var obj = {};
            obj.ID = v.ID;
            obj.name = v.name;
            obj.avatar = v.avatar;
            obj.chitiet = [];
            obj.tong = 0;
            obj.conlai = 0;
            obj.tattoan = PersonDateInfo.CHUATATTOAN;
            persons.push(obj)
        })
        return persons;
    }

    static addPersonToDate(ngayDB,persons){
        var temp = ngayDB;
        temp.persons = persons;
        return temp;
    }

    static newChitiet(id, hoadon, gia) {
        var obj = this.getCurrentDate();
        var newId = 0;
        obj.persons = obj.persons.map(v => {
            if(v.ID== id) {
                var objchitiet = {};
                objchitiet.hoadon = hoadon;
                objchitiet.gia = gia;
                objchitiet.id = v.chitiet.length;
                newId = objchitiet.id;
                v.chitiet.push(objchitiet);
                v.tong += Number(gia);
            }
            return v;
        });
        obj.tong += Number(gia);
        this.setCurrentDate(obj);
        return newId;
    }

    static deleteChitiet(id,idhoadon) {
        var obj = this.getCurrentDate();
        var gia = 0;
        // obj = obj.map((val) => {
        obj.persons = obj.persons.map(v1 => {
            var index = -1;
            if(v1.ID== id) {
                v1.chitiet.forEach((v2,i)=>
                {
                    if(v2.id == idhoadon) {
                        index = i;
                        gia = v2.gia
                    }
                });
                v1.tong -= Number(gia);
            }
            v1.chitiet.splice(index,1);
            return v1;
        });
        obj.tong -= Number(gia);
        // return val;
        // });
        this.setCurrentDate(obj);
        return obj.tong;
    }

    static getBinhQuan(){
        var obj = this.getCurrentDate();
        var tongUser = obj.persons.length;
        var per = Math.ceil(obj.tong/tongUser);
        return per;
    }

    static addDacBiet (id,money) {
        var obj = {};
        obj.ID = id;
        obj.money = money;
        var curDate = this.getCurrentDate();
        curDate.dacbiet.push(obj);
        curDate.tongdb += money;
        this.setCurrentDate(curDate);
    }

    static delDacBiet (id) {
        var curDate = this.getCurrentDate();
        var index = -1;
        var money = 0;
        curDate.dacbiet.forEach((v,i) =>{
            if(v.ID==id) {
                index = i;
                money = v.money;
            }
        });
        curDate.tongdb -= money;
        curDate.dacbiet.splice(index,1);
        this.setCurrentDate(curDate);
    }

    static setEndResult () {
        var curDate = this.getCurrentDate();
        if(curDate.tongdb == 0) {
            curDate.endResult = [...curDate.persons];
        } else {
            var soluong =  curDate.persons.length - curDate.dacbiet.length;
            var tb = Math.ceil((curDate.tong - curDate.tongdb) / soluong);
            curDate.endResult = curDate.persons.map((val) => {
                curDate.dacbiet.forEach((val2)=>{
                    if(val.ID != val2.ID) {
                        val.conlai = tb - val.tong;
                    } else {
                        val.conlai = val2.money - val.tong;
                    }
                })
                return val;
            })
        }
        this.setCurrentDate(curDate);
    }

    static Tattoan(id, checked) {
        var check = checked? PersonDateInfo.TATTOAN:PersonDateInfo.CHUATATTOAN;
        var curDate = this.getCurrentDate();
        curDate.endResult = curDate.endResult.map((v) =>{
            if(v.ID == id) {
                v.tattoan = check;
            }
            return v;
        })
        this.setCurrentDate(curDate);
    }

    static setKetQua() {
        var obj = this.getCurrentDate();
        var per = this.getBinhQuan();
        obj.persons = obj.persons.map(v=> {
            v.conlai = per - v.tong;
            return v;
        });
        this.setCurrentDate(obj);
        return per;
    }


    // ------------------------------
    // Tạo select
    // ------------------------------
    static createSelect(parentid,newid) {
        var sel = $(`<select id="${newid}">`).appendTo(`#${parentid}`);
        var list = this.getListUser();
        list.forEach((val)=> {
            sel.append($("<option>").attr('value', val.ID).text(val.name));
        });
    }
}
