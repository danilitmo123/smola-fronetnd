import React, {useState} from 'react'
import "./upload-resource-modal.scss"

import {uploadResourcesAction} from "../../actions/resource-upload-actions";
import {useDispatch} from "react-redux";


const UploadResources = ({active, setActive}) => {

    const dispatch = useDispatch()


    const [file, setFile] = useState(null);
    const [direction, setDirection] = useState("")


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(uploadResourcesAction(file, direction));
        setActive(false);
    }

    return (
        <div
            onClick={() => setActive(false)}
            className={active ? 'resource-modal active' : 'resource-modal'}>
            <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}
                  className={active ? 'create-modal-content active' : 'create-modal-content'}>
                <div className="resource-modal-title"><h2>Добавить файл</h2></div>
                <label htmlFor="file">Выберите файл</label>
                <input type="file" id="file" name="file"
                       onChange={e => setFile(e.target.files[0])}
                        /><br/>
                <label htmlFor="direction">Количество</label> <br/>
                <input type="text" name="direction" id="direction"
                       onChange={e => setDirection(e.target.value)}
                       value={direction}/><br/>
                <button className={'filter-btn'} type={'submit'}>Применить</button>
            </form>
        </div>)
}

export default UploadResources