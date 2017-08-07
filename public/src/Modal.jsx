import SpaForm from './components/SpaForm.js';
import BookingForm from './components/BookingForm.js';
import RoomForm from './components/RoomForm.js';
import UserForm from './components/UserForm.js';
const Modal = (props) => {
    var form = null;
    if(props.modal.modalOf == "spa") {
        form = <SpaForm users={props.users} master={props.modal.role == "master"} />;
    }
    else if(props.modal.modalOf == "room") {
        form = <RoomForm spa={props.spa} />;
    }
    else if(props.modal.modalOf == "booking") {
        
        form = <BookingForm rooms={props.rooms} />
    }
    else if(props.modal.modalOf == "user") {
        form = <UserForm />
    }
    let update = props.formState == "updateBooking" || 
                 props.formState == "updateRoom" || props.formState == "updateSpa";
    return (
      <div id="Modal" className="modal modal-fixed-footer">
        <div className="modal-content">
            <h4>{props.modal.title}</h4>
            {form}
        </div>
        <div className="modal-footer">
            <a href="#!" onClick={props.submit} className="waves-effect waves-green btn">{ update ? "Cập nhật": "Tạo" }</a>
            {update ?  <a href="#!" onClick={props.deleteModal} className="waves-effect waves-light btn red">Xoá</a> : null}
        </div>
      </div>
    );

};

export {Modal as default};
