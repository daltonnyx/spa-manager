const RoomForm = (props) => {
    return (
        <form id="room-form">
            <div className="row">   
                <input type="hidden" name="id" id="object-id" autoComplete="off" />
              <div className="input-field col s12">
                  <input id="title" type="text" name="title" className="validate" />
                 <label htmlFor="title">Tên Phòng</label>
              </div>
          </div>
          <div className="row">   
              <div className="col s12">
                  <label htmlFor="name">Spa</label>
                  <select id="shop_id" type="text" name="shop_id" className="validate browser-default">
                      {props.spas.map( spa => <option value={spa.id} key={spa.id}>{spa.name}</option> )}
                  </select>
                 
              </div>
          </div>
          <div className="row">
              <div className="input-field col s12">
                  <textarea id="description" name="description" className="materialize-textarea" />
                 <label htmlFor="address">Mô tả</label>
              </div>
          </div>
        </form>
    );
};
export {RoomForm as default};
