const RoomForm = (props) => {
    return (
        <form id="room-form">
            <div className="row">   
                <input type="hidden" name="id" id="object-id" autoComplete="off" />
              <div className="input-field col s12">
                  <input id="title" type="text" name="title" className="validate" />
                 <label className="active" htmlFor="title">Room Name</label>
              </div>
          </div>
          <input type="hidden" name="shop_id" value={props.spa.id} />
          
          <div className="row">
              <div className="input-field col s12">
                  <textarea id="description" name="description" className="materialize-textarea" />
                 <label  htmlFor="address">Description</label>
              </div>
          </div>
        </form>
    );
};
export {RoomForm as default};
