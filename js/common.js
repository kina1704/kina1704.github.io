class Common {
    static Hienthi(id,type = "") {
        var  block = type==""? "block" : type;
        $(`#${id}`).css("display", block);
    }
    static An(id) {
        $(`#${id}`).css("display", 'none');
    }

    // lay size local hien tai
    static getLocalSize () {
        var _lsTotal=0,_xLen,_x;
        for(_x in localStorage)
        {
            if(!localStorage.hasOwnProperty(_x)){continue;}
            _xLen= ((localStorage[_x].length + _x.length)* 2);
            _lsTotal+=_xLen;
            // console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")
        };
        console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
        return (_lsTotal / 1024).toFixed(2);
    }

    
    // ------------------------------
    // Tạo select
    // ------------------------------
    static createSelect(parentid,newid) {
        var sel = $(`<select id="${newid}"  class="width-200">`).appendTo(`#${parentid}`);
        var list = User.getUserDB();
        list.forEach((val)=> {
            sel.append($("<option>").attr('value', val.ID).text(val.name));
        });
    }
}
class User {
    static createNewUserDB() {
        var storage = this.getUserDB();
        if(storage) {
            return;
        }
        var UserDB = [
            //cmt
            { ID: 0, name: "Linh", avatar: 'Linh.jpg', isBoss: 1 }
            , { ID: 1, name: "Cảnh", avatar: 'canh.jpg', isBoss: 1 }
            , { ID: 2, name: "Tân", avatar: 'tantan.jpg', isBoss: 1 }
            , { ID: 3, name: "Thăng",avatar: 'Thang.jpg', isBoss: 1 }
            , { ID: 4, name: "Lùn", avatar: 'lun.png', isBoss: 1 }
            , { ID: 5, name: "Hùng", avatar: 'hung.png', isBoss: 1 }
            , { ID: 6, name: "Nam", avatar: 'nam.png', isBoss: 1 }
            , { ID: 7, name: "Thanh", avatar: 'thanh.png', isBoss: 1 }
            , { ID: 8, name: "Thì", avatar: 'thi.png', isBoss: 1 }
            , { ID: 9, name: "Thư", avatar: 'thu.png', isBoss: 1 }
            , { ID: 10, name: "Uyên", avatar: 'uyen.png', isBoss: 1 }
            , { ID: 11, name: "Diễm", avatar: 'diem.png', isBoss: 1 }
            , { ID: 12, name: "Trân", avatar: 'tran.png', isBoss: 1 }
            , { ID: 13, name: "MinTeHe", avatar: 'mintehe.png', isBoss: 1 }
            , { ID: 14, name: "TrieuDa", avatar: 'trieuda.png', isBoss: 1 }];
            this.setUserDB(UserDB);
    }

    static setUserDB(userDB) {
        localStorage.setItem(Constant.USERDB, JSON.stringify(userDB));
    }

    static getUserDB() {
        return JSON.parse(localStorage.getItem(Constant.USERDB));
    }

    static createNewUser(name,avatar,isBoss) {
        var newID = this.getNewId();
        var obj = {};
        obj.ID= Number(newID);
        obj.name = name;
        obj.avatar = avatar;
        obj.isBoss = Number(isBoss);
        this.addUser(obj);
        // return obj;
    }
    static addUser(user) {
        var storage = this.getUserDB();
        storage = [...storage,user];
        this.setUserDB(storage);
    }

    static deleteUser(ID) {
        //can xoa lich su truoc
        var storage = this.getUserDB();
        storage = storage.filter(e=> e.ID!=ID);
        this.setUserDB(storage);
    }

    static getNewId() {
        var obj = this.getUserDB();
        var newID = 0;
        if(obj.length != 0) {
            var arr = [];
            obj.forEach(x=>{arr.push(x.ID)});
            var x = arr.sort();
            newID = Number(x[x.length-1]) + 1;
            // console.log(newID);
        }
        return newID;
    }
}

class History {
    // { ngay: "",person:[{ id:0, name: '',avatar:'', chitiet: [{hoadon:"",gia:0}], tong: 0, tattoan:0 }], tong: 0, dacbiet:[]}
    static createNewHistory() {
        var storage = History.getHistoryDB();
        if(storage) {
            return;
        }
        this.setHistoryDB([]);
    }

    static setHistoryDB(HistoryDB) {
        localStorage.setItem(Constant.HISTORYDB, JSON.stringify(HistoryDB));
    }

    static getHistoryDB() {
        return JSON.parse(localStorage.getItem(Constant.HISTORYDB));
    }

    static createNewNgay(ngay) {
        var obj = {};
        obj.ngay = ngay;
        obj.person = [];
        obj.tong= 0,
        obj.dacbiet = [];
       return obj;
    }

    static addNgay(ngayDB) {
        var storage = this.getHistoryDB();
        storage = [...storage,ngayDB];
        this.setHistoryDB(storage);
    }

    static deleteNgay(ngay) {
        var storage = this.getHistoryDB();
        storage = storage.filter(e=> e.ngay!=ngay);
        this.setHistoryDB(storage);
    }
}