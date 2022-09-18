
const ds = [
    "Hoàng Nam",
    "Yến Thanh",
    "Thanh Tân (Lang Băm)",
    "Anh Thư (Thư Thỏ)",
    "Ái Liên (Chị Giáo)",
    "Đoàn Thăng (Hansama)",
    "Thì Đỗ(Mặt Thộn)",
    "Nguyên Triệu (Triệu Đà)",
    "Đăng Minh (Minh Fix)",
    "Hồng Uyên (Uyên Cherry)",
    "Phong Cảnh (Uyên Cherry)",
    "Mạnh Hùng (Hùng Cino)",
    "Thùy Diễm (Thím Đười)",
    "Minh Quân (阮明君)",
    "Hoài Thương (Pig Papy)",
    "Huỳnh Công Đức",
    "Hằng Phan",
    "Đăng Quang",
    "Yến Nhi",
    "Ngọc Diễm (Quận Chúa)",
    "Lệ Hằng (Chị Của Em)",
    "Thành Nguyễn",
    "Trân Tee ti",
    "Trần Lê Thanh (Bơ Sữa)",
    "Mai Ca",
    "Hoàng Sơn",
    "Thuận Mười",
    "Trần Thuận Bằng",
    "VM Tiến Gái"
];
const avatar = [
    "./avatar/NamHoang.jpg",
    "./avatar/yenthanh.jpg",
    "./avatar/tantan.jpg",
    "./avatar/thutho.jpg",
    "./avatar/ailien.jpg",
    "./avatar/doanthang.jpg",
    "./avatar/matthon.jpg",
    "./avatar/atrieu.jpg",
    "./avatar/aminh.jpg",
    "./avatar/uyencherry.jpg",
    "./avatar/phongcanh.jpg",
    "./avatar/hungcino.jpg",
    "./avatar/chiDiem.jpg",
    "./avatar/aQuan.jpg",
    "./avatar/hoaithuong.jpg",
    "./avatar/doku.jpg",
    "./avatar/hangphan.jpg",
    "./avatar/dangquang.jpg",
    "./avatar/yennhi.jpg",
    "./avatar/ngocdiem.jpg",
    "./avatar/chihang.jpg",
    "./avatar/thanhnguyen.jpg",
    "./avatar/teeti.jpg",
    "./avatar/anhthanh.jpg",
    "./avatar/maica.jpg",
    "./avatar/aSon.jpg",
    "./avatar/amuoi.jpg",
    "./avatar/anhbang.jpg",
    "./avatar/vmtien.jpg",
];


class NGONNGU {
    static setLangDB(language) {
        localStorage.setItem(Constant.LANGUAGE, language);
    }

    static getLangDB() {
        return localStorage.getItem(Constant.LANGUAGE);
    }

    static createNewLang() {
        var lang = this.getLangDB();
        if(lang) {
            return;
        }
        var language = window.navigator.userLanguage || window.navigator.language;
        if(language == "ja") {
            this.setLangDB(Language.JP);
        }
        else{
            this.setLangDB(Language.VN);
        }

    }

    static setLangId(lang) {
        if(!lang){return;}
        $("#wedding_id").text(lang.wedding);
        if($("#content_id")){
            $("#content_id").html(lang.content);
            $("#date_id").text(lang.date);
            $("#checkin_id").text(lang.checkin);
            $("#party_id").text(lang.party);
            $("#Addr_id").text(lang.Addr);
            $("#deadline_id").html(lang.deadline);
            $("#button_id").text(lang.button);
        }
        if($("#need_id"))
        {
            $("#need_id").text(lang.need);
            $("#choise_id").text(lang.choise);
            $("#input_accepts_id").val(lang.accepts);
            $("#accepts_id").html(lang.accepts_span);
            $("#input_declines_id").val(lang.declines);
            $("#declines_id").html(lang.declines_span);
            $("#browser").attr("placeholder",lang.name);
            $("#mesage_id").text(lang.Message);
            $("#memo").attr("placeholder",lang.Messageinf);
            $("#buttonans_id").text(lang.buttonans);
            $("#back_id").text(lang.back);
            $("#conffirm_id").text(lang.conffirm);
            $("#acceptdecline_id").text(lang.acceptdecline);
            $("#name2_id").text(lang.name2);
            $("#Message2_id").text(lang.Message);
            $("#btnconf_id").text(lang.btnconf);
            $("#edit_id").text(lang.edit);
        }   

        if($("#thanks_id"))
        {
            $("#thanks_id").text(lang.thanks);
            $("#backtop_id").text(lang.backtop);
        }
    }

    static changeToggleSwitch(lang){
        if (lang == 1) {
            // turn toggle switch off
            $("#language-toggle").attr("checked", false);
            $('#div_toggle_id').click();
          } else {
            // turn toggle switch ON
            $('#language-toggle').attr("checked", true);
            $('#div_toggle_id').click();
          }
    }

    static refreshLang() {
        NGONNGU.createNewLang();
        var lang = NGONNGU.getLangDB();
        var trans = data.jp;
        if(lang == 1)
        {trans = data.vn}
        this.changeToggleSwitch(lang)
        this.setLangId(trans);
    }

    static getObjLang() {
        var lang = NGONNGU.getLangDB();
        var trans = data.jp;
        if(lang == 1)
        {trans = data.vn}
        return trans;
    }
}