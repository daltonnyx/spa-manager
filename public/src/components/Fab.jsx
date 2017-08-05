const FAB = (props) => {
    return (
      <div className="fixed-action-btn vertical click-to-toggle">
        <a className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </a>
        <ul>
          <li><a title="Create Spa" onClick={props.createSpa} className="btn-floating red"><i className="material-icons">hotel</i></a></li>
          <li><a title="Create Room" onClick={props.createRoom} className="btn-floating yellow darken-1"><i className="material-icons">hot_tub</i></a></li>
        </ul>
      </div>
    );
}

export {FAB as default}
