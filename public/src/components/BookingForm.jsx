const promtDatepicker = (e) => {
    jQuery(e.target).pickadate({
        format: 'dd/mm/yyyy', 
    });
};
const BookingForm = (props) => {
    var starts = [];
    for(var i = 10; i < 24; i+= .5) {
        starts.push(<option key={i} values={ i % 1 == 0 ? i+":00" : (i - .5)+":30" }>{ i % 1 == 0 ? i+":00" : (i - .5)+":30" }</option>);
    }
    return (
        <form id="spa-form">
           <div className="row">
            <input type="hidden" name="id" id="id" autoComplete="off" />
            <div className="input-field col s6">
              <input id="customer_name" type="text" name="customer_name" className="validate" />
             <label className="active" htmlFor="customer_name">Guest name</label>
            </div>
            <div className="input-field col s6">
              <input id="customer_company" type="text" name="customer_company" className="validate" />
             <label className="active" htmlFor="customer_company">Company</label>
            </div>
          </div>
          
          <div className="row">
            <div className="input-field col s6">
              <input id="customer_phone" type="text" name="customer_phone" className="validate" />
             <label className="active" htmlFor="customer_phone">Phone number</label>
            </div>
            <div className="col s6">
                <label htmlFor="room_id" className="active">Phòng</label>
                <select id="room_id" type="text" name="room_id" className="validate browser-default">
                    {props.rooms.map( room => <option key={room.id} value={room.id}>{room.title}</option> )}
                </select>
             
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
               <input id="date_booking" placeholder="Chọn ngày" onClick={promtDatepicker} type="text" name="date_booking" className="datepicker" />
               <label className="active" htmlFor="room_id">Ngày đặt</label>
           </div>
            <div className="col s3">
                <label htmlFor="start_on">Bắt đầu</label>
                <select id="start_on" type="text" name="start_on" className="validate browser-default">
                    {starts}
                </select>
          </div>
          <div className="col s3">
              <label htmlFor="end_on">Kết thúc</label>
              <select id="end_on" type="text" name="end_on" className="validate browser-default">
                    {starts}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
                <textarea name="note" className="materialize-textarea" id="note"></textarea>
                <label className="active" htmlFor="note">Note</label>
            </div>
          </div>
        </form>
    );
};
export {BookingForm as default};
