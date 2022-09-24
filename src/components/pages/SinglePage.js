import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBanner from "../appBanner/AppBanner";
import { useMarvelService } from './../../services/MarvelService';
import { setContent } from './../utils/setContent';

export const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {clearError, process, setProcess, getCharacter, getComics} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComics(id)
                        .then(onDataLoaded)
                        .then(() => setProcess('confirmed'));
                    break;
                case 'character':
                    getCharacter(id)
                        .then(onDataLoaded)
                        .then(() => setProcess('confirmed'));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {setContent(process, Component, data)}
            </>
        )
}
