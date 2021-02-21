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
                  className={active ? 'upload-modal-content active' : 'upload-modal-content'}>
                <div className="upload-resource-modal-title">Добавить файл</div>
                <label htmlFor="file" className={'upload-resource-text'}>Выберите файл</label>
                <input type="file" id="file" name="file"
                       className={'upload-resource-file'}
                       onChange={e => setFile(e.target.files[0])}
                        />
                <button className={'filter-btn'} type={'submit'}>Применить</button>
            </form>
        </div>)
}

export default UploadResources