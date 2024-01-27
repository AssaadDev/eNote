
import '../note/Note.css';
import './folder.css';


function Folder(props,{key}) {

  return (
        <div key={key} onClick={props.onClick}  className="sticky folder">
                <div className="info">
                <h1>{props.text}</h1>
                
                </div>
                <div className='foldertype'>FOLDER</div>
        </div>
  );
}

export default Folder;
