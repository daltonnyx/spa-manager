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
            var room_id = this.dataset["room"];
            var baseHeight = jQuery('.timeGrid tr.time').first().height();
            var start_on = this.dataset['start'].match(/(\d\d):(\d\d)/);
            var end_on = this.dataset['end'].match(/(\d\d):(\d\d)/);
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
        var _cell = cell;
        var $cell = jQuery(_cell);
        var cell = {};
        cell.room_id = _cell.dataset['room'];
        if($cell.data("start")) {
            var startTime = $cell.data("start").match(/(\d\d):(\d\d)/);
            cell.start_on = startTime[1] + ":" + startTime[2];
        }
        else {
           var startTime = $cell.data('time').match(/(\d\d):(\d\d)/);
            cell.start_on = startTime[1] + ":" + startTime[2];
        }
        if($cell.data("end")) {
            var endTime = $cell.data("end").match(/(\d\d):(\d\d)/);
            cell.end_on = endTime[1] + ":" + endTime[2];
        } 
        else {
            var start_on = cell.start_on.split(':');
            var end_on_hour = parseInt(start_on[0]) + 1;
            cell.end_on = end_on_hour + ":" + start_on[1];
        }
        
        cell.date = date;
        cell.note = $cell.data('note');
        if($cell.data("id")) {
            cell.id = $cell.data("id");
        }
        if($cell.data("cust-name")) {
            cell.customer_name = $cell.data("cust-name");
        }
        if($cell.data("cust-phone")) {
            cell.customer_phone = $cell.data("cust-phone");
        }
        if($cell.data("cust-company")) {
            cell.customer_company = $cell.data("cust-company");
        }
        return cell;
    }

    var deleteData = function(uri, token, data) {
        var postHeader = new Headers();
        postHeader.set("Content-Type", 'application/json');
        postHeader.set("Authorization", 'Bearer ' + token);
        data._method = "delete";
        return fetch(uri + '/' + data.id, {
            headers: postHeader,
            method: 'post',
            body: JSON.stringify(data)
        });
    }

    var putData = function( uri, token, data ) {
        var postHeader = new Headers();
        postHeader.set("Content-Type", 'application/json');
        postHeader.set("Authorization", 'Bearer ' + token);
        data._method = "put";
        return fetch(uri + '/' + data.id, {
            headers: postHeader,
            method: 'post',
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
