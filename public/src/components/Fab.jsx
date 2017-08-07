const FAB = (props) => {
    if(props.role == "guest") return null;
    return (    
      <div className="fixed-action-btn vertical click-to-toggle">
        <a className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </a>
        <ul>
            { props.role == 'master' ? <li><a title="Create Spa" onClick={props.createSpa} className="btn-floating red"><i className="material-icons">hotel</i></a></li> : null }
          <li><a title="Create Room" onClick={props.createRoom} className="btn-floating yellow darken-1"><i className="material-icons">hot_tub</i></a></li>
          { props.role == 'master' ? <li><a title="Create User" onClick={props.createUser} className="btn-floating green darken-1"><i className="material-icons">person_add</i></a></li> : null }
        </ul>
      </div>
    );
}

export {FAB as default}
