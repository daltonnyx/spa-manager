import MainApp from './Main.js';
import FAB from './components/Fab.js';
import Modal from './Modal.js';
import LoginForm from './LoginForm.js';
import Helper from './libs/Helper.js';
class App extends React.Component  {
    constructor() {
        super();
        var currentDate = new Date();
        this.state = {
            api_token: Helper.readCookie('spatoken'),
            formState: '',
            date: new Date(),
            modal: {
                modalOf: "",
                title: ""
            },
            user: {},
            rooms: [],
            spa: {},
            spas: [],
            bookings: []
        };
        this.cell = {};
        this.openSpaForm = this.openSpaForm.bind(this);
        this.openRoomForm = this.openRoomForm.bind(this);
        this.openBookingForm = this.openBookingForm.bind(this);
        this.updateBooking = this.updateBooking.bind(this);
        this.submitModalForm = this.submitModalForm.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
    }
    componentDidMount() {
        if(this.state.api_token == null) 
            return;
        this.loadSpa().then( spa => {
                this.loadRooms(spa);
                this.loadBookings(spa);
        } );
        jQuery(ReactDOM.findDOMNode(this.refs.dateChoosen)).pickadate({
            format: 'dd/mm/yyyy',
            closeOnSelect: true,
        });
        jQuery(ReactDOM.findDOMNode(this.refs.dateChoosen)).on("change", this.changeDate);
    }

    loadSpa() {
        if(this.isAuthenticated()) {
            return Helper.getData("api/shops", this.state.api_token)
            .then(data => new Promise((resolve,reject) => {
                    let newState = this.state;
                    newState.spa  = data[0];
                    newState.spas = data;
                    this.setState(newState);
                    resolve(this.state.spa);
                })
            );  
        }
    }

    loadRooms(spa) {
        if(this.isAuthenticated()) {
            
            Helper.getData("api/rooms/" + spa.id, this.state.api_token)
            .then(data => {
                let newState = this.state;
                newState.rooms = data;
                this.setState(newState);
            });
        }
    }

    loadBookings(spa) {
        if(this.isAuthenticated()) {
            let date =  Helper.getDate(this.state.date);
            let spa = spa || this.state.spa;
            Helper.getData("api/bookings/" + spa.id + '/' + date, this.state.api_token)
            .then(data => {
                let newState = this.state;
                newState.bookings = data;
                this.setState(newState);
            });
        }

    }

    componentDidUpdate() {
        
        
        Helper.updateCards();
        if(this.state.formState == 'creatingBooking' || this.state.formState == "updateBooking") {
            jQuery("#Modal #room_id").val(this.cell.room);
            jQuery("#Modal #start_on_hour").val(this.cell.start[1]);
            jQuery("#Modal #start_on_minute").val(this.cell.start[2]);
            jQuery("#Modal #end_on_hour").val(this.cell.end[1]);
            jQuery("#Modal #end_on_minute").val(this.cell.end[2]);
            jQuery("#Modal #date_booking").val(Helper.getFormatedDate(this.cell.date));
            if(this.cell.customer_name) {
                jQuery("#Modal #customer_name").val(this.cell.customer_name);
            }
            if(this.cell.customer_phone) {
                jQuery("#Modal #customer_phone").val(this.cell.customer_phone);
            }
            if(this.cell.id) {
                jQuery("#Modal #object-id").val(this.cell.id);
            }
        }
        else if(this.state.formState == "updateRoom") {
            jQuery("#Modal #title").val(this.cell.title);
            jQuery("#Modal #object-id").val(this.cell.id);
            jQuery("#Modal #shop_id").val(this.cell.shop_id);
            jQuery("#Modal #description").val(this.cell.description);
        }
    }

    isAuthenticated() {
        return this.state.api_token != null && this.state.api_token.length == 60;
    }

    login(e) {
        e.preventDefault();
        var form = e.target;
        var data = Helper.getFormJSON(form);
        var postHeaders = new Headers();
        postHeaders.set("Content-Type", "application/json");
        fetch("api/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: postHeaders,
        }).then(res => res.json())
        .then(data => {
            data = data.data;
            if(data.api_token != null) {
                Helper.createCookie('spatoken', data.api_token, 1);
                window.location.reload();
            }
        });
    }

    logout(e) {
        e.preventDefault();
        var newState = this.state;
        newState.api_token = null;
        this.setState(newState);
        Helper.eraseCookie('spatoken');
        window.location.reload();
    }

    render() {
        if(this.state.api_token == null) {
            return (
                <LoginForm submit={this.login} />
            )
        }
        return (
            <div id="main">
                <nav className="light-blue lighten-1" role="navigation">
                    <div className="nav-wrapper container">
                        <a id="logo-container" href="#" className="brand-logo">{this.state.spa.name}</a>
                        <input ref="dateChoosen" onChange={this.changeDate} className="brand-logo center" id="date-choose"  value={this.state.date.toDateString()}/>
                        <a id="logout" onClick={this.logout} href="#" className="right hide-on-med-and-down">Đăng xuất</a>
                    </div>
                </nav>
                <MainApp 
                    rooms={this.state.rooms} 
                    bookings={this.state.bookings} 
                    createBooking={this.openBookingForm} 
                    updateBooking={this.updateBooking} 
                    updateRoom={this.updateRoom}
                    formState = {this.state.formState}
                />
                <Modal 
                    submit={this.submitModalForm} 
                    modal={this.state.modal} 
                    rooms={this.state.rooms} 
                    spas={this.state.spas}
                    formState={this.state.formState}
                    deleteModal={this.deleteObject}
                />
                <FAB 
                    createSpa={this.openSpaForm} 
                    createRoom={this.openRoomForm} 
                    createBooking={this.openBookingForm}  
                />
            </div>
        );
    }

    changeDate(e) {
        let $datePicker = jQuery(e.target);
        
        let newState = this.state;
        let dateString = $datePicker.val().match(/(\d+)\/(\d+)\/(\d+)/);
        newState.date = new Date(dateString[3], dateString[2] - 1, dateString[1]);
        this.setState(newState);
        this.loadBookings();
    }


    openSpaForm(e) {
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "spa";
        newState.formState = "creatingSpa";
        newState.modal.title = "Tạo SPA mới";
        this.setState(newState);
        jQuery("#Modal").modal("open");
    }
    
    openRoomForm() {
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "room";
        newState.formState = "creatingRoom";
        newState.modal.title = "Tạo phòng";
        this.setState(newState);
        jQuery("#Modal").modal("open");
    }

    updateRoom(e) {
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "room";
        newState.formState = "updateRoom";
        newState.modal.title = "Sửa phòng";
        this.setState(newState);
        var $cell = jQuery(e.currentTarget);
        this.cell = {
            title: $cell.data("title"),
            id: $cell.data("room"),
            description: $cell.data("desc"),
            shop_id: $cell.data("spa")
        };
        jQuery("#Modal").modal("open");
    }

    openBookingForm(e) {
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "booking";
        newState.formState = "creatingBooking";
        newState.modal.title = "Đăt phòng";
        this.setState(newState);
        this.cell = Helper.getCellData(e.target, this.state.date);
        jQuery("#Modal").modal("open");
    }

    updateBooking(e) {
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "booking";
        newState.formState = "updateBooking";
        newState.modal.title = "Cập nhật đặt chỗ";
        this.setState(newState);
        var $cell = jQuery(e.currentTarget);
        var dateString = $cell.data("date").match(/(\d+)-(\d+)-(\d+)/);
        this.cell = Helper.getCellData(e.currentTarget, new Date(dateString[1],dateString[2] - 1,dateString[3])); //need -1 on month
        jQuery("#Modal").modal("open");
    }

    resetFormState() {
        let newState = this.state;
        newState.formState = '';
        this.setState(newState);
    }

    submitModalForm() {
        var form = document.querySelector("#Modal form");
        if(form == null) {
            return false;
        }
        var data = Helper.getFormJSON(form);
        console.log(data);
        if(this.state.formState == "creatingBooking" || this.state.formState == "updateBooking") {
            this.bookRoom(data);
        }
        else if(this.state.formState == "creatingSpa") {
            this.editSpa(data);
        }
        else if(this.state.formState == "creatingRoom" || this.state.formState == "updateRoom") {
            this.editRoom(data);
        }
    }

    bookRoom(data) {
        var timeArr = data['date_booking'].match(/(\d+)\/(\d+)\/(\d+)/);
        var start_on = timeArr[3] + '-' + timeArr[2] + '-' + timeArr[1] + " " + data['start_on[hour]'] + ":" + data['start_on[minute]'] + ":00";
        var end_on = timeArr[3] + '-' + timeArr[2] + '-' + timeArr[1] + ' ' + data['end_on[hour]'] + ":" + data['end_on[minute]'] + ":00";
        data['start_on'] = start_on;
        data['end_on'] = end_on;
        delete data['date_booking'];
        delete data['start_on[hour]'];
        delete data['start_on[minute]'];
        delete data['end_on[hour]'];
        delete data['end_on[minute]'];
        if(this.state.formState == "creatingBooking") {
            Helper.postData('api/bookings', this.state.api_token, data)
            .then( data => {
                let newState = this.state;
                newState.formState = "";
                newState.bookings.push(data);
                this.setState(newState);
                jQuery("#Modal").modal("close");
            } ).catch(err => {
                console.log(err);
            });        
        }
        else if( this.state.formState == "updateBooking" ) {
            Helper.putData( 'api/bookings', this.state.api_token, data )
                .then( data => {
                    var newState = this.state;
                    newState.formState = "";
                    var oldBookingIdx = newState.bookings.findIndex( ( elm ) => elm.id == data.id );
                    newState.bookings.splice(oldBookingIdx, 1, data);
                    this.setState(newState);
                    jQuery("#Modal").modal("close");   
                } )
        }
    }

    deleteObject(e) {
        var id = jQuery("#Modal #object-id").val();
        var url = "";
        if(id) {
            switch(this.state.formState) {
                case 'updateBooking':
                    url = "api/bookings"  
                break;
                case 'updateRoom' : 
                    url = "api/rooms";
                break;
                default:
                    url = '';
                    break;
            }
            if(url.length > 0) {
                var form = document.querySelector("#Modal form");
                var data = Helper.getFormJSON(form);
                Helper.deleteData(url, this.state.api_token, data)
                    .then( response => {
                        this.loadRooms(this.state.spa);
                        this.loadBookings(this.state.spa);
                        jQuery("#Modal").modal("close");
                    } );
            }
        }
    }

    editSpa(data) {
        Helper.postData('api/shops', this.state.api_token, data)
        .then( data => {
            let newState = this.state;
            newState.formState = "";
            newState.spa = data;
            this.setState(newState);
            jQuery("#Modal").modal('close');
        } );
    }

    editRoom(data) {
        if(this.state.formState == "creatingRoom") {
            Helper.postData('api/rooms', this.state.api_token, data)
            .then( data => {
                let newState = this.state;
                newState.formState = "";
                if(data.shop_id == this.state.spa.id)
                    newState.rooms.push(data);
                this.setState(newState);
                jQuery("#Modal").modal('close');
            } );
        }
        else {
            Helper.putData('api/rooms', this.state.api_token, data)
                .then( data => {
                    var newState = this.state;
                    newState.formState = "";
                    var oldRoomIdx = newState.rooms.findIndex( ( elm ) => elm.id == data.id );
                    newState.rooms.splice(oldRoomIdx, 1, data);
                    this.setState(newState);
                    jQuery("#Modal").modal("close");   
                } );
        }
    }


    /* isBusy() {
     *     return false;
     *     return this.state.creatingSpa || this.state.creatingRoom || this.state.creatingBooking;
     * } */
}


ReactDOM.render(<App />, document.getElementById('root'));
