const LoginForm = (props) => {
    return (
        <center>
          <div className="section"></div>

          <h5 className="indigo-text">Please login to continue</h5>
          <div className="section"></div>

          <div className="container">
            <div className="z-depth-1 grey lighten-4 row" style={{display: "inline-block", padding: "32px 48px 0px 48px", borderWidth: "1px",borderStyle: "solid",borderColor: "#EEE"}}>

              <form className="col s12" method="post" onSubmit={props.submit}>
                <div className='row'>
                  <div className='col s12'>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='email' name='email' id='email' />
                    <label htmlFor='email'>youremail@example.com</label>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='password' name='password' id='password' />
                    <label htmlFor='password'>Your password</label>
                  </div>
                  <label style={{float: "right"}}>
                                    <a className='pink-text' href='#!'><b>Forgot password?</b></a>
                                </label>
                </div>

                <br />
                <center>
                    <div className='row'>
                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                    </div>         
                </center>
              </form>
            </div>
          </div>
        </center>
    )
};

export {LoginForm as default};
