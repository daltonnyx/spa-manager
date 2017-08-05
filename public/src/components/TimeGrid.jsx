const testBookings = [

];
const testRooms = [

];
const TimeGrid = (props) => {
    const bookings = props.bookings || testBookings;
    const rooms = props.rooms || testRooms;
    var i = 10;
    var rows = [];
    while(i <= 23) {
        var time = Math.floor(i) + ":" + ( (i - Math.floor(i)) == .5 ? "30" : "00" );
        rows.push( 
        <tr key={time} data-time={time} className="time">
            <th>{time}</th>
            {rooms.map( room => <td  key={time + room.id} data-time={time} onClick={props.createBooking} data-room={room.id}></td> )}
        </tr> );
        i += .5;
    }
    return (
        <table className="timeGrid">
            <tbody>
                {rows}  
            </tbody>
            <thead>
                <tr>
                    <th>Thời gian</th>
                    { rooms.map( room => <th onClick={props.updateRoom} data-title={room.title} data-spa={room.shop_id} data-desc={room.desc} className="room" key={room.id} data-room={room.id}>{room.title}</th> ) }
                </tr>
            </thead>
            <div className="spa-bookings">
                {bookings.map( booking => {
                    var date = booking.start_on.match(/\d+-\d+-\d+/)[0];
                    var start = booking.start_on.match(/\d\d:\d\d/)[0];
                    var end = booking.end_on.match(/\d\d:\d\d/)[0];
                    return (
                        <div 
                            key={booking.id} 
                            className="book" 
                            onClick={props.updateBooking}
                            data-id={booking.id}
                            data-date={date}
                            data-room={booking.room_id} 
                            data-start={start} 
                            data-cust-name={booking.customer_name}
                            data-cust-phone={booking.customer_phone}
                            data-end={end}>
                            <dl>
                                <dt>Tên</dt><dd>{booking.customer_name}</dd>
                                <dt>SDT</dt><dd>{booking.customer_phone}</dd>
                            </dl>
                        </div>
                    );
                } )}
            </div>
        </table>
    );
}

export {TimeGrid as default};
