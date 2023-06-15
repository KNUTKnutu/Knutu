import { AudioClip, AudioClipLocation, AudioPlaybackRate, AudioPlaytime, AudioVolume } from './KnutuAudioTypes';

/**
* Knutu Library - KnutuAudioHandler
* Usage Example => KnutuAudioHandler.getInstance().play(KnutuAudioHandler.clipSuspense);
*/
class KnutuAudioHandler {

    public static audio: KnutuAudioHandler = new KnutuAudioHandler();
    public static getInstance = (): KnutuAudioHandler => this.audio;

    private readonly defaultAudioSource: HTMLAudioElement = document.getElementById("audioSource") as HTMLAudioElement;
    private readonly defaultAudioClipLocation: AudioClip = "/src/Assets/Audios/";
    private readonly defaultAudioVolume: AudioVolume = 40;
    
    public static readonly clipAllUserReady: AudioClip = "AllUserReady.mp3";
    public static readonly clipGameSceneGaming: AudioClip = "GameScene_Gaming.mp3";
    public static readonly clipGameSceneWaiting: AudioClip = "GameScene_Waiting.mp3";
    public static readonly clipIntroScene: AudioClip = "IntroScene.mp3";
    public static readonly clipLobbyScene: AudioClip = "LobbyScene.mp3";
    public static readonly clipOnButtonClick: AudioClip = "OnButtonClick.mp3";
    public static readonly clipOnUserChat: AudioClip = "OnUserChat.mp3";
    public static readonly clipOnUserEnter: AudioClip = "OnUserEnter.mp3";
    public static readonly clipOnRound: AudioClip = "OnRound.mp3";
    public static readonly clipOnRoundStart: AudioClip = "OnRoundStart.mp3";
    public static readonly clipOnGameStart: AudioClip = "OnGameStart.mp3";
    public static readonly clipOnWordCorrect: AudioClip = "OnWordCorrect.mp3";
    public static readonly clipOnWordAni: AudioClip = "OnWordAni.wav";
    public static readonly clipOnWordIncorrect: AudioClip = "OnWordIncorrect.mp3";
    public static readonly clipOnRoundEnd: AudioClip = "OnRoundEnd.mp3";
    public static readonly clipSuspense: AudioClip = "Suspense.mp3";

    private currentAudioClip: AudioClip = "";
    private currentAudioVolume: AudioVolume = this.defaultAudioVolume;

    /** 
     * Plays an AudioClip independent with default audioSource.  
     *  
     * Remove itself when audioclip is done.  
     *   
     * Could be useful when multiple audios need to be simultaneously played, but  
     * you would be unable to handle those AudioClips you use as PlayOneShot().
     * @param1 AudioClip to play. please give this parameter as AudioClip constants in KnutuAudioHandler such as clipSuspense.
     * @returns void.
     * */
    public playOneShot = (_audioClip: AudioClip, _volumeMultiplier?: AudioVolume = 100, _callback?: void): void => {
        if(!_audioClip) return console.error("No clip specified.");
        if(_volumeMultiplier > 100) return console.error("Given volume amount is invalid.");

        _volumeMultiplier /= 100;

        const tempAudioSource: HTMLAudioElement = document.createElement("audio") as HTMLAudioElement;
        document.getElementsByTagName("body")[0].appendChild(tempAudioSource);
        const playOneShotName: string = Math.floor(Math.random() * Math.pow(2, 16)).toString();
        tempAudioSource.setAttribute("name", playOneShotName);
        tempAudioSource.volume = this.defaultAudioSource.muted ? 0 : 1 * this.currentAudioVolume * _volumeMultiplier;

        this._setSrc(tempAudioSource, _audioClip);
        tempAudioSource.play();

        tempAudioSource.addEventListener("ended", () => {
            if(_callback) _callback();
            document.getElementsByName(playOneShotName)[0].remove();
        });
    };

    /** 
     * Gets an AudioClip currently being played within DefaultAudioSource.
     * @param1 No Parameter Needed.
     * @returns AudioClip as string. ex) "Suspense.mp3";
     * */
    public getCurrentAudioClip = (): AudioClip => this.currentAudioClip;

    /** 
     * Plays an AudioClip with an AudioClip with paramter. only one AudioClip needed.
     * @param1 AudioClip to play. please give this parameter as AudioClip constants in KnutuAudioHandler such as clipSuspense.
     * @returns void.
     * */
    public play = (_audioClip: AudioClip): void => {
        if(!_audioClip) return;
        this.currentAudioClip = _audioClip;
        this._setSrc(this.defaultAudioSource, _audioClip);
    };

    /** 
     * Stops an AudioClip within the DefaultAudioSource.
     * @param1 No parameter needed.
     * @returns void.
     * */
    public stop = (): void => {
        this.defaultAudioSource.src = "";
    };

    /** 
     * Pauses an AudioClip within the DefaultAudioSource,  
     * so that you can play it again from the playtime you paused.
     * @param1 No parameter needed.
     * @returns void.
     * */
    public pause = (): void => {
        this.defaultAudioSource.pause();
    };

    /** 
     * Pauses an AudioClip within the DefaultAudioSource,  
     * so that you can play it again from the playtime you paused.
     * @param1 No parameter needed.
     * @returns void.
     * */
    public unPause = (): void => {
        this._play();
    };

    /** 
     * Gets a playtime on DefaultAudioSource. 
     * @param1 No parameter needed.
     * @returns number type, the property of currentTime on DefaultAudioSource.
     * */
    public getPlaytime = (): AudioPlaytime => {
        return this.defaultAudioSource.currentTime;
    }

    /** 
     * Sets a playtime on DefaultAudioSource. 
     * @param1 AudioPlaytime to set on DefaultAudioSource. Number type.
     * @returns void.
     * */
    public setPlaytime = (_audioPlayTime: AudioPlaytime): void => {
        this.defaultAudioSource.currentTime = _audioPlayTime;
    }

    /** 
     * Gets a PlaybackRate on DefaultAudioSource. 
     * When you use this method and it returns 2, it means that  
     * DefaultAudioSource is now playing the AudioClip double times faster.
     * @param1 No parameter needed.
     * @returns number type, the property of PlaybackRate on DefaultAudioSource.
     * */
    public getPlaybackRate = (): AudioPlaybackRate => {
        return this.defaultAudioSource.playbackRate;
    }

    /** 
     * Sets a PlaybackRate on DefaultAudioSource. 
     * Could be useful to handle the speed of the audio on DefaultAudioSource.  
     * setPlaybackRate(2) means that you want to set the audio playing speed double.
     * @param1 No parameter needed.
     * @returns void.
     * */
    public setPlaybackRate = (_playbackRate: AudioPlaybackRate): void => {
        this.defaultAudioSource.playbackRate = _playbackRate;
    }

    /** 
     * Gets a volume on DefaultAudioSource.  
     * @param1 No parameter needed.
     * @returns number type, the property of volume on DefaultAudioSource.
     * */
    public getVolume = (): AudioVolume => {
        return this.defaultAudioSource.volume;
    }

    /** 
     * Sets a volume on DefaultAudioSource.  
     *   
     * If the given AudioVolume as paramter is less than 1 or equal, use it as default, but
     * when the given AudioVolume is higher than 1, divide the value by 100.  
     *   
     * However the given AudioVolume is higher than 100, consider it as a fault, throws console error, do nothing.
     * @param1 AudioVolume to set on DefaultAudioSource. Number type.
     * @returns void.
     * */
    public setVolume = (_audioVolume: AudioVolume): void => {
        if(_audioVolume > 100) return console.error("given audioVolume is higher than 100, so nothing happened on SetVolume method.");
        if(_audioVolume > 1) _audioVolume /= 100;
        this.defaultAudioSource.volume = _audioVolume;
        this.currentAudioVolume = _audioVolume;
    }

    /** 
     * Gets the boolean value whether DefaultAudioSource is muted or not.
     * @param1 No parameter needed.
     * @returns boolean type, the property of muted on DefaultAudioSource.
     * */
    public getMute = (): boolean => {
        return this.defaultAudioSource.muted;
    }

    /** 
     * Lets DefaultAudioSource to be muted.  
     * @param1 boolean type, whether to mute or not to. You can just simply skip this paramether to set it to be muted.
     * @returns void.
     * */
    public setMute = (_isMute?: boolean = true): void => {
        this.defaultAudioSource.muted = _isMute;
    }

    /** 
     * Lets DefaultAudioSource to toggle its status of the property "muted".
     * @param1 No parameter needed.
     * @returns void.
     * */
    public toggleMute = (): void => {
        this.defaultAudioSource.muted = !this.getMute();
    }

    /** 
     * Gets the boolean value whether DefaultAudioSource sets to loop or not.
     * @param1 No parameter needed.
     * @returns boolean type, the property of loop on DefaultAudioSource.
     * */
    public getLoop = (): boolean => {
        return this.defaultAudioSource.loop;
    }

    /** 
     * Lets DefaultAudioSource to loop.  
     * @param1 No parameter needed.
     * @returns void.
     * */
    public setLoop = (): void => {
        this.defaultAudioSource.loop = true;
    }

    /** 
     * Lets DefaultAudioSource NOT to loop.  
     * @param1 No parameter needed.
     * @returns void.
     * */
    public setUnloop = (): void => {
        this.defaultAudioSource.loop = !1;
    }

    /** 
     * Returns a boolean value if DefaultAudioSource is current playing.  
     * If true, DefaultAudioSource is NOT playing, and NOT paused.  
     * @param1 No parameter needed.
     * @returns boolean type, !(the property of paused) on DefaultAudioSource.
     * */
    public isPlaying = (): boolean => {
        return !this.defaultAudioSource.paused;
    }

    // TODO
    /**
     * 
     * 
     * 
     */
    /*
    public addEventListener = (_eventName: string, _callback: void): void => {
        this.defaultAudioSource.addEvenetListener(_eventName, _callback);
    }
    */

    ///////// <!-------- private methods ----------> /////////

    private _setSrc = (_audioSource: HTMLAudioElement, _audioClip: AudioClip): void => {
        if(!_audioClip) return console.error("no audioClip sent to setSrc");
        if(!_audioSource) _audioSource = this.defaultAudioSource;
        const URL: AudioClipLocation = `${this.defaultAudioClipLocation}${_audioClip}`;
        _audioSource.src = URL;
    }

    private _play = (): void => {
        this.defaultAudioSource.play();
    }
}

export default KnutuAudioHandler;