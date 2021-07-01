class HangVN {
    static createNewHoaDon () {
        var obj = this.getHoaDon();
        if (obj) {return;}
        this.setHoaDon([])
    }
    static getHoaDon() {
        return JSON.parse(localStorage.getItem(Constant.HOADON));
    }
    static setHoaDon(hoadon) {
        localStorage.setItem(Constant.HOADON, JSON.stringify(hoadon));
    }

    static getNewId() {
        var obj = this.getHoaDon();
        var newID = 0;
        if(obj.length != 0) {
            var arr = [];
            obj.forEach(x=>{arr.push(x.id)});
            var x = arr.sort();
            newID = Number(x[x.length-1]) + 1;
            // console.log(newID);
        }
        return newID;
    }

    static EditMatHang(idhd,idmh,obj) {
        var hd = this.getHoaDon();
        if(hd!=null && hd.lenght !=0){
            hd.forEach((v,i) =>{
                if(v.id==idhd){
                    v.list.forEach((z,j)=>{
                        if(z.id==idmh){
                            hd[i].list[j] = obj;
                        }
                    })
                }
            })
        }
        this.setHoaDon(hd);
    }

    static DelHoadon(idhd) {
        var hd = this.getHoaDon();
        if(hd!=null && hd.lenght !=0){
            hd.forEach((v,i) =>{
                if(v.id==idhd){
                    hd.splice(i, 1);
                }
            })
        }
        this.setHoaDon(hd);
    }
    static DelMatHang = (idhd,idmh)=> {
        var hd = this.getHoaDon();
        var rt = 1;
        if(hd!=null && hd.lenght !=0){
            hd.forEach((v,i) =>{
                if(v.id==idhd){
                    v.list.forEach((z,j)=>{
                        if(z.id==idmh){
                            hd[i].list.splice(j, 1);
                        }
                    })
                }
                if(v.list.length == 0) {
                    hd.splice(i, 1);
                    rt = 0;
                }
            })
        }
        this.setHoaDon(hd);
        return rt;
    }

    // ------------------------------
    // Tạo select
    // ------------------------------
    static createSelect_Tenhoadon(parentid,newid) {
        $(`#${parentid}`).html('');
        var sel = $(`<select id="${newid}" style="width:300px" onchange="HangVN.Changehd('${newid}')">`).appendTo(`#${parentid}`);
        var list = this.getHoaDon();
        var rt = "";
        list.forEach((val,i)=> {
            if(i==0){
                rt = val.id;
            }
            sel.append($("<option>").attr('value', val.id).text(val.ten + " (" + val.person+" )"));
        });
        return rt;
    }
    static createSelect_mathang(parentid,newid, id) {
        $(`#${parentid}`).html('');
        var sel = $(`<select id="${newid}" style="width:300px" onchange="HangVN.Changemh('${newid}',${id})">`).appendTo(`#${parentid}`);
        var list = this.getHoaDon();
        var rt = "";
        list.forEach((val)=> {
            if(val.id==id) {
                val.list.forEach((val2,i)=>{
                    if(i==0){
                        rt = val2.id;
                    }
                    console.log(val2.id);
                    sel.append($("<option>").attr('value', val2.id).text(val2.tenhang));
                })
            }
        });
        return rt;
    }

    static createSelect_soluong(parentid,newid, id, id2) {
        $(`#${parentid}`).html('');
        var sel = $(`<select id="${newid}" style="width:300px" onchange="HangVN.Changemsl()">`).appendTo(`#${parentid}`);
        var list = this.getHoaDon();
        list.forEach((val)=> {
            if(val.id==id) {
                val.list.forEach((val2)=>{
                    if(val2.id==id2) {
                        for(var i = 1;i<= Number(val2.soluong); i++){
                            sel.append($("<option>").attr('value', i).text(i));
                        }
                        $(`#${parentid}`).append(`<input value="${val2.gia}" id="hdcsgia" type="hidden" />`)
                    }
                })
            }
        });
        this.Changemsl();
    }
    static Changehd = (idhd) =>{
        var id = $(`#${idhd} option:selected`).val();
        var sl = this.createSelect_mathang("selecthdcs_mh","idhdccs_mh",id);
        this.createSelect_soluong("selecthdcs_sl","idhdccs_sl",id, sl);
    }
    static Changemh = (idmh,idhd) =>{
        var id = $(`#${idmh} option:selected`).val();
        this.createSelect_soluong("selecthdcs_sl","idhdccs_sl",idhd, id);
    }
    static Changemsl = () =>{
        var tong = Number($("#hdcsgia").val()) * Number($(`#idhdccs_sl option:selected`).val());
        $("#giahdcs").text(tong)
    }
    static Themhdcs=()=>{
        var curtong = Number($("#tong").text());
        var id = $("#selecthd option:selected").val();
        var hoadon =  $(`#idhdccs_mh option:selected`).val();
        var gia = $("#giahdcs").text();
        var idhoadon = Index.newChitiet(id,hoadon,gia);
        var a = $('#banggia');
        var b = $(`<tr id="tr${id}_${idhoadon}"></tr>`);
        var c = $(`<td>${$("#selecthd option:selected").text()}</td>`);
        var d = $(`<td>${hoadon}</td>`);
        var e = $(`<td>${gia}</td>`);
        var f = $(`<td><input type="button" value="Xóa" onclick="Delete(${id},${idhoadon})" /></td>`);
        b.append(c, d, e, f);
        a.append(b);
        $("#tong").text(curtong + gia);
        $("#txtHoadon").val('');
        $("#txtGia").val('');
    }
}