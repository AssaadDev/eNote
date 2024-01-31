
import './Note.css';


function Note(props,{key}) {

  return (
       
        <div  draggable
              onDragStart={props.onDragStart}
              onDragEnd={props.onDragEnd} 
              key={key} 
              className={props.prio === 'low' ? 'sticky greenNt' : 
                                                props.prio === 'medium' ? 'sticky yellowNt' : 
                                                props.prio === 'high' ? 'sticky roseNt' : 
                                                'sticky yellowNt'} 
              onClick={props.onClick} >
          <h1 className='title'>{props.title}</h1>
            {props.text}
        </div>
  
  );
}

export default Note;
