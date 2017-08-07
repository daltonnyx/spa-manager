const SpaForm = (props) => {
    return (
        <form id="spa-form">
            <div className="row">   
                <input type="hidden" name="id" id="object-id" autoComplete="off" />
              <div className="input-field col s12">
                  <input id="name" type="text" name="name" className="validate" />
                 <label className="active" htmlFor="name">Name</label>
              </div>
          </div>
          { props.master ? <div className="row">   
              <div className="col s12">
                  <label htmlFor="name">Owner</label>
                  <select className="browser-default" name="owner" id="owner">
                      {props.users.map( user => <option key={user.id} value={user.id}>{user.name}</option> )}
                  </select>
              </div>
          </div> : null }
          <div className="row">
              <div className="input-field col s12">
                  <input id="address" type="text" name="address" className="validate" />
                 <label className="active" htmlFor="address">Address</label>
              </div>
          </div>
        </form>
    );
};
export {SpaForm as default};
