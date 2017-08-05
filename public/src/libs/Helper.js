const Helper = (function() {
    var getDate = function (date){
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    var getFormatedDate = function(date) {
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!

        var yyyy = date.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        return dd+'/'+mm+'/'+yyyy;
    }
    var getFormJSON = function (form) {
        return jQuery(form).serializeArray().reduce( (obj, item) => {
            console.log(item.name);
            obj[item.name] = item.value;
            return obj;
        }, {} );
    }

    var getData = function(uri, token) {
        var getHeaders = new Headers();
        getHeaders.set("Authorization", "Bearer " + token);
        getHeaders.set("Content-Type", "application/json");
        return fetch(uri, {
            method: "GET",
            headers: getHeaders
        }).then( res => res.json() );
    };
    var updateCards = function() {
        jQuery(".book").each(function (idx) {
            var $this = jQuery(this);
            var room_id = $this.data('room');
            var baseHeight = jQuery('.timeGrid tr.time').first().height();
            var start_on = $this.data('start').match(/(\d\d):(\d\d)/);
            var end_on = $this.data('end').match(/(\d\d):(\d\d)/);
            var room = jQuery('.timeGrid th.room[data-room="'+room_id+'"]');
            var time = jQuery('.timeGrid tr.time[data-time="'+start_on[0]+'"]');
            var height = (end_on[1] - start_on[1] ) * 2 + 1  + (end_on[2] - start_on[2]) / 30;
            if(room.length > 0) {
                $this.css({
                    "left": room[0].offsetLeft  + "px",
                    "width": jQuery(room[0]).outerWidth() + "px", // -2 for borderr
                    "height": height * baseHeight + "px"
                })
            }
            if(time.length > 0) {
                $this.css({
                    "top": time[0].offsetTop + 1 + "px",
                })
            }
        });
    };
    var postData = function(uri, token, data) {
        var postHeader = new Headers();
        postHeader.set("Content-Type", 'application/json');
        postHeader.set("Authorization", 'Bearer ' + token);
        return fetch(uri,{
            method: "POST",
            body: JSON.stringify(data),
            headers: postHeader,
        }).then(res => res.json());
    }
    var getCellData = function(cell, date) {
        var $cell = jQuery(cell);
        var cell = {};
        cell.room = $cell.data('room');
        if($cell.data("start")) {
            cell.start = $cell.data("start").match(/(\d\d):(\d\d)/);
        }
        else {
            cell.start = $cell.data('time').match(/(\d\d):(\d\d)/);
        }
        if($cell.data("end")) {
            cell.end = $cell.data("end").match(/(\d\d):(\d\d)/);
        } 
        else {
            cell.end = ["", parseInt(cell.start[1]) + 1, cell.start[2]];
        }
        
        cell.date = date;
        if($cell.data("id")) {
            cell.id = $cell.data("id");
        }
        if($cell.data("cust-name")) {
            cell.customer_name = $cell.data("cust-name");
        }
        if($cell.data("cust-phone")) {
            cell.customer_phone = $cell.data("cust-phone");
        }
        return cell;
    }

    var deleteData = function(uri, token, data) {
        var postHeader = new Headers();
        postHeader.set("Content-Type", 'application/json');
        postHeader.set("Authorization", 'Bearer ' + token);
        return fetch(uri + '/' + data.id, {
            headers: postHeader,
            method: 'delete'
        });
    }

    var putData = function( uri, token, data ) {
        var postHeader = new Headers();
        postHeader.set("Content-Type", 'application/json');
        postHeader.set("Authorization", 'Bearer ' + token);
        return fetch(uri + '/' + data.id, {
            headers: postHeader,
            method: 'put',
            body: JSON.stringify(data)
        }).then( res => res.json() );
    }

    var createCookie = function(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    var readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    var eraseCookie = function(name) {
        createCookie(name,"",-1);
    }

    return {
        getDate: getDate,
        getFormatedDate: getFormatedDate,
        getFormJSON: getFormJSON,
        getData: getData,
        updateCards: updateCards,
        postData: postData,
        getCellData: getCellData,
        deleteData: deleteData,
        putData: putData,
        createCookie: createCookie,
        readCookie: readCookie,
        eraseCookie: eraseCookie
    };
}());

export {Helper as default};
