const UserForm = (props) => {
    return (
        <form id="spa-form">
          <div className="row">   
              <div className="input-field col s12">
                  <input id="name" type="text" name="name" className="validate" />
                 <label className="active" htmlFor="name">Name</label>
              </div>
          </div>
          <div className="row">
          <div className="input-field col s12">
                  <input id="email" type="email" name="email" className="validate" />
                 <label className="active" htmlFor="email">Email</label>
              </div>
          </div>
          <div className="row">   
              <div className="col s12">
                  <label htmlFor="name">Role</label>
                  <select className="browser-default" name="role">
                      {[
                          {code: 'master', name:'Master'}, 
                          {code: 'admin', name:'Admin'}, 
                          {code: 'guest', name: 'Guest'}
                      ].map( role => <option key={role.code} value={role.code}>{role.name}</option> )}
                  </select>
              </div>
          </div>
          <div className="row">
              <div className="input-field col s12">
                  <input id="password" type="password" name="password" className="validate" />
                 <label className="active" htmlFor="password">Password</label>
              </div>
          </div>
          <div className="row">
              <div className="input-field col s12">
                  <input id="confirm_password" type="password" name="confirm_password" className="validate" />
                 <label className="active" htmlFor="confirm_password">Confirm Password</label>
              </div>
          </div>

        </form>
    );
};
export {UserForm as default};
