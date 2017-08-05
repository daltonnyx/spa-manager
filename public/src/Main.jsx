import TimeGrid from './components/TimeGrid.js';

const MainApp = (props) => {
    return (
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
              <TimeGrid 
                  rooms={props.rooms} 
                  bookings={props.bookings} 
                  createBooking={props.createBooking}
                  updateBooking={props.updateBooking}
                  updateRoom={props.updateRoom}
              />
          </div>
        </div>
    );
}

export {MainApp as default};
