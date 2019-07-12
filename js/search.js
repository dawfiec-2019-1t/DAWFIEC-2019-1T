var DATA;
var search_app;
var URL = "https://firebasestorage.googleapis.com/v0/b/governus-803f2.appspot.com/o/governus-803f2-export.json?alt=media&token=6962cc81-a7ea-41d5-a802-d35aea627880";

function load_data(){
    $.get(URL, function(data){
        DATA = data;
        search_app = new Vue({
            el: '#search-app',
            data: {
                pairs: [],
                base_description: DATA.law_data.base_description
            }
        })
    });
}

function search(){
    let form = $(".searchTerm");
    let laws = [];

    let tmp = [];

    DATA.law_data.laws.forEach(function(law){

        if(law.title.toLowerCase().includes(form.val().toLowerCase())){
            if(tmp.length == 2){
                laws.push(tmp);
                tmp = [law];
            } else{
                tmp.push(law);
            }
        }

    });

    if(tmp){
        laws.push(tmp);
    }

    form.val("");
    search_app.pairs = laws;
}

load_data();
