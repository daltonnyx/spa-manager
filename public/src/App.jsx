import MainApp from './Main.js';
import FAB from './components/Fab.js';
import Modal from './Modal.js';
import LoginForm from './LoginForm.js';
import Helper from './libs/Helper.js';
class App extends React.Component  {
    constructor() {
        super();
        var currentDate = new Date();
        this.user = JSON.parse(Helper.readCookie('user'));
        this.state = {
            api_token: Helper.readCookie('spatoken'),
            formState: '',
            date: new Date(),
            modal: {
                modalOf: "",
                title: ""
            },
            users: [],
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
        this.changeSpa = this.changeSpa.bind(this);
        this.updateSpa = this.updateSpa.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.openUserForm = this.openUserForm.bind(this);
    }
    componentDidMount() {
        if(this.state.api_token == null) 
            return;
        this.loadSpa().then( spa => {
                this.loadRooms(spa);
                this.loadBookings(spa);
        } );
        if(this.user.role == 'master')
            this.loadUser();
        jQuery(ReactDOM.findDOMNode(this.refs.dateChoosen)).pickadate({
            format: 'dd/mm/yyyy',
            closeOnSelect: true,
        });
        jQuery(ReactDOM.findDOMNode(this.refs.dateChoosen)).on("change", this.changeDate);
        jQuery(ReactDOM.findDOMNode(this.refs.spaChoosen)).on("change", this.changeSpa);
    }

    loadSpa() {
        if(this.isAuthenticated()) {
            let uri = this.user.role == "admin" ? "api/shops/" + this.user.id : "api/shops";
            return Helper.getData(uri, this.state.api_token)
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
        spa = spa || this.state.spa;
        if(spa == undefined) return;
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
        spa = spa || this.state.spa;
        if(spa == undefined) return;
        if(this.isAuthenticated()) {
            let date =  Helper.getDate(this.state.date);
            Helper.getData("api/bookings/" + spa.id + '/' + date, this.state.api_token)
            .then(data => {
                let newState = this.state;
                newState.bookings = data;
                this.setState(newState);
            });
        }

    }

    loadUser() {
        if(this.isAuthenticated()) {
            Helper.getData("api/users",this.state.api_token)
            .then(data => {
                let newState = this.state;
                newState.users = data;
                this.setState(newState);
            });
        }
    }

    componentDidUpdate() {
        jQuery("#spa-choosen").material_select();
        Helper.updateCards();
        jQuery("#Modal input, #Modal select, #Modal textarea").each(function(idx) {
            jQuery(this).val('');
        
        });
        if(this.cell == null)
            return;
        for (var prop in this.cell) {
            jQuery("#Modal #" + prop).val(this.cell[prop]);
        }
        if(this.state.formState == 'creatingBooking' || this.state.formState == "updateBooking") {
            jQuery("#Modal #date_booking").val(Helper.getFormatedDate(this.cell.date));
            
        }
        this.cell = null;
    }

    isAuthenticated() {
        return this.state.api_token != null && this.state.api_token.length == 60;
    }

    login(e) {
        e.preventDefault();
        var form = e.target;
        var data = Helper.getFormJSON(form);
        Helper.postData("api/login",null, data)
        .then(data => {
            data = data.data;
            if(data.api_token != null) {
                Helper.createCookie('spatoken', data.api_token, 1);
                delete data.api_token;
                Helper.createCookie('user', JSON.stringify(data),1);
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
        Helper.eraseCookie('user');
        window.location.reload();
    }

    render() {
        if(this.state.api_token == null) {
            return (
                <LoginForm submit={this.login} />
            )
        }
        return (
            <div id="main" className={"role-"+this.user.role}>
                <nav className="light-blue lighten-1" role="navigation">
                    <div className="nav-wrapper container">
                        <div className="brand-logo spa-choosen-container">
                            { this.user.role != "admin" ? <select id="spa-choosen" ref="spaChoosen">
                                {this.state.spas.map( (spa, index) => <option value={index} key={spa.id}>{spa.name}</option> )}
                            </select> : <span>{this.state.spa.name}</span> }
                            { !this.isGuest() ? <a href="#!" onClick={this.updateSpa} className="spa-edit"><i className="material-icons">mode_edit</i></a> : null }
                        </div>
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
                    spa={this.state.spa}
                    users={this.state.users}
                    formState={this.state.formState}
                    deleteModal={this.deleteObject}
                />
                <FAB 
                    role={this.user.role}
                    createSpa={this.openSpaForm} 
                    createRoom={this.openRoomForm} 
                    createBooking={this.openBookingForm} 
                    createUser={this.openUserForm}
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
    
    changeSpa(e) {
        let idx = e.target.value;
        let newState = this.state;
        newState.spa = newState.spas[idx];
        this.setState(newState);
        this.loadRooms();
        this.loadBookings();
    }

    openSpaForm(e) {
        if(this.isGuest()) return;
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "spa";
        newState.formState = "creatingSpa";
        newState.modal.title = "Make new spa";
        newState.modal.role = this.user.role;
        this.setState(newState);
        jQuery("#Modal").modal("open");
    }

    updateSpa(e) {
        e.preventDefault();
        if(this.isGuest()) return;
        let newState = this.state;
        newState.modal.modalOf = "spa";
        newState.formState = "updateSpa";
        newState.modal.title = "Update Spa";
        newState.modal.role = this.user.role;
        this.cell = newState.spa;
        this.setState(newState);
        jQuery("#Modal").modal("open");
    }
    
    openRoomForm() {
        if(this.isGuest()) return;
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "room";
        newState.formState = "creatingRoom";
        newState.modal.title = "Create new room";
        this.cell = {
            shop_id: newState.spa.id
        }
        this.setState(newState);
        jQuery("#Modal").modal("open");
    }

    updateRoom(e) {
        if(this.isGuest()) return;
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "room";
        newState.formState = "updateRoom";
        newState.modal.title = "Update room";
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
        if(this.isGuest()) return;
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "booking";
        newState.formState = "creatingBooking";
        newState.modal.title = "Book a room";
        this.setState(newState);
        this.cell = Helper.getCellData(e.target, this.state.date);
        jQuery("#Modal").modal("open");
    }

    updateBooking(e) {
        if(this.isGuest()) return;
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "booking";
        newState.formState = "updateBooking";
        newState.modal.title = "Update booking info";
        this.setState(newState);
        var $cell = jQuery(e.currentTarget);
        var dateString = $cell.data("date").match(/(\d+)-(\d+)-(\d+)/);
        this.cell = Helper.getCellData(e.currentTarget, new Date(dateString[1],dateString[2] - 1,dateString[3])); //need -1 on month
        jQuery("#Modal").modal("open");
    }

    openUserForm(e) {
        if(this.isGuest()) return;
        this.resetFormState();
        var newState = this.state;
        newState.modal.modalOf = "user";
        newState.formState = "creatingUser";
        newState.modal.title = "Create a User";
        this.setState(newState);
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
        else if(this.state.formState == "creatingSpa" || this.state.formState == "updateSpa") {
            this.editSpa(data);
        }
        else if(this.state.formState == "creatingRoom" || this.state.formState == "updateRoom") {
            this.editRoom(data);
        }
        else if(this.state.formState == "creatingUser") {
            this.editUser(data);
        }
    }

    bookRoom(data) {
        var timeArr = data['date_booking'].match(/(\d+)\/(\d+)\/(\d+)/);
        var start_on = timeArr[3] + '-' + timeArr[2] + '-' + timeArr[1] + " " + data['start_on'] + ":00";
        var end_on = timeArr[3] + '-' + timeArr[2] + '-' + timeArr[1] + ' ' + data['end_on'] + ":00";
        data['start_on'] = start_on;
        data['end_on'] = end_on;
        /* delete data['date_booking'];
         * delete data['start_on[hour]'];
         * delete data['start_on[minute]'];
         * delete data['end_on[hour]'];
         * delete data['end_on[minute]']; */
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
                    newState.bookings[oldBookingIdx] = data;
                    this.setState(newState);
                    jQuery("#Modal").modal("close");   
                } )
        }
    }

    deleteObject(e) {
        var id = jQuery("#Modal #id").val();
        var url = "";
        if(id) {
            switch(this.state.formState) {
                case 'updateBooking':
                    url = "api/bookings"  
                break;
                case 'updateRoom' : 
                    url = "api/rooms";
                break;
                case 'updateSpa' :
                    url = "api/shops";
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
                        if(this.state.formState != "updateSpa") {
                            this.loadRooms(this.state.spa);
                            this.loadBookings(this.state.spa);
                        }
                        else {
                            this.componentDidMount();
                        }
                        jQuery("#Modal").modal("close");
                    } );
            }
        }
    }

    editSpa(data) {
        if(this.state.formState == "creatingSpa") {
            Helper.postData('api/shops', this.state.api_token, data)
            .then( data => {
                window.location.reload();
            } );
        }
        else {
            Helper.putData("api/shops", this.state.api_token, data)
            .then( data => {
                window.location.reload();
            } )
        }
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

    editUser(data) {
        Helper.postData('api/users', this.state.api_token, data)
        .then( data => {
            let newState = this.state;
            newState.formState = "";
            if(data.role != 'guest')
                newState.users.push(data);
            this.setState(data);
            jQuery("#Modal").modal("close");
        });
    }


    isGuest() {
        return this.user.role == "guest";
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

window.onresize = function() {
    Helper.updateCards();
};
