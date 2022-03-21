import './comicsList.scss';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage.js';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ComicsList = (props) => {

    const [charList, setcharList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setoffset] = useState(190);
    const [charEnded, setcharEnded] = useState(false);

    const { loading, error, getComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true)
        getComics(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 8) {
            ended = true;
        }

        setcharList(charlist => [...charList, ...newCharList]);
        setnewItemLoading(newItemLoading => false)
        setoffset(offset => offset + 8)
        setcharEnded(charEnded => ended)
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item"
                    key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;

// import {useState, useEffect} from 'react';
// import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';

// import './comicsList.scss';

// const ComicsList = () => {

//     const [comicsList, setComicsList] = useState([]);
//     const [newItemLoading, setnewItemLoading] = useState(false);
//     const [offset, setOffset] = useState(0);
//     const [comicsEnded, setComicsEnded] = useState(false);

//     const {loading, error, getAllComics} = useMarvelService();

//     useEffect(() => {
//         onRequest(offset, true);
//     }, [])

//     const onRequest = (offset, initial) => {
//         initial ? setnewItemLoading(false) : setnewItemLoading(true);
//         getAllComics(offset)
//             .then(onComicsListLoaded)
//     }

//     const onComicsListLoaded = (newComicsList) => {
//         let ended = false;
//         if (newComicsList.length < 8) {
//             ended = true;
//         }
//         setComicsList([...comicsList, ...newComicsList]);
//         setnewItemLoading(false);
//         setOffset(offset + 8);
//         setComicsEnded(ended);
//     }

//     function renderItems (arr) {
//         const items = arr.map((item, i) => {
//             return (
//                 <li className="comics__item" key={i}>
//                     <a href="#">
//                         <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
//                         <div className="comics__item-name">{item.title}</div>
//                         <div className="comics__item-price">{item.price}</div>
//                     </a>
//                 </li>
//             )
//         })

//         return (
//             <ul className="comics__grid">
//                 {items}
//             </ul>
//         )
//     }

//     const items = renderItems(comicsList);

//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinner = loading && !newItemLoading ? <Spinner/> : null;

//     return (
//         <div className="comics__list">
//             {errorMessage}
//             {spinner}
//             {items}
//             <button 
//                 disabled={newItemLoading} 
//                 style={{'display' : comicsEnded ? 'none' : 'block'}}
//                 className="button button__main button__long"
//                 onClick={() => onRequest(offset)}>
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default ComicsList;