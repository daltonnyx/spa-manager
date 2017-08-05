const promtDatepicker = (e) => {
    jQuery(e.target).pickadate({
        format: 'dd/mm/yyyy', 
    });
};
const BookingForm = (props) => {
    return (
        <form id="spa-form">
           <div className="row">
            <input type="hidden" name="id" id="object-id" autoComplete="off" />
            <div className="input-field col s12">
              <input id="customer_name" type="text" name="customer_name" className="validate" />
             <label htmlFor="customer_name">Tên khách hàng</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="customer_phone" type="text" name="customer_phone" className="validate" />
             <label htmlFor="customer_phone">Số điện thoại</label>
            </div>
          </div>
          <div className="row">
              <div className="col s12">
                <label htmlFor="room_id" className="active">Phòng</label>
                <select id="room_id" type="text" name="room_id" className="validate browser-default">
                    {props.rooms.map( room => <option key={room.id} value={room.id}>{room.title}</option> )}
                </select>
             
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
               <input id="date_booking" placeholder="Chọn ngày" onClick={promtDatepicker} type="text" name="date_booking" className="datepicker" />
               <label className="active" htmlFor="room_id">Ngày đặt</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <span>Bắt đầu</span>
              <div className="input-field inline">
                  <input placeholder="Giờ" min="10" step="1" max="23" id="start_on_hour" type="number" name="start_on[hour]" className="validate" />
              </div>
              <div className="input-field inline">
                  <input placeholder="Phút" min="00" max="30" step="30" id="start_on_minute" type="number" name="start_on[minute]" className="validate" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <span>Kết thúc</span>
              <div className="input-field inline">
                  <input placeholder="Giờ" min="10" step="1" max="23" id="end_on_hour" type="number" name="end_on[hour]" className="validate" />
              </div>
              <div className="input-field inline">
                  <input placeholder="Phút" min="00" max="30" step="30" id="end_on_minute" type="number" name="end_on[minute]" className="validate" />
              </div>
            </div>
          </div>
        </form>
    );
};
export {BookingForm as default};
