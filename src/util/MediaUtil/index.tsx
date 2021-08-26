import { Image } from '@chakra-ui/react';
import { MediaModal } from './MediaModal';
import React from 'react';
import ReactDOM from 'react-dom';

function openImage(url: string) {
    return new Promise<void>((resolve) => {
        const bodyElement = document.body;
        const divElement = document.createElement('div');
        const closeModal = () => {
            bodyElement.removeChild(divElement);
            resolve();
        };

        ReactDOM.render(
            <MediaModal onClose={closeModal}>
                <Image src={url} />
            </MediaModal>,
            divElement,
            () => bodyElement.appendChild(divElement),
        );
    });
}

function openVideo(url: string) {
    return new Promise<void>((resolve) => {
        const bodyElement = document.body;
        const divElement = document.createElement('div');
        const closeModal = () => {
            bodyElement.removeChild(divElement);
            resolve();
        };

        ReactDOM.render(
            <MediaModal onClose={closeModal}>
                <video src={url} autoPlay controls controlsList="nodownload" muted />
            </MediaModal>,
            divElement,
            () => bodyElement.appendChild(divElement),
        );
    });
}

function playAudio(url: string, amplitude: number = 1) {
    try {
        /**
         * Attention:
         * (1) For old browsers, Promise return value may be unsupported.
         * (2) For modern browsers, if the user never has interaction with the page, play() will reject.
         */
        const elementSource = new Audio(url);
        elementSource.crossOrigin = 'anonymous';
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(elementSource);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = amplitude;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        elementSource.play().catch(() => {});
    } catch (e) {
        // Do nothing
    }
}

export const MediaUtil = Object.freeze({
    openImage,
    openVideo,
    playAudio,
});
