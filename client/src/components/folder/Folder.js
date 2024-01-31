
import '../note/Note.css';
import './folder.css';


function Folder(props,{key}) {

  return (
        <div  key={key} 
              onClick={props.onClick}  
              className="sticky folder"
              onDrop={props.onDrop}
              onDragOver={props.onDragOver}
              style={props.style}
              onDragLeave={props.onDragLeave}
              >
                <div className="info">
                <h1>{props.text}</h1>
                
                </div>
                <div className='foldertype'>FOLDER</div>
        </div>
  );
}

export default Folder;
