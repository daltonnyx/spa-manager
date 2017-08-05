const SpaForm = (props) => {
    return (
        <form id="spa-form">
            <div className="row">   
              <div className="input-field col s12">
                  <input id="name" type="text" name="name" className="validate" />
                 <label htmlFor="name">Tên Spa</label>
              </div>
          </div>
          <div className="row">
              <div className="input-field col s12">
                  <input id="address" type="text" name="address" className="validate" />
                 <label htmlFor="address">Địa chỉ</label>
              </div>
          </div>
        </form>
    );
};
export {SpaForm as default};
