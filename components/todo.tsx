import styles from '../styles/Home.module.css'
import { TodoType } from '../types/todo'

type Props = {
    data: TodoType;
    handleDeleteClick: (id: number) => void;
    handleSetDoneClick: (id: number, performed: boolean) => void;
};


export const Todo: React.FC<Props> = ({ data, handleDeleteClick, handleSetDoneClick }: Props) => {

    const { title, performed, id } = data;
    return (
        <div className={styles.todoContainer} >
            <div className={styles.todoTitle}>{title}</div>
            <div className={styles.buttonContainer}>
                <button className={styles.deleteButton} onClick={() => handleDeleteClick(id)}>
                    Delete
                    </button>
                {performed !== false ? <div className={styles.done}> &#10003; </div> :
                    <button className={styles.doneButton} onClick={() => handleSetDoneClick(id, true)}>
                        Done
                    </button>}
            </div>
        </div>
    )
}